
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import UserJourneyMap from "@/components/onboarding/UserJourneyMap";
import ReneuCompassCard from "@/components/onboarding/ReneuCompassCard";
import CoachRecommendations from "@/components/onboarding/CoachRecommendations";
import WelcomeSection from "@/components/onboarding/WelcomeSection";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const OnboardingJourney = () => {
  const { user, resetCompassData } = useAuth();
  const { toast } = useToast();
  
  // For demo purposes to reset the onboarding flow
  const handleResetJourney = async () => {
    try {
      await resetCompassData();
      toast({
        title: "Journey Reset",
        description: "Your onboarding journey has been reset for demonstration purposes.",
      });
    } catch (error) {
      console.error("Error resetting journey:", error);
      toast({
        title: "Error",
        description: "There was a problem resetting your journey.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null; // Protected route will handle redirection
  }
  
  const compassProgress = {
    hasStarted: user.compassCompleted || false,
    hasCompleted: user.compassCompleted || false,
    percentComplete: user.compassCompleted ? 100 : 0
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Welcome section with user name */}
        <WelcomeSection 
          userName={user.firstName}
          hasCompletedCompass={user.compassCompleted || false}
          compassProgress={compassProgress}
        />
        
        {/* Demo reset button */}
        <div className="flex justify-end mb-6">
          <Button variant="outline" size="sm" onClick={handleResetJourney} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset Journey (Demo)
          </Button>
        </div>
        
        {/* Journey map showing all steps */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          <UserJourneyMap />
        </div>
        
        {/* Show compass data if completed */}
        {user.compassCompleted && user.compassData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ReneuCompassCard 
              progress={compassProgress}
              compassData={user.compassData}
            />
            
            <CoachRecommendations 
              compassData={user.compassData}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OnboardingJourney;
