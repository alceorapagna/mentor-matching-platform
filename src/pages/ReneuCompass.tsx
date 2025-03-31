
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

interface CompassAssessmentData {
  purpose: string;
  coreValues: string[];
  dimensions: DimensionData;
}

const ReneuCompass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateCompassStatus } = useAuth();
  const [step, setStep] = useState(1);
  
  // Assessment data state
  const [assessmentData, setAssessmentData] = useState<CompassAssessmentData>({
    purpose: "",
    coreValues: [] as string[],
    dimensions: {
      work: { current: 5, desired: 8, notes: "" },
      mind: { current: 4, desired: 7, notes: "" },
      body: { current: 3, desired: 8, notes: "" }
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
      // Mark the compass as completed in the user profile
      await updateCompassStatus(true);
      
      toast({
        title: "Reneu Compass Completed",
        description: "Your renewal journey has been mapped. You'll be redirected to schedule your discovery session.",
        duration: 5000,
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
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
          [field]: value
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
      </div>
    </MainLayout>
  );
};

export default ReneuCompass;
