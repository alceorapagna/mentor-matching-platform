
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Coach } from '@/types/coach';

export const useCoachSelection = () => {
  const { toast } = useToast();
  const { user, updateUserCoach } = useAuth();
  
  const hasCompletedCompass = user?.compassCompleted || false;
  
  const handleConfirmSelection = async (selectedCoach: Coach | null, selectedPackage: string, navigate: (path: string) => void) => {
    if (!selectedCoach) return;
    
    if (!selectedPackage && selectedCoach?.pricingModel === 'packages') {
      toast({
        title: "Please select a package",
        description: "You need to select a coaching package to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to add a coach.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    try {
      // Check if trying to add a Reneu coach when one already exists
      if (selectedCoach.category === 'reneu' && (user.hasreneucoach || user.hasReneuCoach)) {
        toast({
          title: "Coach Already Added",
          description: "You already have a Reneu coach on your team. Please remove your current Reneu coach before adding a new one.",
          variant: "destructive"
        });
        return false;
      }
      
      console.log('Confirming selection of coach:', { 
        coachId: selectedCoach.id,
        coachName: selectedCoach.name,
        coachCategory: selectedCoach.category
      });
      
      // Add coach
      const success = await updateUserCoach(selectedCoach.category);
      
      if (success) {
        toast({
          title: "Coach Added to Your Team",
          description: `${selectedCoach?.name} is now part of your coaching team.`,
        });
        
        // Use a timeout to ensure the toast is visible before navigation
        setTimeout(() => {
          navigate('/dashboard?tab=coaches');
        }, 1500);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error confirming coach:", error);
      toast({
        title: "Error",
        description: "There was a problem adding this coach to your team.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    hasCompletedCompass,
    handleConfirmSelection
  };
};
