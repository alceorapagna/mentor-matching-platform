
import { supabase } from '@/integrations/supabase/client';
import { User, CompassData } from '../types';
import { isDemoAccount } from '../demoAccounts';

type CompassActionsProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const useCompassActions = ({ user, setUser }: CompassActionsProps) => {
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
      if (!isDemoAccount(user.email)) {
        const { error } = await supabase
          .from('profiles')
          .update({ compass_completed: completed })
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
      if (!isDemoAccount(user.email)) {
        const { error } = await supabase
          .from('profiles')
          .update({ 
            compass_data: compassData as any
          })
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
      if (!isDemoAccount(user.email)) {
        const { error } = await supabase
          .from('profiles')
          .update({ 
            compass_data: null,
            compass_completed: false
          })
          .eq('id', user.id);
          
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error resetting compass data:', error);
    }
  };

  return {
    updateCompassStatus,
    updateCompassData,
    resetCompassData
  };
};
