
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
      
      // Create a deep copy of the user object to avoid mutation issues
      const updatedUser = structuredClone(user);
      
      // Field name for the database update (lowercase only)
      const dbFieldName = `has${coachCategory.toLowerCase()}coach`;
      
      console.log(`[useCoachActions] Updating coach status for category: ${coachCategory}, field: ${dbFieldName}`);
      console.log('[useCoachActions] Current user before update:', JSON.stringify(updatedUser));
      
      // Set the coach flag in the user object (handle both formats)
      const camelCaseField = `has${coachCategory.charAt(0).toUpperCase() + coachCategory.slice(1)}Coach`;
      
      // Explicitly set both versions to true
      updatedUser[dbFieldName] = true;
      updatedUser[camelCaseField] = true;
      
      console.log('[useCoachActions] Updated user object after modification:', JSON.stringify(updatedUser));
      console.log(`[useCoachActions] Set fields: ${dbFieldName}=${updatedUser[dbFieldName]}, ${camelCaseField}=${updatedUser[camelCaseField]}`);
      
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
      console.log('[useCoachActions] Updating local user state with:', JSON.stringify(updatedUser));
      
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
