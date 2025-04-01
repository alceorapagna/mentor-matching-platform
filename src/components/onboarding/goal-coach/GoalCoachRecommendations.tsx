
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, ArrowRight, ArrowLeft } from "lucide-react";
import { GoalCoachRecommendationsProps } from "./types";
import CategorySection from "./CategorySection";
import EmptyGoalsMessage from "./EmptyGoalsMessage";

const GoalCoachRecommendations = ({ 
  goals, 
  recommendedCoaches,
  className 
}: GoalCoachRecommendationsProps) => {
  const navigate = useNavigate();

  // Group coaches by category
  const workCoaches = recommendedCoaches.filter(coach => coach.category === 'work' || coach.category === 'business');
  const mindCoaches = recommendedCoaches.filter(coach => coach.category === 'mind');
  const bodyCoaches = recommendedCoaches.filter(coach => coach.category === 'body');
  const reneuCoaches = recommendedCoaches.filter(coach => coach.category === 'reneu');

  // Get goals by category
  const workGoals = goals.filter(goal => goal.category === 'work');
  const mindGoals = goals.filter(goal => goal.category === 'mind');
  const bodyGoals = goals.filter(goal => goal.category === 'body');

  return (
    <Card className={`border-primary/20 ${className}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-full">
              <Compass className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Your Recommended Coaches</CardTitle>
          </div>
        </div>
        <CardDescription>
          Choose specialized coaches for each of your renewal pillars
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-12">
        {/* Reneu Coach Recommendations */}
        {reneuCoaches.length > 0 && (
          <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="font-semibold mb-2">Reneu Coach</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A Reneu coach provides holistic guidance across all dimensions of your renewal journey.
            </p>
            <Button asChild size="sm">
              <Link to="/coaches?category=reneu">Select Reneu Coach</Link>
            </Button>
          </div>
        )}
        
        {/* Work Renewal Section */}
        <CategorySection 
          goals={workGoals} 
          coaches={workCoaches} 
          category="work" 
        />

        {/* Mind Renewal Section */}
        <CategorySection 
          goals={mindGoals} 
          coaches={mindCoaches} 
          category="mind" 
        />

        {/* Body Renewal Section */}
        <CategorySection 
          goals={bodyGoals} 
          coaches={bodyCoaches} 
          category="body" 
        />

        {/* Display a message if no goals are available */}
        {goals.length === 0 && <EmptyGoalsMessage />}
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

export default GoalCoachRecommendations;
