
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Compass } from "lucide-react";
import { Goal } from "@/types/session";
import ReneuCompassCard from "@/components/onboarding/ReneuCompassCard";
import { CompassData } from "@/contexts/auth/types";

interface OverviewTabProps {
  goals: Goal[];
  compassData?: CompassData;
}

const OverviewTab = ({ goals, compassData }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      {/* Full-width Reneu Compass Card */}
      <ReneuCompassCard 
        progress={{
          hasStarted: true,
          hasCompleted: true,
          percentComplete: 100
        }}
        compassData={compassData}
        className="w-full"
      />
      
      {/* Goals Progress Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            My Goals & Progress
          </CardTitle>
          <CardDescription>Track your coaching journey and progress towards your goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.text}</span>
                <span className="text-sm text-muted-foreground">{goal.progress}%</span>
              </div>
              <Progress 
                value={goal.progress} 
                className="h-2"
                indicatorColor={
                  goal.progress >= 75 ? "bg-green-500" : 
                  goal.progress >= 40 ? "bg-amber-500" : 
                  "bg-blue-500"
                } 
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
