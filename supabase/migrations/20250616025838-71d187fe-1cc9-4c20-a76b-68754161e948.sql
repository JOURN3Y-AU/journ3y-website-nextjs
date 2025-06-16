
-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated users to insert site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated users to update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated users to delete site settings" ON public.site_settings;

-- Create more permissive policies for site settings
-- Since this is admin functionality, we'll allow all authenticated users
-- In a production environment, you'd want to add proper admin role checking

CREATE POLICY "Allow all authenticated users to read site settings" 
  ON public.site_settings 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow all authenticated users to insert site settings" 
  ON public.site_settings 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update site settings" 
  ON public.site_settings 
  FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to delete site settings" 
  ON public.site_settings 
  FOR DELETE 
  TO authenticated 
  USING (true);
