
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole, CompassData, RegisterData } from '../types';
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
  const login = async (email: string, password: string): Promise<User | null> => {
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
        return demoUser;
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
      
      const userObj = {
        id: userData.id,
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        role: userData.role as UserRole,
        avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.first_name}`,
        compassCompleted: userData.compass_completed || false,
        compassData: userData.compass_data as any,
        hasReneuCoach: userData.hasreneucoach || false,
        hasBusinessCoach: userData.hasbusinesscoach || false,
        hasMindCoach: userData.hasmindcoach || false,
        hasBodyCoach: userData.hasbodycoach || false,
        hasreneucoach: userData.hasreneucoach || false,
        hasbusinesscoach: userData.hasbusinesscoach || false,
        hasmindcoach: userData.hasmindcoach || false,
        hasbodycoach: userData.hasbodycoach || false
      } as User;
      
      setUser(userObj);
      
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
      
      return userObj;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Something went wrong during login",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<User | null> => {
    setIsLoading(true);
    
    try {
      // Demo registration - just show success toast
      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now login.",
      });
      
      navigate('/login');
      return null;
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong during registration",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // For demo accounts, just reset the user state
      if (user && isDemoAccount(user.email)) {
        setUser(null);
        navigate('/login');
        return Promise.resolve();
      }
      
      // For real users, sign out from Supabase
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
      return Promise.resolve();
    } catch (error) {
      console.error('Logout error:', error);
      return Promise.resolve();
    }
  };

  // Testing access function
  const testAccess = async (requiredRole?: UserRole): Promise<boolean> => {
    if (!requiredRole && !user) {
      return false;
    }
    
    const roleToUse = requiredRole || 'client';
    
    if (!user) {
      // If no user is logged in, create a test user with the required role
      const testUser = createTestUser(roleToUse);
      setUser(testUser);
      
      toast({
        title: "Test Access Activated",
        description: `You now have ${roleToUse} privileges for testing`,
      });
      
      // Redirect based on the role
      if (roleToUse === 'client') {
        navigate('/dashboard');
      } else if (roleToUse === 'coach') {
        navigate('/coach-dashboard');
      } else if (roleToUse === 'admin') {
        navigate('/admin-dashboard');
      } else if (roleToUse === 'hr') {
        navigate('/hr-dashboard');
      }
      return true;
    }
    
    // If a user is already logged in but with the wrong role
    if (user.role !== roleToUse) {
      // Create a new test user with the required role
      const testUser = createTestUser(roleToUse);
      setUser(testUser);
      
      toast({
        title: "Role Switched",
        description: `You now have ${roleToUse} privileges for testing`,
      });
      
      // Redirect based on the new role
      if (roleToUse === 'client') {
        navigate('/dashboard');
      } else if (roleToUse === 'coach') {
        navigate('/coach-dashboard');
      } else if (roleToUse === 'admin') {
        navigate('/admin-dashboard');
      } else if (roleToUse === 'hr') {
        navigate('/hr-dashboard');
      }
    }
    return true;
  };

  return {
    login,
    register,
    logout,
    testAccess
  };
};
