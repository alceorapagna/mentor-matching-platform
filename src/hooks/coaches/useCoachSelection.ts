
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
    if (isProcessing) return false;
    
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
      
      // Check if trying to add a Reneu coach when one already exists
      if (selectedCoach.category === 'reneu' && (user.hasreneucoach || user.hasReneuCoach)) {
        toast({
          title: "Coach Already Added",
          description: "You already have a Reneu coach on your team. Please remove your current Reneu coach before adding a new one.",
          variant: "destructive"
        });
        return false;
      }
      
      // Same check for other coach categories (only allowing one coach per category)
      if (selectedCoach.category === 'business' && (user.hasbusinesscoach || user.hasBusinessCoach)) {
        toast({
          title: "Coach Already Added",
          description: "You already have a Business coach on your team. Please remove your current Business coach before adding a new one.",
          variant: "destructive"
        });
        return false;
      }
      
      if (selectedCoach.category === 'mind' && (user.hasmindcoach || user.hasMindCoach)) {
        toast({
          title: "Coach Already Added",
          description: "You already have a Mind coach on your team. Please remove your current Mind coach before adding a new one.",
          variant: "destructive"
        });
        return false;
      }
      
      if (selectedCoach.category === 'body' && (user.hasbodycoach || user.hasBodyCoach)) {
        toast({
          title: "Coach Already Added",
          description: "You already have a Body coach on your team. Please remove your current Body coach before adding a new one.",
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
        
        console.log('Successfully added coach, preparing to navigate...');
        
        // Force a hard refresh to ensure all state is updated correctly
        window.location.href = '/dashboard?tab=coaches';
        
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
