ALTER TABLE public.people_profiles ADD COLUMN IF NOT EXISTS source_application_id uuid UNIQUE;

CREATE OR REPLACE FUNCTION public.sync_registration_profile()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  d jsonb := NEW.details;
  grp text;
  disp text;
  rl text;
  loc text;
  foc text[];
  summ text;
BEGIN
  IF NEW.status IS NOT DISTINCT FROM OLD.status THEN RETURN NEW; END IF;
  IF NEW.status <> 'approved' THEN
    DELETE FROM public.people_profiles WHERE source_application_id = NEW.id;
    RETURN NEW;
  END IF;
  grp := CASE NEW.category WHEN 'mentor' THEN 'mentors' WHEN 'investor' THEN 'investors' WHEN 'startup' THEN 'startups' WHEN 'business' THEN 'businesses' END;
  IF grp IS NULL THEN RETURN NEW; END IF;
  disp := CASE NEW.category WHEN 'startup' THEN coalesce(nullif(d->>'startupName',''), NEW.full_name) WHEN 'business' THEN coalesce(nullif(d->>'businessName',''), NEW.full_name) ELSE NEW.full_name END;
  rl := CASE NEW.category
    WHEN 'mentor' THEN concat_ws(', ', nullif(d->>'designation',''), nullif(d->>'organization',''))
    WHEN 'investor' THEN coalesce(d->>'investorType','Investor')
    WHEN 'startup' THEN concat_ws(' · ', nullif(d->>'startupStage',''), nullif(d->>'industry',''))
    ELSE concat_ws(' · ', nullif(d->>'businessType',''), nullif(d->>'industry','')) END;
  loc := coalesce(nullif(d->>'location',''), nullif(d->>'headquarter',''), nullif(d->>'geography',''), '');
  foc := ARRAY(SELECT jsonb_array_elements_text(CASE NEW.category
    WHEN 'mentor' THEN coalesce(d->'expertise','[]'::jsonb)
    WHEN 'investor' THEN CASE jsonb_typeof(d->'investmentFocus') WHEN 'array' THEN d->'investmentFocus' WHEN 'string' THEN jsonb_build_array(d->>'investmentFocus') ELSE '[]'::jsonb END
    ELSE CASE WHEN d ? 'industry' THEN jsonb_build_array(d->>'industry') ELSE '[]'::jsonb END END));
  summ := left(coalesce(CASE NEW.category WHEN 'mentor' THEN d->>'mentorAreas' WHEN 'investor' THEN d->>'investmentThesis' WHEN 'startup' THEN d->>'product' ELSE d->>'products' END, ''), 600);
  INSERT INTO public.people_profiles (person_group, slug, name, role, location, focus, summary, bio, source_application_id, sort_order)
  VALUES (grp, trim(both '-' from left(regexp_replace(lower(disp), '[^a-z0-9]+', '-', 'g'), 60)) || '-' || lower(NEW.application_code), disp, coalesce(rl,''), loc, foc, summ, summ, NEW.id, 100)
  ON CONFLICT (source_application_id) DO UPDATE SET person_group = EXCLUDED.person_group, name = EXCLUDED.name, role = EXCLUDED.role, location = EXCLUDED.location, focus = EXCLUDED.focus, summary = EXCLUDED.summary;
  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.sync_registration_profile() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS registration_profile_sync ON public.registration_applications;
CREATE TRIGGER registration_profile_sync AFTER UPDATE OF status ON public.registration_applications
FOR EACH ROW EXECUTE FUNCTION public.sync_registration_profile();