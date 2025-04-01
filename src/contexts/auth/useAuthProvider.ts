
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthContextType, CompassData } from '../auth/types';
import { useToast } from '@/hooks/use-toast';
import { demoAccounts } from './demoAccounts';

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on first load
  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          setUser(null);
        } else if (data.session) {
          // Get the user profile from the database
          const { data: userData, error: userError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
            
          if (userError) {
            console.error('Error fetching user profile:', userError);
            setUser(null);
          } else if (userData) {
            setUser(userData as User);
          }
        }
      } catch (error) {
        console.error('Error in session check:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    getSession();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Get the user profile from the database
        const { data: userData, error: userError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (userError) {
          console.error('Error fetching user profile:', userError);
          setUser(null);
        } else if (userData) {
          setUser(userData as User);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Handle demo accounts
      const demoAccount = demoAccounts.find(account => account.email === email);
      
      if (demoAccount && password === 'demo') {
        setUser(demoAccount);
        toast({
          title: "Demo Login Successful",
          description: `Welcome to the ${demoAccount.role} demo account!`,
        });
        
        // Redirect based on role
        if (demoAccount.role === 'client') {
          navigate('/dashboard');
        } else if (demoAccount.role === 'coach') {
          navigate('/coach-dashboard');
        } else if (demoAccount.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (demoAccount.role === 'hr') {
          navigate('/hr-dashboard');
        }
        
        return;
      }
      
      // Normal login flow
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Fetch user profile
      const { data: userData, error: userError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (userError) throw userError;
      
      setUser(userData as User);
      
      toast({
        title: "Login Successful",
        description: "You've been successfully logged in",
      });
      
      // Redirect based on role
      if (userData.role === 'client') {
        navigate('/dashboard');
      } else if (userData.role === 'coach') {
        navigate('/coach-dashboard');
      } else if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (userData.role === 'hr') {
        navigate('/hr-dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Something went wrong during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Register function - simplified for the demo
  const register = async (userData: any) => {
    setIsLoading(true);
    
    try {
      // Demo registration - just show success toast
      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now login.",
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // For demo accounts, just reset the user state
      if (user && demoAccounts.some(account => account.email === user.email)) {
        setUser(null);
        navigate('/login');
        return;
      }
      
      // For real users, sign out from Supabase
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Testing access function
  const testAccess = (requiredRole: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== requiredRole) {
      toast({
        title: "Access Denied",
        description: `You need ${requiredRole} privileges to access this page`,
        variant: "destructive",
      });
      
      // Redirect based on user role
      if (user.role === 'client') {
        navigate('/dashboard');
      } else if (user.role === 'coach') {
        navigate('/coach-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'hr') {
        navigate('/hr-dashboard');
      }
    }
  };

  // Compass-related functions
  const updateCompassStatus = async (completed: boolean) => {
    if (!user) return;
    
    try {
      // For demo, just update the local state
      setUser({
        ...user,
        compassCompleted: completed
      });
      
      // For real users, also update in Supabase
      if (!demoAccounts.some(account => account.email === user.email)) {
        const { error } = await supabase
          .from('user_profiles')
          .update({ compassCompleted: completed })
          .eq('id', user.id);
          
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating compass status:', error);
    }
  };

  const updateCompassData = async (compassData: CompassData) => {
    if (!user) return;
    
    try {
      // For demo, just update the local state
      setUser({
        ...user,
        compassData
      });
      
      // For real users, also update in Supabase
      if (!demoAccounts.some(account => account.email === user.email)) {
        const { error } = await supabase
          .from('user_profiles')
          .update({ compassData })
          .eq('id', user.id);
          
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating compass data:', error);
    }
  };

  const resetCompassData = async () => {
    if (!user) return;
    
    try {
      // For demo, just update the local state
      setUser({
        ...user,
        compassData: undefined,
        compassCompleted: false
      });
      
      // For real users, also update in Supabase
      if (!demoAccounts.some(account => account.email === user.email)) {
        const { error } = await supabase
          .from('user_profiles')
          .update({ 
            compassData: null,
            compassCompleted: false
          })
          .eq('id', user.id);
          
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error resetting compass data:', error);
    }
  };

  // Coach update function
  const updateUserCoach = async (coachType: string) => {
    if (!user) return;
    
    try {
      const coachTypeMapping: { [key: string]: string } = {
        'reneu': 'hasReneuCoach',
        'business': 'hasBusinessCoach',
        'mind': 'hasMindCoach',
        'body': 'hasBodyCoach'
      };
      
      if (!coachTypeMapping[coachType]) {
        throw new Error("Invalid coach type");
      }
      
      const updateField = coachTypeMapping[coachType];
      
      // For demo, just update the local state
      setUser({
        ...user,
        [updateField]: true
      });
      
      // For real users, also update in Supabase
      if (!demoAccounts.some(account => account.email === user.email)) {
        const { error } = await supabase
          .from('user_profiles')
          .update({ [updateField]: true })
          .eq('id', user.id);
          
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating user coach:', error);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    testAccess,
    updateCompassStatus,
    updateCompassData,
    resetCompassData,
    updateUserCoach
  };
};
