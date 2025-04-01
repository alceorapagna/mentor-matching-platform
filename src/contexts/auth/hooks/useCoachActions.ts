
import { useState } from 'react';
import { User } from '@/contexts/auth/types';
import { supabase } from '@/integrations/supabase/client';

// This hook centralizes the coach-related functions
export const useCoachActions = (
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
  const [isUpdatingCoach, setIsUpdatingCoach] = useState(false);

  // Update the user's coach selection
  const updateUserCoach = async (coachCategory: string): Promise<boolean> => {
    if (!user || !user.id) return false;
    
    try {
      setIsUpdatingCoach(true);
      
      // Create an updated user object with the new coach status
      const updatedUser = { ...user };
      
      // Set the appropriate coach flag based on the category
      if (coachCategory === 'reneu') {
        updatedUser.hasreneucoach = true;
        updatedUser.hasReneuCoach = true;
      } else if (coachCategory === 'business') {
        updatedUser.hasbusinesscoach = true;
        updatedUser.hasBusinessCoach = true;
      } else if (coachCategory === 'mind') {
        updatedUser.hasmindcoach = true;
        updatedUser.hasMindCoach = true;
      } else if (coachCategory === 'body') {
        updatedUser.hasbodycoach = true;
        updatedUser.hasBodyCoach = true;
      }
      
      // Update the user document
      const { error } = await supabase
        .from('profiles')
        .update({
          [`has${coachCategory}coach`]: true,
          [`has${coachCategory.charAt(0).toUpperCase() + coachCategory.slice(1)}Coach`]: true
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update the local user state
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Error updating coach:', error);
      return false;
    } finally {
      setIsUpdatingCoach(false);
    }
  };

  return {
    updateUserCoach,
    isUpdatingCoach
  };
};
