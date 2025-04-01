
import { supabase } from '@/integrations/supabase/client';
import { User } from '../types';
import { isDemoAccount } from '../demoAccounts';

type CoachActionsProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const useCoachActions = ({ user, setUser }: CoachActionsProps) => {
  // Coach update function
  const updateUserCoach = async (coachType: string) => {
    if (!user) return false;
    
    try {
      const coachTypeMapping: { [key: string]: string } = {
        'reneu': 'hasReneuCoach',
        'business': 'hasBusinessCoach',
        'mind': 'hasMindCoach',
        'body': 'hasBodyCoach'
      };
      
      if (!coachTypeMapping[coachType]) {
        throw new Error("Invalid coach type");
      }
      
      const updateField = coachTypeMapping[coachType];
      
      // For demo, just update the local state
      const updatedUser = {
        ...user,
        [updateField]: true
      };
      
      setUser(updatedUser);
      
      // For real users, also update in Supabase
      if (!isDemoAccount(user.email)) {
        const { error } = await supabase
          .from('profiles')
          .update({ [updateField.toLowerCase()]: true })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      console.log(`Coach updated for ${updateField}:`, updatedUser);
      return true;
    } catch (error) {
      console.error('Error updating user coach:', error);
      throw error;
    }
  };

  return {
    updateUserCoach
  };
};
