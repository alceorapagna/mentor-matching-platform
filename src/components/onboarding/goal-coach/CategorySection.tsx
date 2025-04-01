
import { Briefcase, Brain, Heart } from "lucide-react";
import { CategorySectionProps } from "./types";
import { getCategoryColor, getCategoryTitle } from "./utils";
import GoalCard from "./GoalCard";

const CategorySection = ({ goals, coaches, category }: CategorySectionProps) => {
  if (goals.length === 0) {
    return null;
  }

  const Icon = category === 'work' ? Briefcase : category === 'mind' ? Brain : Heart;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${getCategoryColor(category)}`}>
          <Icon className={category === 'work' ? 'h-5 w-5 text-amber-600' : 
                            category === 'mind' ? 'h-5 w-5 text-purple-600' : 
                            'h-5 w-5 text-green-600'} />
        </div>
        <h3 className="text-xl font-semibold">Recommended Coaches for your {getCategoryTitle(category)}</h3>
      </div>

      {goals.map(goal => (
        <GoalCard 
          key={goal.id} 
          goal={goal}
          coaches={coaches} 
          category={category} 
        />
      ))}
    </div>
  );
};

export default CategorySection;
