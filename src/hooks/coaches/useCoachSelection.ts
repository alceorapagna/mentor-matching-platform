
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Coach } from '@/types/coach';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useCoachSelection = () => {
  const { toast } = useToast();
  const { user, updateUserCoach } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const hasCompletedCompass = user?.compassCompleted || false;
  
  const handleConfirmSelection = async (selectedCoach: Coach | null, selectedPackage: string) => {
    if (!selectedCoach) return false;
    if (isProcessing) {
      console.log('[useCoachSelection] Already processing, preventing duplicate submission');
      return false;
    }
    
    if (!selectedPackage && selectedCoach?.pricingModel === 'packages') {
      toast({
        title: "Please select a package",
        description: "You need to select a coaching package to continue.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to add a coach.",
        variant: "destructive"
      });
      navigate('/login');
      return false;
    }
    
    try {
      setIsProcessing(true);
      
      console.log('[useCoachSelection] Selected coach category:', selectedCoach.category);
      console.log('[useCoachSelection] Current user coach flags:', {
        hasreneucoach: Boolean(user.hasreneucoach),
        hasReneuCoach: Boolean(user.hasReneuCoach),
        hasbusinesscoach: Boolean(user.hasbusinesscoach),
        hasBusinessCoach: Boolean(user.hasBusinessCoach),
        hasmindcoach: Boolean(user.hasmindcoach),
        hasMindCoach: Boolean(user.hasMindCoach),
        hasbodycoach: Boolean(user.hasbodycoach),
        hasBodyCoach: Boolean(user.hasBodyCoach)
      });
      
      console.log('[useCoachSelection] Confirming selection of coach:', { 
        coachId: selectedCoach.id,
        coachName: selectedCoach.name,
        coachCategory: selectedCoach.category
      });
      
      // Call updateUserCoach with detailed logging
      console.log(`[useCoachSelection] Calling updateUserCoach for category: ${selectedCoach.category}`);
      const success = await updateUserCoach(selectedCoach.category);
      
      console.log(`[useCoachSelection] Update result: ${success ? 'SUCCESS' : 'FAILED'}`);
      
      if (success) {
        toast({
          title: "Coach Added to Your Team",
          description: `${selectedCoach?.name} is now part of your coaching team.`,
        });
        
        console.log('[useCoachSelection] Successfully added coach, forcing a full page refresh');
        
        // Force a FULL browser refresh to ensure all state is properly reset and reloaded
        window.location.href = '/dashboard?tab=coaches';
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("[useCoachSelection] Error confirming coach:", error);
      toast({
        title: "Error",
        description: "There was a problem adding this coach to your team.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    hasCompletedCompass,
    handleConfirmSelection,
    isProcessing
  };
};
