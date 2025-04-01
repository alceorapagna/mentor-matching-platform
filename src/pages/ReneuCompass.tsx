
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { Compass } from "lucide-react";
import ProgressIndicator from "@/components/compass/ProgressIndicator";
import CompassIntroduction from "@/components/compass/CompassIntroduction";
import PurposeValuesForm from "@/components/compass/PurposeValuesForm";
import DimensionAssessment, { DimensionData } from "@/components/compass/DimensionAssessment";
import FutureStateForm from "@/components/compass/FutureStateForm";
import { CompassData } from "@/contexts/auth/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ReneuCompass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateCompassStatus, updateCompassData } = useAuth();
  const [step, setStep] = useState(1);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  
  const [assessmentData, setAssessmentData] = useState<CompassData>({
    purpose: "",
    coreValues: [] as string[],
    dimensions: {
      work: { 
        currentState: 5, 
        desiredState: 8, 
        goals: [],
        current: 5,  // For compatibility
        desired: 8,  // For compatibility
        notes: ""
      },
      mind: { 
        currentState: 4, 
        desiredState: 7, 
        goals: [],
        current: 4,  // For compatibility
        desired: 7,  // For compatibility
        notes: ""
      },
      body: { 
        currentState: 3, 
        desiredState: 8, 
        goals: [],
        current: 3,  // For compatibility
        desired: 8,  // For compatibility
        notes: ""
      }
    }
  });

  const totalSteps = 4;
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCompleteAssessment = async () => {
    try {
      await updateCompassData(assessmentData);
      await updateCompassStatus(true);
      
      setShowCompletionDialog(true);
    } catch (error) {
      console.error("Error completing Reneu Compass:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your assessment. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  const handleNavigateToCoaches = () => {
    setShowCompletionDialog(false);
    navigate("/coaches");
  };
  
  const handleNavigateToDashboard = () => {
    setShowCompletionDialog(false);
    navigate("/dashboard");
  };

  const handlePurposeChange = (value: string) => {
    setAssessmentData({
      ...assessmentData,
      purpose: value
    });
  };

  const handleCoreValuesChange = (values: string[]) => {
    setAssessmentData({
      ...assessmentData,
      coreValues: values
    });
  };

  const handleDimensionChange = (dimension: keyof DimensionData, field: 'current' | 'desired' | 'notes', value: any) => {
    setAssessmentData({
      ...assessmentData,
      dimensions: {
        ...assessmentData.dimensions,
        [dimension]: {
          ...assessmentData.dimensions[dimension],
          [field]: value,
          // Also update the canonical property names
          ...(field === 'current' ? { currentState: value } : {}),
          ...(field === 'desired' ? { desiredState: value } : {}),
          // For notes, we don't have a direct mapping in the CompassDimension interface
        }
      }
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Reneu Compass</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Map your purpose, values, and wellbeing across Work, Mind, and Body dimensions to create your personalized renewal journey.
          </p>
        </div>

        <ProgressIndicator 
          currentStep={step} 
          totalSteps={totalSteps} 
          showStepIndicators={true}
        />

        {step === 1 && (
          <CompassIntroduction onNext={handleNextStep} />
        )}

        {step === 2 && (
          <PurposeValuesForm 
            purpose={assessmentData.purpose}
            coreValues={assessmentData.coreValues}
            onPurposeChange={handlePurposeChange}
            onCoreValuesChange={handleCoreValuesChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}

        {step === 3 && (
          <DimensionAssessment 
            dimensions={assessmentData.dimensions}
            onDimensionChange={handleDimensionChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}

        {step === 4 && (
          <FutureStateForm 
            dimensions={assessmentData.dimensions}
            onDimensionChange={handleDimensionChange}
            onComplete={handleCompleteAssessment}
            onBack={handlePreviousStep}
          />
        )}
        
        {/* Completion Dialog */}
        <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reneu Compass Completed!</DialogTitle>
              <DialogDescription>
                Congratulations! Your personalized renewal journey has been mapped. The next step is to select coaches who will guide you through your journey.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="p-4 bg-primary/10 rounded-md border border-primary/20">
                <p className="text-sm">
                  Based on your assessment, we'll recommend coaches specialized in the areas where you want to focus. You can choose a Reneu coach for your overall journey, as well as specialists for specific dimensions.
                </p>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={handleNavigateToDashboard}>
                Go to Dashboard
              </Button>
              <Button onClick={handleNavigateToCoaches}>
                Select Your Coaches
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default ReneuCompass;
