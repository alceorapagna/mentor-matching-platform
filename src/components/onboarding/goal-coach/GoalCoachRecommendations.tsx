
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, ArrowRight } from "lucide-react";
import { GoalCoachRecommendationsProps } from "./types";
import CategorySection from "./CategorySection";
import EmptyGoalsMessage from "./EmptyGoalsMessage";

const GoalCoachRecommendations = ({ 
  goals, 
  recommendedCoaches,
  className 
}: GoalCoachRecommendationsProps) => {
  // Group coaches by category
  const workCoaches = recommendedCoaches.filter(coach => coach.category === 'work');
  const mindCoaches = recommendedCoaches.filter(coach => coach.category === 'mind');
  const bodyCoaches = recommendedCoaches.filter(coach => coach.category === 'body');

  // Get goals by category
  const workGoals = goals.filter(goal => goal.category === 'work');
  const mindGoals = goals.filter(goal => goal.category === 'mind');
  const bodyGoals = goals.filter(goal => goal.category === 'body');

  return (
    <Card className={`border-primary/20 ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Your Recommended Coaches</CardTitle>
        </div>
        <CardDescription>
          Choose specialized coaches for each of your renewal pillars
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-12">
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
