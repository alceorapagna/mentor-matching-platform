
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, History, ChevronDown, ChevronUp } from 'lucide-react';
import { Goal } from '@/types/session';

interface ClientGoalsCardProps {
  clientGoals: Goal[];
  showSessionHistory: boolean;
  onToggleSessionHistory: () => void;
}

const ClientGoalsCard = ({ 
  clientGoals, 
  showSessionHistory, 
  onToggleSessionHistory 
}: ClientGoalsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Target className="h-5 w-5 mr-2 text-primary" />
          Client Goals & Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clientGoals.map(goal => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.text}</span>
              </div>
              <Progress 
                value={goal.progress} 
                className="h-2"
                showValue={true}
                indicatorColor={
                  goal.category === 'work' ? "bg-amber-500" : 
                  goal.category === 'mind' ? "bg-purple-500" : 
                  goal.category === 'body' ? "bg-green-500" : 
                  goal.progress >= 75 ? "bg-green-500" : 
                  goal.progress >= 40 ? "bg-amber-500" : 
                  "bg-blue-500"
                } 
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 border-t">
        <div className="w-full">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center gap-2" 
            onClick={onToggleSessionHistory}
          >
            <History className="h-4 w-4" />
            {showSessionHistory ? "Hide Previous Sessions" : "Show Previous Sessions"}
            {showSessionHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClientGoalsCard;
