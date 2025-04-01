
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { NavigateFunction } from 'react-router-dom';
import { User, UserRole } from './types';
import { fetchUserProfile, redirectBasedOnRole } from './utils';
import { createDemoUser, isDemoAccount, createTestUser } from './demoAccounts';

// Login function
export const login = async (
  email: string, 
  password: string,
  navigate: NavigateFunction,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    
    // Check if this is a demo account
    if (isDemoAccount(email)) {
      // For demo accounts, bypass the actual authentication
      // and create a simulated user based on the email address
      const role = email.split('@')[0] as UserRole; // client@example.com -> client
      
      // Create a demo user object
      const demoUser = createDemoUser(email, role);
      
      // Set the demo user in the auth context
      setUser(demoUser);
      toast.success(`Demo login as ${role} successful`);
      
      // Redirect based on role
      redirectBasedOnRole(role, navigate, true);
      return;
    }
    
    // If not a demo account, proceed with normal authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      // Special handling for unconfirmed emails
      if (error.message.includes('Email not confirmed')) {
        // Create a temporary session anyway for development purposes
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', email)
          .single();
        
        if (userData) {
          // Set a temporary user object to bypass email confirmation
          const tempUser: User = {
            id: userData.id,
            email: userData.email,
            firstName: userData.first_name, 
            lastName: userData.last_name,
            role: userData.role as UserRole,
            avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.first_name}`,
            compassCompleted: userData.compass_completed || false,
          };
          
          setUser(tempUser);
          toast.success('Logged in successfully (dev mode)');
          
          // Redirect the user based on their role
          redirectBasedOnRole(userData.role as UserRole, navigate, undefined);
          return;
        } else {
          toast.error('Email not confirmed. Please check your inbox.');
        }
      } else {
        throw error;
      }
    }
    
    if (data.user) {
      toast.success('Logged in successfully');
      // Redirect will happen automatically via the onAuthStateChange handler
    }
    
  } catch (error: any) {
    toast.error(error.message || 'Login failed');
    console.error('Login error:', error);
  } finally {
    setIsLoading(false);
  }
};

// Logout function
export const logout = async (navigate: NavigateFunction) => {
  try {
    await supabase.auth.signOut();
    toast.info('Logged out successfully');
    navigate('/');
    return Promise.resolve();
  } catch (error) {
    console.error('Logout error:', error);
    return Promise.resolve();
  }
};

// Function for quick test access (for development purposes)
export const testAccess = async (
  role: UserRole, 
  navigate: NavigateFunction,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
  // Create a test user based on the requested role
  const testUser = createTestUser(role);
  
  // Set the user in state
  setUser(testUser);
  
  toast.success(`Quick access as ${role} activated`);
  
  // Redirect to appropriate dashboard
  redirectBasedOnRole(role, navigate, true);
  return Promise.resolve();
};
