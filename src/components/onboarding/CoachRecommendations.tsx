
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import { CompassData } from "@/contexts/auth/types";
import { Coach } from "@/types/coach";
import { coachesData } from "@/data/coachesData";
import CoachCategorySection from "@/components/coaches/CoachCategorySection";

interface CoachRecommendationsProps {
  compassData?: CompassData;
  className?: string;
}

const CoachRecommendations = ({ compassData, className = "" }: CoachRecommendationsProps) => {
  if (!compassData) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Coach Recommendations</CardTitle>
          <CardDescription>Complete your Reneu Compass to receive personalized coach recommendations</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">Your coach recommendations will appear here after completing your assessment</p>
          <Button asChild>
            <Link to="/reneu-compass">Start Reneu Compass</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Generate coach recommendations based on compass data
  const getRecommendedCoaches = () => {
    // In a real app, this would use an algorithm based on the user's compass data
    // For this demo, we'll filter coaches by their specialties
    
    // Find coaches based on highest gap between current and desired state
    const workGap = compassData.dimensions.work.desired - compassData.dimensions.work.current;
    const mindGap = compassData.dimensions.mind.desired - compassData.dimensions.mind.current;
    const bodyGap = compassData.dimensions.body.desired - compassData.dimensions.body.current;
    
    // Business coaches for work dimension
    const businessCoaches = coachesData
      .filter(coach => coach.category === 'business')
      .slice(0, 3);
      
    // Mind coaches for mind dimension  
    const mindCoaches = coachesData
      .filter(coach => coach.category === 'mind')
      .slice(0, 3);
      
    // Body coaches for body dimension
    const bodyCoaches = coachesData
      .filter(coach => coach.category === 'body')
      .slice(0, 3);
    
    return {
      business: businessCoaches,
      mind: mindCoaches,
      body: bodyCoaches
    };
  };
  
  const recommendedCoaches = getRecommendedCoaches();

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Your Recommended Coaches</CardTitle>
        </div>
        <CardDescription>
          Based on your Reneu Compass assessment, here are coaches matched to your needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Work Dimension Coaches */}
        {compassData.dimensions.work.desired - compassData.dimensions.work.current > 0 && (
          <CoachCategorySection
            title="Professional Coaches"
            description={`Based on your work dimension score (${compassData.dimensions.work.current}/10), we recommend these coaches to help you reach your desired state of ${compassData.dimensions.work.desired}/10.`}
            badgeText="Professional Goals"
            badgeClassName="bg-amber-50 text-amber-700 border-amber-200"
            coaches={recommendedCoaches.business}
          />
        )}
        
        {/* Mind Dimension Coaches */}
        {compassData.dimensions.mind.desired - compassData.dimensions.mind.current > 0 && (
          <CoachCategorySection
            title="Mental Coaches"
            description={`Based on your mind dimension score (${compassData.dimensions.mind.current}/10), we recommend these coaches to help you reach your desired state of ${compassData.dimensions.mind.desired}/10.`}
            badgeText="Mental Wellbeing"
            badgeClassName="bg-purple-50 text-purple-700 border-purple-200"
            coaches={recommendedCoaches.mind}
          />
        )}
        
        {/* Body Dimension Coaches */}
        {compassData.dimensions.body.desired - compassData.dimensions.body.current > 0 && (
          <CoachCategorySection
            title="Physical Coaches"
            description={`Based on your body dimension score (${compassData.dimensions.body.current}/10), we recommend these coaches to help you reach your desired state of ${compassData.dimensions.body.desired}/10.`}
            badgeText="Physical Wellness"
            badgeClassName="bg-green-50 text-green-700 border-green-200"
            coaches={recommendedCoaches.body}
          />
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/coaches">
            Browse All Coaches
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoachRecommendations;
