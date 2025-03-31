
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, ChevronRight } from "lucide-react";
import { CompassData } from "@/contexts/auth/types";
import CompassProgressSection from "./compass/CompassProgressSection";
import CompassContent from "./compass/CompassContent";

interface ReneuCompassCardProps {
  progress: {
    hasStarted: boolean;
    hasCompleted: boolean;
    percentComplete: number;
  };
  compassData?: CompassData;
  className?: string;
}

const ReneuCompassCard = ({ progress, compassData, className = "" }: ReneuCompassCardProps) => {
  console.log("ReneuCompassCard compassData:", compassData); // Debug log to see what data we have
  
  return (
    <Card className={`border-primary/20 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center">
          <div className="p-1 mr-2 bg-primary/10 rounded-full">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Reneu Compass</CardTitle>
        </div>
        {progress.hasCompleted && (
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link to="/reneu-compass">
              Details
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      
      {!progress.hasCompleted ? (
        <CompassProgressSection progress={progress} />
      ) : (
        <CompassContent compassData={compassData} />
      )}
    </Card>
  );
};

export default ReneuCompassCard;
