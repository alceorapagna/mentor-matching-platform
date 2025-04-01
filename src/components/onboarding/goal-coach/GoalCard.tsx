
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GoalCardProps } from "./types";
import CoachCard from "./CoachCard";
import { getCategoryTitle } from "./utils";

const GoalCard = ({ goal, coaches, category }: GoalCardProps) => {
  const badgeLabels = {
    'work': 'Professional Goal',
    'mind': 'Mental Goal',
    'body': 'Physical Goal'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 ml-10">
        <div>
          <h4 className="font-semibold">{goal.text}</h4>
          <p className="text-sm text-muted-foreground">{goal.description}</p>
        </div>
        <Badge className="ml-auto">{badgeLabels[category]}</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coaches.slice(0, 3).map(coach => (
          <CoachCard key={coach.id} coach={coach} />
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link to="/coaches">
            See more {category === 'work' ? 'professional' : category === 'mind' ? 'mental' : 'physical'} coaches
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default GoalCard;
