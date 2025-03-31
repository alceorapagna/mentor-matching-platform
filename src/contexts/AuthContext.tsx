import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

// Define user types
export type UserRole = 'client' | 'coach' | 'admin' | 'hr';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  compassCompleted?: boolean; // Track if user has completed the Reneu Compass
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  testAccess: (role: UserRole) => void;
  updateCompassStatus: (completed: boolean) => Promise<void>;
}

// Registration data type
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  specialization?: string;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  testAccess: () => {},
  updateCompassStatus: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Initialize auth state and listen for changes
  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile data after a short delay to avoid deadlocks
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Fetch the user profile from the profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      // Use explicit type casting for the query result
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
      } else if (data) {
        console.log("Profile data received:", data);
        // Type assert the data to have the expected properties
        setUser({
          id: data.id,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          role: data.role as UserRole,
          avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.first_name}`,
          compassCompleted: data.compass_completed || false,
        });
        
        // Redirect based on user role after profile is fetched
        redirectBasedOnRole(data.role as UserRole, data.compass_completed);
      }
    } catch (error) {
      console.error('Error in profile fetch:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to redirect based on user role and compass completion status
  const redirectBasedOnRole = (role: UserRole, compassCompleted?: boolean) => {
    console.log("Redirecting based on role:", role, "Compass completed:", compassCompleted);
    
    // For new users who haven't completed their compass assessment
    if (role === 'client' && compassCompleted === false) {
      navigate('/reneu-compass');
      return;
    }
    
    // Otherwise proceed with regular role-based routing
    switch (role) {
      case 'client':
        navigate('/dashboard');
        break;
      case 'coach':
        navigate('/coach-dashboard');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'hr':
        navigate('/hr-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Function to update user's compass completion status
  const updateCompassStatus = async (completed: boolean) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ compass_completed: completed })
        .eq('id', user.id);
        
      if (error) {
        console.error('Error updating compass status:', error);
        toast.error('Failed to update your progress');
        return;
      }
      
      // Update local user state
      setUser({
        ...user,
        compassCompleted: completed
      });
      
      toast.success('Progress saved successfully');
    } catch (error) {
      console.error('Error in updateCompassStatus:', error);
      toast.error('An error occurred while saving your progress');
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
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
            redirectBasedOnRole(userData.role as UserRole);
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
  const register = async (userData: RegisterData) => {
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
            redirectBasedOnRole('coach', false);
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
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.info('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Function for quick test access (for development purposes)
  const testAccess = (role: UserRole) => {
    // Create a test user based on the requested role
    const testUser: User = {
      id: `test_${role}_${Date.now()}`,
      email: `${role}@test.com`,
      firstName: 'Test',
      lastName: role.charAt(0).toUpperCase() + role.slice(1),
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Test${role}`,
    };
    
    // Set the user in state and localStorage
    setUser(testUser);
    localStorage.setItem('reneu_user', JSON.stringify(testUser));
    
    toast.success(`Quick access as ${role} activated`);
    
    // Redirect to appropriate dashboard
    redirectBasedOnRole(role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login, 
      register, 
      logout,
      testAccess,
      updateCompassStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
