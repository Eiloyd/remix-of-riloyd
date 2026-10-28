REVOKE ALL ON FUNCTION public.admin_save_employee(text,text,text,text,text,text,text,date) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_employee(text,text,text,text,text,text,text,date) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.has_role(uuid,public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid,public.app_role) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.verify_employee(text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_employee(text,text) TO anon, authenticated, service_role;