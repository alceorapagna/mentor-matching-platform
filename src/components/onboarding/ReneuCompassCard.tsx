
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Compass, ArrowRight, Briefcase, Brain, Activity } from "lucide-react";

type CompassProgress = {
  hasStarted: boolean;
  hasCompleted: boolean;
  percentComplete: number;
};

interface ReneuCompassCardProps {
  progress?: CompassProgress;
  className?: string;
}

const ReneuCompassCard = ({ 
  progress = { hasStarted: false, hasCompleted: false, percentComplete: 0 },
  className 
}: ReneuCompassCardProps) => {
  return (
    <Card className={`border-primary/20 overflow-hidden ${className}`}>
      <div className="h-1.5 bg-primary" />
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Reneu Compass</CardTitle>
        </div>
        <CardDescription>
          Map your purpose, values, and wellbeing to create your personalized renewal journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {progress.hasStarted && !progress.hasCompleted ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-xs">In Progress</span>
              <span className="text-xs">{progress.percentComplete}% Complete</span>
            </div>
            <Progress value={progress.percentComplete} className="h-2" />
          </div>
        ) : null}

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted/50 p-3 rounded flex flex-col items-center justify-center text-center">
            <Briefcase className="h-5 w-5 text-amber-600 mb-1" />
            <span className="text-xs font-medium">Work</span>
          </div>
          
          <div className="bg-muted/50 p-3 rounded flex flex-col items-center justify-center text-center">
            <Brain className="h-5 w-5 text-purple-600 mb-1" />
            <span className="text-xs font-medium">Mind</span>
          </div>
          
          <div className="bg-muted/50 p-3 rounded flex flex-col items-center justify-center text-center">
            <Activity className="h-5 w-5 text-green-600 mb-1" />
            <span className="text-xs font-medium">Body</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {progress.hasCompleted ? (
          <Button variant="outline" className="w-full" asChild>
            <Link to="/reneu-compass">
              View Your Results
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link to="/reneu-compass">
              {progress.hasStarted ? "Continue Assessment" : "Start Your Assessment"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReneuCompassCard;
