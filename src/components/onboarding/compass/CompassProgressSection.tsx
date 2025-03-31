
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";

interface CompassProgressSectionProps {
  progress: {
    hasStarted: boolean;
    hasCompleted: boolean;
    percentComplete: number;
  };
}

const CompassProgressSection = ({ progress }: CompassProgressSectionProps) => {
  return (
    <>
      <CardContent>
        <CardDescription className="mb-4">
          Map your purpose, values, and wellbeing dimensions to guide your renewal journey
        </CardDescription>
        
        {progress.hasStarted && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress.percentComplete}%</span>
            </div>
            <Progress value={progress.percentComplete} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to="/reneu-compass">
            {progress.hasStarted ? "Continue Assessment" : "Start Assessment"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </>
  );
};

export default CompassProgressSection;
