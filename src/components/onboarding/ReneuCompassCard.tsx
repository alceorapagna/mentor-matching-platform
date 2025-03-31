
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CompassData } from "@/contexts/auth/types";

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
      ) : (
        <CardContent className="pt-2">
          {compassData ? (
            <div className="space-y-4">
              {compassData.purpose && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Purpose</h4>
                  <p className="text-sm text-muted-foreground">{compassData.purpose}</p>
                </div>
              )}
              
              {compassData.coreValues && compassData.coreValues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Core Values</h4>
                  <div className="flex flex-wrap gap-1">
                    {compassData.coreValues.map((value, index) => (
                      <div key={index} className="px-2 py-1 bg-secondary text-xs rounded-full">
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {compassData.dimensions && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Dimension Scores</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Work</span>
                      <div className="flex items-center gap-1 text-xs">
                        <span>{compassData.dimensions.work.current}</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="font-medium">{compassData.dimensions.work.desired}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Mind</span>
                      <div className="flex items-center gap-1 text-xs">
                        <span>{compassData.dimensions.mind.current}</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="font-medium">{compassData.dimensions.mind.desired}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Body</span>
                      <div className="flex items-center gap-1 text-xs">
                        <span>{compassData.dimensions.body.current}</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="font-medium">{compassData.dimensions.body.desired}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center py-6 text-muted-foreground">
              Assessment completed. No detailed data available.
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ReneuCompassCard;
