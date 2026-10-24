CREATE TABLE public.people_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_group text NOT NULL CHECK (person_group IN ('investors','mentors','team')),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  focus text[] NOT NULL DEFAULT '{}',
  summary text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  photo_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.people_profiles TO authenticated;
GRANT ALL ON public.people_profiles TO service_role;
ALTER TABLE public.people_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in users read profiles" ON public.people_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins insert profiles" ON public.people_profiles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update profiles" ON public.people_profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete profiles" ON public.people_profiles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));