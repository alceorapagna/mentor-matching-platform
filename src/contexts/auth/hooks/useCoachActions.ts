
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
      const camelCaseField = updateField.replace(/^has/, 'has').replace(/coach$/, 'Coach');
      
      // For demo or test users, just update the local state
      const isTestOrDemoUser = isDemoAccount(user.email) || user.id.startsWith('test_') || user.id.startsWith('demo_');
      
      // Create an updated user object with both snake_case and camelCase properties
      const updatedUser = {
        ...user,
        [updateField]: true,
        [camelCaseField]: true
      };
      
      console.log("Updating user with coach:", {
        originalUser: user,
        updateField,
        camelCaseField,
        isTestOrDemoUser,
        updatedUser
      });
      
      // Update user state locally
      setUser(updatedUser);
      
      // For real users with valid UUIDs, also update in Supabase
      if (!isTestOrDemoUser) {
        const isValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id);
        
        if (isValidUuid) {
          console.log(`Updating Supabase field '${updateField}' for user ${user.id}`);
          
          const { error } = await supabase
            .from('profiles')
            .update({ [updateField]: true })
            .eq('id', user.id);
            
          if (error) {
            console.error('Error updating profile in Supabase:', error);
            // We don't throw here - just log the error but continue with local state update
          }
        } else {
          console.warn('User ID is not a valid UUID format, skipping Supabase update:', user.id);
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
      return false; // Return false instead of throwing to prevent UI disruption
    }
  };

  return {
    updateUserCoach
  };
};
