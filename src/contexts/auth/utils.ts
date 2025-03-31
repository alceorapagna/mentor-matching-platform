
import { UserRole } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Helper function to redirect based on user role and compass completion status
export const redirectBasedOnRole = (
  role: UserRole,
  navigate: (path: string) => void,
  compassCompleted?: boolean
) => {
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

// Fetch the user profile from the profiles table
export const fetchUserProfile = async (userId: string, setUser: Function, setIsLoading: Function) => {
  try {
    console.log("Fetching profile for user:", userId);
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
        role: data.role,
        avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.first_name}`,
        compassCompleted: data.compass_completed || false,
        compassData: data.compass_data,
      });
    }
  } catch (error) {
    console.error('Error in profile fetch:', error);
    setUser(null);
  } finally {
    setIsLoading(false);
  }
};
