
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyCoachSectionProps {
  title: string;
  description: string;
  category: string;
  isHRAssigned?: boolean;
}

const EmptyCoachSection = ({ 
  title, 
  description, 
  category, 
  isHRAssigned = false 
}: EmptyCoachSectionProps) => {
  const navigate = useNavigate();
  
  const handleFindCoach = () => {
    navigate(`/coaches?category=${category}`);
  };

  return (
    <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10">
      <div className="text-center space-y-4">
        <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {isHRAssigned ? (
          <div className="text-sm bg-amber-100 text-amber-800 px-3 py-2 rounded-md">
            Your company's HR will assign a coach for you soon
          </div>
        ) : (
          <Button onClick={handleFindCoach}>
            Find Your Coach
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyCoachSection;
