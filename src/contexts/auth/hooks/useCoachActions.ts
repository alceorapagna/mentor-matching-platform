
import { supabase } from '@/integrations/supabase/client';
import { User } from '../types';
import { isDemoAccount } from '../demoAccounts';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type CoachActionsProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const useCoachActions = ({ user, setUser }: CoachActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Coach update function
  const updateUserCoach = async (coachType: string) => {
    if (!user) return false;
    
    try {
      const coachTypeMapping: { [key: string]: string } = {
        'reneu': 'hasreneucoach',
        'business': 'hasbusinesscoach',
        'mind': 'hasmindcoach',
        'body': 'hasbodycoach'
      };
      
      if (!coachTypeMapping[coachType]) {
        throw new Error("Invalid coach type");
      }
      
      const updateField = coachTypeMapping[coachType];
      
      // For demo, just update the local state
      const updatedUser = {
        ...user,
        [updateField]: true,
        // Also set the camelCase version for component display
        [updateField.replace(/^has/, 'has').replace(/coach$/, 'Coach')]: true
      };
      
      console.log("Updating user with coach:", {
        originalUser: user,
        updateField,
        updatedUser
      });
      
      setUser(updatedUser);
      
      // For real users, also update in Supabase
      if (!isDemoAccount(user.email)) {
        console.log(`Updating Supabase field '${updateField}' for user ${user.id}`);
        
        const { error } = await supabase
          .from('profiles')
          .update({ [updateField]: true })
          .eq('id', user.id);
          
        if (error) {
          console.error('Error updating profile in Supabase:', error);
          throw error;
        }
      }
      
      console.log(`Coach updated for ${updateField}:`, updatedUser);
      
      // Show success toast
      toast({
        title: "Coach Added",
        description: "Your coach has been added to your team.",
      });
      
      // Use a timeout to ensure the toast is visible before navigation
      setTimeout(() => {
        navigate('/dashboard?tab=coaches');
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('Error updating user coach:', error);
      toast({
        title: "Error",
        description: "There was a problem adding this coach to your team.",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    updateUserCoach
  };
};
