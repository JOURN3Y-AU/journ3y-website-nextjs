
import { useState, useEffect } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminBlogEdit from '@/components/admin/AdminBlogEdit';
import AdminUserManagement from '@/components/admin/AdminUserManagement';
import AdminTeamManagement from '@/components/admin/AdminTeamManagement';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
    });

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        return true;
      }
      return false;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard onLogout={handleLogout} />} />
      <Route path="/edit/:slug" element={<AdminBlogEdit onLogout={handleLogout} />} />
      <Route path="/new" element={<AdminBlogEdit onLogout={handleLogout} isNew />} />
      <Route path="/users" element={<AdminUserManagement onLogout={handleLogout} />} />
      <Route path="/team" element={<AdminTeamManagement onLogout={handleLogout} />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
