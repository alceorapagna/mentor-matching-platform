
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
      
      // Field name for the database update (lowercase only)
      const dbFieldName = `has${coachCategory}coach`;
      
      // Set the coach flag in the user object (handle both formats for backward compatibility)
      if (coachCategory === 'reneu') {
        updatedUser.hasreneucoach = true;
        // Also update camelCase version if it exists in the user object
        if ('hasReneuCoach' in updatedUser) {
          updatedUser.hasReneuCoach = true;
        }
      } else if (coachCategory === 'business') {
        updatedUser.hasbusinesscoach = true;
        if ('hasBusinessCoach' in updatedUser) {
          updatedUser.hasBusinessCoach = true;
        }
      } else if (coachCategory === 'mind') {
        updatedUser.hasmindcoach = true;
        if ('hasMindCoach' in updatedUser) {
          updatedUser.hasMindCoach = true;
        }
      } else if (coachCategory === 'body') {
        updatedUser.hasbodycoach = true;
        if ('hasBodyCoach' in updatedUser) {
          updatedUser.hasBodyCoach = true;
        }
      }
      
      // Update the user document - only use the lowercase field names as they exist in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          [dbFieldName]: true
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
