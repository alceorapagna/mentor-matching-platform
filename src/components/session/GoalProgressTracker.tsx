
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Check, Target } from 'lucide-react';

export interface Goal {
  id: number;
  text: string;
  progress: number;
}

interface GoalProgressTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  goals: Goal[];
  onSaveProgress: (updatedGoals: Goal[], sessionNotes: string) => void;
}

const GoalProgressTracker = ({ 
  isOpen, 
  onClose,
  goals,
  onSaveProgress
}: GoalProgressTrackerProps) => {
  const [updatedGoals, setUpdatedGoals] = useState<Goal[]>(goals);
  const [sessionNotes, setSessionNotes] = useState('');
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleProgressChange = (goalId: number, newProgress: number) => {
    setUpdatedGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId ? { ...goal, progress: newProgress } : goal
      )
    );
  };

  const handleSave = () => {
    onSaveProgress(updatedGoals, sessionNotes);
    toast({
      title: "Progress updated",
      description: "Goal progress has been updated successfully.",
    });
    onClose();
  };

  return (
    <Card className="w-full border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Session Wrap-up: Update Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {updatedGoals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.text}</span>
                <span className="text-sm font-medium">{goal.progress}%</span>
              </div>
              <Slider
                value={[goal.progress]}
                max={100}
                step={5}
                onValueChange={(value) => handleProgressChange(goal.id, value[0])}
                className="mt-2"
              />
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Session Notes</label>
          <Textarea
            placeholder="Summarize key accomplishments and action items from this session..."
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="gap-2">
          <Check className="h-4 w-4" />
          Save Progress
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalProgressTracker;
