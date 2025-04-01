
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface JourneyStepCardProps {
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  stepNumber: number;
  linkTo: string;
  buttonText: string;
}

const JourneyStepCard = ({
  title,
  description,
  isCompleted,
  isActive,
  stepNumber,
  linkTo,
  buttonText
}: JourneyStepCardProps) => {
  return (
    <Card className={`border ${isActive ? 'border-primary' : isCompleted ? 'border-green-200' : 'border-muted'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center 
            ${isCompleted ? 'bg-green-100 text-green-600' : 
              isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
          >
            {isCompleted ? (
              <Check className="h-4 w-4" />
            ) : (
              <span className="text-sm font-semibold">{stepNumber}</span>
            )}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Component specific content can be added here by extending this component */}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full gap-2" 
          asChild
          variant={isCompleted ? "outline" : isActive ? "default" : "secondary"}
          disabled={!isActive && !isCompleted}
        >
          <Link to={linkTo}>
            {isCompleted ? "Review" : buttonText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JourneyStepCard;
