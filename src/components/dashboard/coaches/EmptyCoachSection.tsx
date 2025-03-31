
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyCoachSectionProps {
  title: string;
  description: string;
  category: string;
}

const EmptyCoachSection = ({ title, description, category }: EmptyCoachSectionProps) => {
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
        <Button onClick={handleFindCoach}>
          Find Your Coach
        </Button>
      </div>
    </div>
  );
};

export default EmptyCoachSection;
