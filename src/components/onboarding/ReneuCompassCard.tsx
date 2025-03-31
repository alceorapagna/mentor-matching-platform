
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, ChevronRight, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CompassData } from "@/contexts/auth/types";
import { Separator } from "@/components/ui/separator";

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
            <div className="space-y-6">
              {/* Compass Visualization */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Purpose Column */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Purpose</h4>
                    <div className="bg-muted/30 p-3 rounded-md h-full">
                      <p className="text-sm text-muted-foreground italic">"{compassData.purpose}"</p>
                    </div>
                  </div>
                  
                  {/* Values Column */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Core Values</h4>
                    <div className="bg-muted/30 p-3 rounded-md flex flex-wrap gap-2">
                      {compassData.coreValues.map((value, index) => (
                        <div key={index} className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Compass Image Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <Compass className="w-32 h-32 text-primary" />
                </div>
              </div>
              
              <Separator />
              
              {/* Journey Visualization */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-primary mr-2" />
                  <h4 className="text-sm font-medium">Dimension Goals</h4>
                </div>
                
                <div className="space-y-4">
                  {/* Work Dimension */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Work</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs">{compassData.dimensions.work.current}</span>
                        <span className="text-xs text-muted-foreground">/</span>
                        <span className="text-xs font-medium">{compassData.dimensions.work.desired}</span>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${(compassData.dimensions.work.current / 10) * 100}%` }}
                          ></div>
                        </div>
                        <div
                          className="absolute h-4 w-4 rounded-full bg-amber-500 border-2 border-white"
                          style={{ left: `${(compassData.dimensions.work.desired / 10) * 100}%`, top: '0px' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mind Dimension */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Mind</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs">{compassData.dimensions.mind.current}</span>
                        <span className="text-xs text-muted-foreground">/</span>
                        <span className="text-xs font-medium">{compassData.dimensions.mind.desired}</span>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(compassData.dimensions.mind.current / 10) * 100}%` }}
                          ></div>
                        </div>
                        <div
                          className="absolute h-4 w-4 rounded-full bg-purple-500 border-2 border-white"
                          style={{ left: `${(compassData.dimensions.mind.desired / 10) * 100}%`, top: '0px' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Body Dimension */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Body</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs">{compassData.dimensions.body.current}</span>
                        <span className="text-xs text-muted-foreground">/</span>
                        <span className="text-xs font-medium">{compassData.dimensions.body.desired}</span>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(compassData.dimensions.body.current / 10) * 100}%` }}
                          ></div>
                        </div>
                        <div
                          className="absolute h-4 w-4 rounded-full bg-green-500 border-2 border-white"
                          style={{ left: `${(compassData.dimensions.body.desired / 10) * 100}%`, top: '0px' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
