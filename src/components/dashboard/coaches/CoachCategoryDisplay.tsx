
import { Button } from "@/components/ui/button";
import { Coach } from "@/types/coach";
import CoachCategorySection from "@/components/coaches/CoachCategorySection";
import { useNavigate } from "react-router-dom";
import EmptyCoachSection from "./EmptyCoachSection";

interface CoachCategoryDisplayProps {
  title: string;
  badgeText: string;
  badgeClassName: string;
  description: string;
  coaches: Coach[];
  hasCoach: boolean;
  category: string;
  allowMultiple?: boolean;
  findCoachTitle?: string;
  findCoachDescription?: string;
  isHRAssigned?: boolean;
  isHRManagedCategory?: boolean;
  singleCoachOnly?: boolean;
}

const CoachCategoryDisplay = ({
  title,
  badgeText,
  badgeClassName,
  description,
  coaches,
  hasCoach,
  category,
  allowMultiple = false,
  findCoachTitle = "Find Your Coach",
  findCoachDescription = "Connect with a coach",
  isHRAssigned = false,
  isHRManagedCategory = false,
  singleCoachOnly = false
}: CoachCategoryDisplayProps) => {
  const navigate = useNavigate();
  
  const handleFindCoach = () => {
    navigate(`/coaches?category=${category}`);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className={`text-xs font-medium rounded-full px-2.5 py-0.5 border ${badgeClassName}`}>
          {badgeText}
        </div>
        {isHRManagedCategory && (
          <div className="text-xs font-medium rounded-full px-2.5 py-0.5 bg-violet-100 text-violet-800 border border-violet-200">
            HR Managed
          </div>
        )}
      </div>
      <p className="text-muted-foreground mb-6">
        {description}
      </p>
      
      {hasCoach ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <CoachCategorySection
              key={coach.id}
              title=""
              description=""
              badgeText=""
              badgeClassName=""
              coaches={[coach]}
              showSessionInfo={true}
            />
          ))}
          
          {/* Add More Coaches Button for multiple coach categories */}
          {allowMultiple && !isHRManagedCategory && !singleCoachOnly && (
            <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10 h-full">
              <div className="text-center space-y-4">
                <Button variant="outline" onClick={handleFindCoach}>
                  Add More Coaches
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyCoachSection 
          title={findCoachTitle}
          description={findCoachDescription}
          category={category}
          isHRAssigned={isHRAssigned}
        />
      )}
    </div>
  );
};

export default CoachCategoryDisplay;
