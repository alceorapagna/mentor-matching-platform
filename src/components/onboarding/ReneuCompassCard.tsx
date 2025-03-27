
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
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
          {/* Compass Visual with Purpose and Values on sides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Purpose on left */}
            <div className="bg-background rounded-md p-4 shadow-sm border">
              <h4 className="text-sm font-semibold text-primary mb-1">My Purpose</h4>
              <p className="text-sm">{userData.purpose}</p>
            </div>
            
            {/* Compass in center */}
            <div className="rounded-md overflow-hidden bg-muted/30 p-4 flex items-center justify-center">
              <img 
                src="/lovable-uploads/b8d1a7c5-6316-49b0-825b-46493c676efe.png" 
                alt="Reneu Compass" 
                className="w-full max-w-[240px] h-auto"
              />
            </div>
            
            {/* Values on right */}
            <div className="bg-background rounded-md p-4 shadow-sm border">
              <h4 className="text-sm font-semibold text-primary mb-1">My Values</h4>
              <div className="flex flex-wrap gap-2">
                {userData.coreValues.map(value => (
                  <span key={value} className="inline-flex items-center bg-primary/10 text-xs px-2 py-1 rounded">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* The Journey section */}
          <div className="bg-background rounded-md p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-primary">The Journey</h4>
            </div>
            
            {/* Journey image - medium sized */}
            <div className="mb-6 flex justify-center">
              <img 
                src="/lovable-uploads/d59bb3a9-3dca-426c-a2df-a5d9e65985ff.png" 
                alt="Reneu Journey" 
                className="w-full max-w-sm h-auto"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Work pillar */}
              <div className="bg-muted/30 p-4 rounded flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-medium">Work</span>
                </div>
                
                <div className="space-y-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Current: {userData.currentState.work}/10</span>
                    </div>
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full" 
                        style={{ width: `${userData.currentState.work * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Goal: {userData.desiredState.work}/10</span>
                    </div>
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-600 rounded-full" 
                        style={{ width: `${userData.desiredState.work * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-auto">
                  Achieve greater career fulfillment and work-life harmony.
                </p>
              </div>
              
              {/* Mind pillar */}
              <div className="bg-muted/30 p-4 rounded flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Mind</span>
                </div>
                
                <div className="space-y-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Current: {userData.currentState.mind}/10</span>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full" 
                        style={{ width: `${userData.currentState.mind * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Goal: {userData.desiredState.mind}/10</span>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-600 rounded-full" 
                        style={{ width: `${userData.desiredState.mind * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-auto">
                  Develop mental clarity and emotional resilience.
                </p>
              </div>
              
              {/* Body pillar */}
              <div className="bg-muted/30 p-4 rounded flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Body</span>
                </div>
                
                <div className="space-y-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Current: {userData.currentState.body}/10</span>
                    </div>
                    <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${userData.currentState.body * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Goal: {userData.desiredState.body}/10</span>
                    </div>
                    <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-600 rounded-full" 
                        style={{ width: `${userData.desiredState.body * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-auto">
                  Build sustainable health habits and increase energy levels.
                </p>
              </div>
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
          <Button variant="outline" className="w-full" asChild>
            <Link to="/reneu-compass">
              View Compass
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReneuCompassCard;

