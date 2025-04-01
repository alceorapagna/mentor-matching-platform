
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
      
      console.log(`Updating coach status for category: ${coachCategory}, field: ${dbFieldName}`);
      
      // Set the coach flag in the user object (handle both formats for backward compatibility)
      if (coachCategory === 'reneu') {
        updatedUser.hasreneucoach = true;
        // Also update camelCase version if it exists in the user object
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
      
      console.log(`Attempting to update coach status for user ${user.id}`);
      console.log('Updated user object:', updatedUser);
      
      // Skip database update for demo/test users with non-UUID IDs
      if (user.id.includes('test_') || !user.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        console.log('Demo/test user detected, skipping database update');
        // Just update the local state for demo/test users
        setUser(updatedUser);
        return true;
      }
      
      console.log(`Updating ${dbFieldName} in profiles for user ${user.id}`);
      
      // Update the user document - only use the lowercase field names as they exist in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          [dbFieldName]: true
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('Error updating coach:', error);
        throw error;
      }
      
      console.log('Coach update successful, updating local user state');
      
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
