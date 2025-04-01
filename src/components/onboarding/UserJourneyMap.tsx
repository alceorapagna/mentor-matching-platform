
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Users, Calendar } from "lucide-react";
import JourneyStepCard from "./JourneyStepCard";
import ReneuCompassCard from "./ReneuCompassCard";
import { generateGoalsFromCompass } from "@/utils/goalUtils";
import { Goal } from "@/types/session";
import { useState, useEffect } from "react";

interface UserJourneyMapProps {
  className?: string;
}

const UserJourneyMap = ({ className = "" }: UserJourneyMapProps) => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [hasScheduledDiscovery, setHasScheduledDiscovery] = useState(false);
  const [hasSelectedCoaches, setHasSelectedCoaches] = useState(false);
  
  useEffect(() => {
    // Generate goals from compass data when available
    if (user?.compassData) {
      setGoals(generateGoalsFromCompass(user.compassData));
    }
    
    // For demo purposes, we're using state variables
    // In a real app, these would come from the backend
  }, [user?.compassData]);
  
  const isCompassCompleted = user?.compassCompleted || false;
  
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Your Renewal Journey</CardTitle>
        </div>
        <CardDescription>
          Follow these steps to begin your personalized renewal experience
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Complete Reneu Compass */}
        <div className="col-span-1">
          <JourneyStepCard
            title="Complete Reneu Compass"
            description="Map your current wellbeing state and define your goals across Work, Mind, and Body"
            isCompleted={isCompassCompleted}
            isActive={!isCompassCompleted}
            stepNumber={1}
            linkTo="/reneu-compass"
            buttonText="Start Assessment"
          />
        </div>
        
        {/* Step 2: Schedule Discovery Session */}
        <div className="col-span-1">
          <JourneyStepCard
            title="Schedule Discovery Session"
            description="Meet with a Reneu coach to discuss your assessment and plan your journey"
            isCompleted={hasScheduledDiscovery}
            isActive={isCompassCompleted && !hasScheduledDiscovery}
            stepNumber={2}
            linkTo={isCompassCompleted ? "/coaches" : "/reneu-compass"}
            buttonText="Schedule Session"
          />
        </div>
        
        {/* Step 3: Select Your Coaches */}
        <div className="col-span-1">
          <JourneyStepCard
            title="Select Your Coaches"
            description="Choose specialized coaches for each dimension of your renewal journey"
            isCompleted={hasSelectedCoaches}
            isActive={isCompassCompleted && hasScheduledDiscovery && !hasSelectedCoaches}
            stepNumber={3}
            linkTo={isCompassCompleted ? "/coaches" : "/reneu-compass"}
            buttonText="Browse Coaches"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserJourneyMap;
