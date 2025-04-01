
import { Goal, Coach } from "@/types/session";

export interface GoalCoachRecommendationsProps {
  goals: Goal[];
  recommendedCoaches: Coach[];
  className?: string;
}

export interface CategorySectionProps {
  goals: Goal[];
  coaches: Coach[];
  category: 'work' | 'mind' | 'body';
}

export interface GoalCardProps {
  goal: Goal;
  coaches: Coach[];
  category: 'work' | 'mind' | 'body';
}

export interface CoachCardProps {
  coach: Coach;
}
