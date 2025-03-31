
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm mb-1">
        <span>Getting Started</span>
        <span>Journey Ready</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        <span className="text-xs text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
