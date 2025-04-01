import { supabase } from '@/integrations/supabase/client';
import { User, UserRole, CompassData } from '../types';
import { isDemoAccount, createDemoUser, createTestUser } from '../demoAccounts';
import { NavigateFunction } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type AuthActionsProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  toast: any;
};

export const useAuthActions = ({ 
  user, 
  setUser, 
  setIsLoading, 
  navigate, 
  toast 
}: AuthActionsProps) => {
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Handle demo accounts
      if (isDemoAccount(email) && password === 'password123') {
        const demoRole = email.split('@')[0] as any;
        const demoUser = createDemoUser(email, demoRole);
        
        setUser(demoUser);
        toast({
          title: "Demo Login Successful",
          description: `Welcome to the ${demoRole} demo account!`,
        });
        
        // Redirect based on role
        if (demoRole === 'client') {
          navigate('/dashboard');
        } else if (demoRole === 'coach') {
          navigate('/coach-dashboard');
        } else if (demoRole === 'admin') {
          navigate('/admin-dashboard');
        } else if (demoRole === 'hr') {
          navigate('/hr-dashboard');
        }
        
        setIsLoading(false);
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
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (userError) throw userError;
      
      setUser({
        id: userData.id,
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        role: userData.role as UserRole,
        avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.first_name}`,
        compassCompleted: userData.compass_completed || false,
        compassData: userData.compass_data as any,
      } as User);
      
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

  // Register function
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
      if (user && isDemoAccount(user.email)) {
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
  const testAccess = (requiredRole: UserRole) => {
    if (!user) {
      // If no user is logged in, create a test user with the required role
      const testUser = createTestUser(requiredRole);
      setUser(testUser);
      
      toast({
        title: "Test Access Activated",
        description: `You now have ${requiredRole} privileges for testing`,
      });
      
      // Redirect based on the role
      if (requiredRole === 'client') {
        navigate('/dashboard');
      } else if (requiredRole === 'coach') {
        navigate('/coach-dashboard');
      } else if (requiredRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (requiredRole === 'hr') {
        navigate('/hr-dashboard');
      }
      return;
    }
    
    // If a user is already logged in but with the wrong role
    if (user.role !== requiredRole) {
      // Create a new test user with the required role
      const testUser = createTestUser(requiredRole);
      setUser(testUser);
      
      toast({
        title: "Role Switched",
        description: `You now have ${requiredRole} privileges for testing`,
      });
      
      // Redirect based on the new role
      if (requiredRole === 'client') {
        navigate('/dashboard');
      } else if (requiredRole === 'coach') {
        navigate('/coach-dashboard');
      } else if (requiredRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (requiredRole === 'hr') {
        navigate('/hr-dashboard');
      }
    }
  };

  return {
    login,
    register,
    logout,
    testAccess
  };
};
