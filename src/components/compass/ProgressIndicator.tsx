
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  startLabel?: string;
  endLabel?: string;
  showStepIndicators?: boolean;
  className?: string;
}

const ProgressIndicator = ({ 
  currentStep, 
  totalSteps, 
  startLabel = "Getting Started", 
  endLabel = "Journey Ready",
  showStepIndicators = true,
  className 
}: ProgressIndicatorProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex justify-between text-sm mb-1">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        <span className="text-xs text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
      </div>
      
      {showStepIndicators && (
        <div className="flex justify-between mt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                i + 1 < currentStep 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : i + 1 === currentStep 
                  ? "border-primary text-primary" 
                  : "border-muted-foreground/30 text-muted-foreground/50"
              )}>
                {i + 1 < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{i + 1}</span>
                )}
              </div>
              {i < totalSteps - 1 && (
                <div className={cn(
                  "w-[calc(100%-2rem)] h-[1px] absolute translate-x-[1rem]",
                  i + 1 < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                )} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
