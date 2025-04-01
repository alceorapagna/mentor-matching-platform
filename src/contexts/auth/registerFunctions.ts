
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { NavigateFunction } from 'react-router-dom';
import { User, UserRole, RegisterData } from './types';
import { redirectBasedOnRole } from './utils';

// Register function
export const register = async (
  userData: RegisterData,
  navigate: NavigateFunction,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    
    // Register the user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
          specialization: userData.specialization,
        }
      }
    });
    
    if (error) {
      throw error;
    }
    
    if (data.user) {
      toast.success('Account created successfully');
      
      // Create a temporary user for immediate access during development
      // This works around the email confirmation requirement
      const tempUser: User = {
        id: data.user.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role || 'client',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`,
        compassCompleted: false,
      };
      
      // Set the user immediately for development purposes
      setUser(tempUser);
      
      // For coach applications, show a message and redirect differently
      if (userData.role === 'coach') {
        toast.info('Your coach application is under review');
        setTimeout(() => {
          redirectBasedOnRole('coach', navigate, false);
        }, 1000);
      } else {
        // For all other roles, redirect to Reneu Compass for new users
        toast.info('Please complete your Reneu Compass assessment to continue');
        setTimeout(() => {
          navigate('/reneu-compass');
        }, 1000);
      }
    }
    
  } catch (error: any) {
    toast.error(error.message || 'Registration failed');
    console.error('Registration error:', error);
  } finally {
    setIsLoading(false);
  }
};
