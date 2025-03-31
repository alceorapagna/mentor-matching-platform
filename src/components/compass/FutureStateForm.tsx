
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Brain, Activity } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DimensionData } from "./DimensionAssessment";

interface FutureStateFormProps {
  dimensions: DimensionData;
  onDimensionChange: (dimension: keyof DimensionData, field: 'current' | 'desired' | 'notes', value: any) => void;
  onComplete: () => void;
  onBack: () => void;
}

const FutureStateForm = ({ dimensions, onDimensionChange, onComplete, onBack }: FutureStateFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Desired Future State</CardTitle>
        <CardDescription>
          Let's map where you'd like to be in each dimension and schedule your discovery session.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-medium">Work</h3>
                </div>
                <div className="text-2xl font-bold">
                  {dimensions.work.current} → {dimensions.work.desired}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <input
                type="range"
                min="1"
                max="10"
                value={dimensions.work.desired}
                onChange={(e) => onDimensionChange('work', 'desired', parseInt(e.target.value))}
                className="w-full mb-4"
              />
              <p className="text-muted-foreground text-sm">
                You'll refine your work goals with your coach during the discovery session.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-medium">Mind</h3>
                </div>
                <div className="text-2xl font-bold">
                  {dimensions.mind.current} → {dimensions.mind.desired}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <input
                type="range"
                min="1"
                max="10"
                value={dimensions.mind.desired}
                onChange={(e) => onDimensionChange('mind', 'desired', parseInt(e.target.value))}
                className="w-full mb-4"
              />
              <p className="text-muted-foreground text-sm">
                Your mental wellbeing goals will be explored further in your discovery session.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium">Body</h3>
                </div>
                <div className="text-2xl font-bold">
                  {dimensions.body.current} → {dimensions.body.desired}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <input
                type="range"
                min="1"
                max="10"
                value={dimensions.body.desired}
                onChange={(e) => onDimensionChange('body', 'desired', parseInt(e.target.value))}
                className="w-full mb-4"
              />
              <p className="text-muted-foreground text-sm">
                Your physical health goals will be defined further in your discovery session.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Schedule Your Discovery Session</h3>
          <p className="text-muted-foreground mb-4">
            Your next step is to meet with a Reneu coach for a 90-minute discovery session where you'll discuss your assessment and refine your renewal journey plan.
          </p>
          
          <Card className="bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Discovery Session with a Reneu Coach</h4>
                  <p className="text-sm text-muted-foreground">90 minutes • Virtual Meeting</p>
                  <p className="text-sm mt-2">
                    This is where your renewal journey truly begins. You'll explore your assessment results and create a personalized plan forward.
                  </p>
                </div>
                <Button className="md:self-start">
                  Schedule Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onComplete}>
          Complete Assessment
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FutureStateForm;
