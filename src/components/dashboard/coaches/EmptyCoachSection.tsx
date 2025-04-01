
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
    <div className="border border-dashed border-border rounded-xl p-10">
      <div className="text-center space-y-4">
        <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <PlusCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
        {isHRAssigned ? (
          <div className="bg-violet-100 text-violet-800 text-sm p-3 rounded-md">
            Your HR team will assign you a coach. No action needed.
          </div>
        ) : (
          <Button onClick={handleFindCoach}>Find a Coach</Button>
        )}
      </div>
    </div>
  );
};

export default EmptyCoachSection;
