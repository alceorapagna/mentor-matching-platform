
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Brain, Compass, Heart, Star, ArrowRight } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'mind' | 'body';
  progress: number;
}

interface Coach {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  rating: number;
  reviewCount: number;
  imageSrc: string;
  category: 'work' | 'mind' | 'body';
  availability?: 'high' | 'medium' | 'low';
}

interface GoalCoachRecommendationsProps {
  goals: Goal[];
  recommendedCoaches: Coach[];
  className?: string;
}

const getCategoryIcon = (category: 'work' | 'mind' | 'body') => {
  switch (category) {
    case 'work':
      return <Briefcase className="h-5 w-5 text-amber-600" />;
    case 'mind':
      return <Brain className="h-5 w-5 text-purple-600" />;
    case 'body':
      return <Heart className="h-5 w-5 text-green-600" />;
    default:
      return <Compass className="h-5 w-5 text-primary" />;
  }
};

const getCategoryColor = (category: 'work' | 'mind' | 'body') => {
  switch (category) {
    case 'work':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'mind':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'body':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-primary bg-primary/10 border-primary/20';
  }
};

const GoalCoachRecommendations = ({ 
  goals, 
  recommendedCoaches,
  className 
}: GoalCoachRecommendationsProps) => {
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
          Choose specialized coaches for each of your renewal goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {goals.map(goal => {
          // Find coaches that match this goal's category
          const matchingCoaches = recommendedCoaches.filter(coach => coach.category === goal.category);
          
          return (
            <div key={goal.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full ${getCategoryColor(goal.category)}`}>
                  {getCategoryIcon(goal.category)}
                </div>
                <div>
                  <h3 className="font-semibold">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <Badge className="ml-auto">
                  {goal.category === 'work' ? 'Professional Goal' : 
                   goal.category === 'mind' ? 'Mental Goal' : 'Physical Goal'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {matchingCoaches.slice(0, 3).map(coach => (
                  <Card key={coach.id} className="overflow-hidden">
                    <div className="h-40 relative">
                      <img 
                        src={coach.imageSrc} 
                        alt={coach.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <h4 className="font-semibold">{coach.name}</h4>
                        <p className="text-xs">{coach.title}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="font-medium">{coach.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({coach.reviewCount})</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {coach.specialty.slice(0, 2).map((spec) => (
                          <Badge key={spec} variant="secondary" className="font-normal text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <Badge 
                          variant="outline" 
                          className={`
                            ${coach.availability === 'high' ? 'bg-green-500/10 text-green-600 border-green-200' : 
                              coach.availability === 'medium' ? 'bg-amber-500/10 text-amber-600 border-amber-200' : 
                              'bg-red-500/10 text-red-600 border-red-200'}
                          `}
                        >
                          {coach.availability === 'high' ? 'High Availability' : 
                            coach.availability === 'medium' ? 'Medium Availability' : 
                            'Limited Availability'}
                        </Badge>
                        
                        <Button size="sm" asChild>
                          <Link to={`/coaches/${coach.id}`}>View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/coaches">
                    See more {goal.category === 'work' ? 'professional' : 
                              goal.category === 'mind' ? 'mental' : 'physical'} coaches
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
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
