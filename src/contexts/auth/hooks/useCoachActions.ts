
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
      
      // Create a deep copy of the user object
      const updatedUser = { ...user };
      
      // Field name for the database update (lowercase only)
      const dbFieldName = `has${coachCategory}coach`;
      
      console.log(`[useCoachActions] Updating coach status for category: ${coachCategory}, field: ${dbFieldName}`);
      console.log('[useCoachActions] Current user before update:', updatedUser);
      
      // Set the coach flag in the user object (handle both formats)
      if (coachCategory === 'reneu') {
        updatedUser.hasreneucoach = true;
        updatedUser.hasReneuCoach = true;
        console.log('[useCoachActions] Setting reneu coach to true');
      } else if (coachCategory === 'business') {
        updatedUser.hasbusinesscoach = true;
        updatedUser.hasBusinessCoach = true;
        console.log('[useCoachActions] Setting business coach to true');
      } else if (coachCategory === 'mind') {
        updatedUser.hasmindcoach = true;
        updatedUser.hasMindCoach = true;
        console.log('[useCoachActions] Setting mind coach to true');
      } else if (coachCategory === 'body') {
        // Add extra logging for body coach
        console.log('[useCoachActions] Setting body coach to true (BEFORE):', {
          current_hasbodycoach: updatedUser.hasbodycoach,
          current_hasBodyCoach: updatedUser.hasBodyCoach,
          user_hasbodycoach: user.hasbodycoach,
          user_hasBodyCoach: user.hasBodyCoach
        });
        
        updatedUser.hasbodycoach = true;
        updatedUser.hasBodyCoach = true;
        
        console.log('[useCoachActions] Setting body coach to true (AFTER):', {
          updated_hasbodycoach: updatedUser.hasbodycoach,
          updated_hasBodyCoach: updatedUser.hasBodyCoach
        });
      }
      
      console.log('[useCoachActions] Updated user object after modification:', updatedUser);
      
      // Skip database update for demo/test users with non-UUID IDs
      if (user.id.includes('test_') || !user.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        console.log('[useCoachActions] Demo/test user detected, skipping database update');
        // Just update the local state for demo/test users
        setUser(updatedUser);
        return true;
      }
      
      console.log(`[useCoachActions] Updating ${dbFieldName} in profiles for user ${user.id}`);
      
      // Update the user document - only use the lowercase field names as they exist in the database
      const { data, error } = await supabase
        .from('profiles')
        .update({
          [dbFieldName]: true
        })
        .eq('id', user.id)
        .select();
      
      if (error) {
        console.error('[useCoachActions] Error updating coach:', error);
        throw error;
      }
      
      console.log('[useCoachActions] Coach update successful, data returned:', data);
      console.log('[useCoachActions] Updating local user state with:', updatedUser);
      
      // Update the local user state
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('[useCoachActions] Error updating coach:', error);
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
