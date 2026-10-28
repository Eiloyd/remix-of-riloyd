CREATE OR REPLACE FUNCTION public.admin_setup_metadata() RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY INVOKER SET search_path = '' AS $$
BEGIN
 IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN RAISE EXCEPTION 'Admin access required' USING ERRCODE = '42501'; END IF;
 RETURN jsonb_build_object('tables', COALESCE((SELECT jsonb_agg(jsonb_build_object('name', c.relname, 'rls', c.relrowsecurity, 'columns', (SELECT jsonb_agg(jsonb_build_object('name', a.attname, 'type', pg_catalog.format_type(a.atttypid, a.atttypmod), 'nullable', NOT a.attnotnull) ORDER BY a.attnum) FROM pg_catalog.pg_attribute a WHERE a.attrelid = c.oid AND a.attnum > 0 AND NOT a.attisdropped)) ORDER BY c.relname) FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace WHERE n.nspname = 'public' AND c.relkind IN ('r','p') AND COALESCE(pg_catalog.obj_description(c.oid,'pg_class'),'') NOT LIKE 'DEPRECATED:%'), '[]'::jsonb), 'functions', COALESCE((SELECT jsonb_agg(DISTINCT p.proname ORDER BY p.proname) FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname = 'public' AND p.proname IN ('has_role','admin_save_employee','verify_employee','consume_form_submission_limit')), '[]'::jsonb));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_setup_metadata() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_setup_metadata() TO authenticated;
COMMENT ON FUNCTION public.admin_setup_metadata() IS 'Admin-only read-only catalog metadata; no application rows or repairs.';