
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.email);
        setSession(newSession);
        
        // Check if user is in admin_users table
        if (newSession?.user) {
          checkAdminStatus(newSession.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Current session:', currentSession?.user?.email);
      setSession(currentSession);
      
      // Check admin status if we have a session
      if (currentSession?.user) {
        checkAdminStatus(currentSession.user.id);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      console.log('Checking admin status for user:', userId);
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', userId)
        .single();
        
      setIsAdmin(!!data);
      console.log('Admin status check result:', !!data);
      
      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error in admin check:", error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signin with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }
      
      // Check if the user is in admin_users table
      if (data.user) {
        console.log('User signed in, checking admin status');
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (adminError || !adminData) {
          // User exists but is not an admin
          console.error("User is not an admin:", adminError);
          await supabase.auth.signOut();
          throw new Error('User is not authorized for admin access');
        }
        
        console.log('Admin verification successful');
        return data;
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error.message || "Failed to sign in. Please check your credentials.",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "Failed to sign out.",
      });
    }
  };

  return { 
    session, 
    loading, 
    isAdmin,
    signIn, 
    signOut 
  };
}
