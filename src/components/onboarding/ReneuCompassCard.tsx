
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

interface UserCompassData {
  purpose: string;
  coreValues: string[];
  currentState: {
    work: number;
    mind: number;
    body: number;
  };
  desiredState: {
    work: number;
    mind: number;
    body: number;
  };
}

interface ReneuCompassCardProps {
  progress?: CompassProgress;
  userData?: UserCompassData;
  className?: string;
}

const defaultUserData: UserCompassData = {
  purpose: "To inspire growth and create positive change",
  coreValues: ["Authenticity", "Growth", "Balance", "Impact"],
  currentState: {
    work: 5,
    mind: 4,
    body: 3
  },
  desiredState: {
    work: 8,
    mind: 7,
    body: 8
  }
};

const ReneuCompassCard = ({ 
  progress = { hasStarted: false, hasCompleted: false, percentComplete: 0 },
  userData = defaultUserData,
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

        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Left side: Compass with user's purpose and values */}
            <div className="relative rounded-md overflow-hidden bg-muted/30 p-3">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Compass className="h-10 w-10 text-primary" />
                  </div>
                </div>
                
                {/* Purpose Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-2 border-dashed border-primary/30"></div>
                </div>
                
                {/* Values Placement */}
                {userData.coreValues.map((value, index) => {
                  // Calculate position in a circle
                  const angle = (index * (360 / userData.coreValues.length)) * (Math.PI / 180);
                  const radius = 90; // Distance from center
                  const top = 50 + Math.sin(angle) * radius;
                  const left = 50 + Math.cos(angle) * radius;
                  
                  return (
                    <div 
                      key={value} 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 py-1 rounded-md text-xs font-medium shadow-sm"
                      style={{ top: `${top}%`, left: `${left}%` }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
              
              {/* Central purpose text */}
              <div className="relative h-48 flex items-center justify-center">
                <div className="text-center max-w-32 z-10">
                  <p className="text-xs font-semibold mb-1 text-primary">Your Purpose</p>
                  <p className="text-xs">{userData.purpose}</p>
                </div>
              </div>
            </div>
            
            {/* Right side: Journey visualization */}
            <div className="rounded-md overflow-hidden bg-muted/30 p-3">
              <div className="h-48 flex flex-col justify-between">
                <div className="bg-background rounded-md p-2 shadow-sm">
                  <h4 className="text-xs font-semibold text-amber-600">Present</h4>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span>Work: {userData.currentState.work}/10</span>
                    <span>Mind: {userData.currentState.mind}/10</span>
                    <span>Body: {userData.currentState.body}/10</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2"></div>
                  <div className="flex justify-center">
                    <div className="bg-primary/10 rounded-full p-1.5">
                      <ArrowRight className="h-4 w-4 text-primary rotate-90" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-background rounded-md p-2 shadow-sm">
                  <h4 className="text-xs font-semibold text-green-600">Future</h4>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span>Work: {userData.desiredState.work}/10</span>
                    <span>Mind: {userData.desiredState.mind}/10</span>
                    <span>Body: {userData.desiredState.body}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
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
