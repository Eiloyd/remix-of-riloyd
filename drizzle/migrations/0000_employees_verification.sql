CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id text NOT NULL UNIQUE,
  code_hash text NOT NULL,
  full_name text NOT NULL,
  photo_url text,
  designation text NOT NULL,
  department text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
  valid_until date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, DELETE ON public.employees TO authenticated;
GRANT ALL ON public.employees TO service_role;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read employees" ON public.employees FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete employees" ON public.employees FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.employee_verification_attempts (
  id bigserial PRIMARY KEY,
  employee_id text NOT NULL,
  success boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.employee_verification_attempts TO service_role;
ALTER TABLE public.employee_verification_attempts ENABLE ROW LEVEL SECURITY;
CREATE INDEX ON public.employee_verification_attempts (employee_id, created_at);

-- Public verification: requires both ID and code; returns only ID-card fields; throttles brute force
CREATE OR REPLACE FUNCTION public.verify_employee(_employee_id text, _code text)
RETURNS TABLE (employee_id text, full_name text, photo_url text, designation text, department text, status text, valid_until date)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE
  _id text := upper(trim(_employee_id));
  _failures int;
  _row public.employees%ROWTYPE;
BEGIN
  IF _id = '' OR length(_id) > 40 OR _code IS NULL OR length(_code) > 64 THEN
    RETURN;
  END IF;
  SELECT count(*) INTO _failures FROM public.employee_verification_attempts a
    WHERE a.employee_id = _id AND a.success = false AND a.created_at > now() - interval '15 minutes';
  IF _failures >= 5 THEN
    RAISE EXCEPTION 'too_many_attempts';
  END IF;
  SELECT * INTO _row FROM public.employees e WHERE upper(e.employee_id) = _id;
  IF _row.id IS NULL OR _row.code_hash <> extensions.crypt(trim(_code), _row.code_hash) THEN
    INSERT INTO public.employee_verification_attempts (employee_id, success) VALUES (_id, false);
    RETURN;
  END IF;
  INSERT INTO public.employee_verification_attempts (employee_id, success) VALUES (_id, true);
  RETURN QUERY SELECT _row.employee_id, _row.full_name, _row.photo_url, _row.designation, _row.department, _row.status, _row.valid_until;
END;
$$;
REVOKE ALL ON FUNCTION public.verify_employee(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_employee(text, text) TO anon, authenticated;

-- Admin upsert: hashes code server-side
CREATE OR REPLACE FUNCTION public.admin_save_employee(
  _employee_id text, _code text, _full_name text, _photo_url text,
  _designation text, _department text, _status text, _valid_until date)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE _id text := upper(trim(_employee_id));
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
  IF _id = '' OR trim(_full_name) = '' THEN RAISE EXCEPTION 'invalid'; END IF;
  IF EXISTS (SELECT 1 FROM public.employees WHERE upper(employee_id) = _id) THEN
    UPDATE public.employees SET
      code_hash = CASE WHEN coalesce(trim(_code),'') = '' THEN code_hash ELSE extensions.crypt(trim(_code), extensions.gen_salt('bf')) END,
      full_name = trim(_full_name), photo_url = nullif(trim(_photo_url),''), designation = trim(_designation),
      department = trim(_department), status = _status, valid_until = _valid_until, updated_at = now()
    WHERE upper(employee_id) = _id;
  ELSE
    IF coalesce(length(trim(_code)),0) < 6 THEN RAISE EXCEPTION 'code_too_short'; END IF;
    INSERT INTO public.employees (employee_id, code_hash, full_name, photo_url, designation, department, status, valid_until)
    VALUES (_id, extensions.crypt(trim(_code), extensions.gen_salt('bf')), trim(_full_name), nullif(trim(_photo_url),''), trim(_designation), trim(_department), _status, _valid_until);
  END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.admin_save_employee(text,text,text,text,text,text,text,date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_save_employee(text,text,text,text,text,text,text,date) TO authenticated;