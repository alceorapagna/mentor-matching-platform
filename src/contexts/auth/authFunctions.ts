
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { NavigateFunction } from 'react-router-dom';
import { RegisterData, User, UserRole, CompassData } from './types';
import { fetchUserProfile, redirectBasedOnRole } from './utils';

// Sample compass data for demo accounts
const sampleCompassData: CompassData = {
  purpose: "To achieve balance and growth in my professional and personal life.",
  coreValues: ["Wellbeing", "Growth", "Balance", "Authenticity", "Connection"],
  dimensions: {
    work: { 
      current: 6, 
      desired: 9, 
      notes: "Looking to advance my career while maintaining balance."
    },
    mind: { 
      current: 5, 
      desired: 8, 
      notes: "Working on reducing stress and improving mental clarity."
    },
    body: { 
      current: 4, 
      desired: 7, 
      notes: "Need to establish consistent exercise routines and better sleep habits."
    }
  }
};

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
    const isDemoAccount = email.includes('@example.com');
    
    if (isDemoAccount) {
      // For demo accounts, bypass the actual authentication
      // and create a simulated user based on the email address
      const role = email.split('@')[0] as UserRole; // client@example.com -> client
      
      // Create a demo user object
      const demoUser: User = {
        id: `demo-${role}-${Date.now()}`,
        email: email,
        firstName: 'Demo',
        lastName: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize first letter
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Demo${role}`,
        compassCompleted: true, // Demo accounts have completed the compass
        compassData: role === 'client' ? sampleCompassData : undefined, // Add compass data for client users
      };
      
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
        role: userData.role,
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

// Logout function
export const logout = async (navigate: NavigateFunction) => {
  try {
    await supabase.auth.signOut();
    toast.info('Logged out successfully');
    navigate('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Function for quick test access (for development purposes)
export const testAccess = (
  role: UserRole, 
  navigate: NavigateFunction,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
  // Create a test user based on the requested role
  const testUser: User = {
    id: `test_${role}_${Date.now()}`,
    email: `${role}@test.com`,
    firstName: 'Test',
    lastName: role.charAt(0).toUpperCase() + role.slice(1),
    role: role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Test${role}`,
    compassCompleted: true, // Test users have completed the compass
    compassData: role === 'client' ? sampleCompassData : undefined, // Add compass data for client test users
  };
  
  // Set the user in state and localStorage
  setUser(testUser);
  localStorage.setItem('reneu_user', JSON.stringify(testUser));
  
  toast.success(`Quick access as ${role} activated`);
  
  // Redirect to appropriate dashboard
  redirectBasedOnRole(role, navigate, undefined);
};
