
-- Create admin_users table to track admin users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  is_super_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy that allows only super admins to SELECT admin_users
CREATE POLICY "Super admins can view all admin_users"
  ON public.admin_users
  FOR SELECT
  USING (is_super_admin = true);

-- Create policy that allows admins to see their own records
CREATE POLICY "Admins can view their own records"
  ON public.admin_users
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy that allows super admins to INSERT admin_users
CREATE POLICY "Super admins can insert admin_users"
  ON public.admin_users
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (SELECT id FROM public.admin_users WHERE is_super_admin = true)
    OR auth.role() = 'service_role'
  );

-- Create policy that allows super admins to UPDATE admin_users
CREATE POLICY "Super admins can update admin_users"
  ON public.admin_users
  FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM public.admin_users WHERE is_super_admin = true)
    OR auth.role() = 'service_role'
  );

-- Create policy that allows super admins to DELETE admin_users
CREATE POLICY "Super admins can delete admin_users"
  ON public.admin_users
  FOR DELETE
  USING (
    auth.uid() IN (SELECT id FROM public.admin_users WHERE is_super_admin = true)
    OR auth.role() = 'service_role'
  );

-- Create function to add a new admin user to admin_users when registered
CREATE OR REPLACE FUNCTION public.handle_new_admin_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is the first admin, make them a super admin
  IF NOT EXISTS (SELECT 1 FROM public.admin_users) THEN
    INSERT INTO public.admin_users (id, email, is_super_admin)
    VALUES (NEW.id, NEW.email, TRUE);
  ELSIF NEW.email = 'admin@example.com' THEN
    -- If this is the default admin, make them a super admin
    INSERT INTO public.admin_users (id, email, is_super_admin)
    VALUES (NEW.id, NEW.email, TRUE);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to handle new admin signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_admin_signup();

-- Insert default admin if doesn't exist (using service_role)
INSERT INTO public.admin_users (id, email, is_super_admin)
SELECT id, email, TRUE
FROM auth.users
WHERE email = 'admin@example.com'
ON CONFLICT (email) DO NOTHING;
