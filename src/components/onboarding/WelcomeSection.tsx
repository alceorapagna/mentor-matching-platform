
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Compass, User } from "lucide-react";
import ReneuCompassCard from "./ReneuCompassCard";

interface WelcomeSectionProps {
  userName: string;
  hasCompletedCompass: boolean;
  compassProgress?: {
    hasStarted: boolean;
    hasCompleted: boolean;
    percentComplete: number;
  };
}

const WelcomeSection = ({ 
  userName, 
  hasCompletedCompass,
  compassProgress = { hasStarted: false, hasCompleted: false, percentComplete: 0 }
}: WelcomeSectionProps) => {
  
  // Demo purpose states
  const [isDiscoveryScheduled, setIsDiscoveryScheduled] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* Welcome heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
          <p className="text-muted-foreground">
            {hasCompletedCompass 
              ? "Track your progress and manage your coaching journey" 
              : "Let's start your renewal journey with a few simple steps"}
          </p>
        </div>
      </div>
      
      {/* Onboarding steps for new users */}
      {!hasCompletedCompass && (
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Getting Started</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                  ${compassProgress.hasCompleted ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                  {compassProgress.hasCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-semibold">1</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Complete the Reneu Compass</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Map your purpose, values, and current wellbeing across Work, Mind, and Body
                      </p>
                    </div>
                    <Button 
                      variant={compassProgress.hasCompleted ? "outline" : "default"} 
                      size="sm" 
                      asChild
                    >
                      <Link to="/reneu-compass">
                        {compassProgress.hasCompleted ? "View Results" : (
                          compassProgress.hasStarted ? "Continue" : "Start"
                        )}
                      </Link>
                    </Button>
                  </div>
                  
                  {compassProgress.hasStarted && !compassProgress.hasCompleted && (
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <div className="w-full max-w-[200px] h-1.5 bg-muted mr-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${compassProgress.percentComplete}%` }}
                        />
                      </div>
                      <span>{compassProgress.percentComplete}% complete</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                  ${isDiscoveryScheduled ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                  {isDiscoveryScheduled ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-semibold">2</span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Schedule Your Discovery Session</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Meet with a Reneu coach to discuss your assessment and plan your journey
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    disabled={!compassProgress.hasCompleted}
                    onClick={() => setIsDiscoveryScheduled(true)}
                  >
                    {isDiscoveryScheduled ? "Scheduled" : "Schedule Session"}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Begin Your Renewal Journey</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Get matched with specialized coaches based on your needs and goals
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* If the user hasn't completed the compass, show a larger version of the compass card */}
      {!hasCompletedCompass && !compassProgress.hasCompleted && (
        <ReneuCompassCard progress={compassProgress} />
      )}
    </div>
  );
};

export default WelcomeSection;
