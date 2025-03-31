
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PurposeValuesFormProps {
  purpose: string;
  coreValues: string[];
  onPurposeChange: (value: string) => void;
  onCoreValuesChange: (values: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const PurposeValuesForm = ({ 
  purpose, 
  coreValues, 
  onPurposeChange, 
  onCoreValuesChange, 
  onNext, 
  onBack 
}: PurposeValuesFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Purpose & Core Values</CardTitle>
        <CardDescription>
          Let's start by exploring what drives you and the values that guide your decisions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Purpose Statement</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Describe what gives your life meaning. This doesn't have to be perfect - you'll refine this with your coach.
            </p>
            <textarea 
              className="w-full min-h-[120px] p-3 rounded-md border" 
              placeholder="I believe my purpose is to..."
              value={purpose}
              onChange={(e) => onPurposeChange(e.target.value)}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Core Values</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Select 3-5 values that are most important to you.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {["Authenticity", "Balance", "Compassion", "Courage", "Creativity", "Growth", "Family", 
              "Freedom", "Health", "Honesty", "Impact", "Joy", "Learning", "Security", "Connection"].map((value) => (
                <Button
                  key={value}
                  variant={coreValues.includes(value) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    const newValues = [...coreValues];
                    if (newValues.includes(value)) {
                      onCoreValuesChange(newValues.filter(v => v !== value));
                    } else if (newValues.length < 5) {
                      onCoreValuesChange([...newValues, value]);
                    }
                  }}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={!purpose || coreValues.length === 0}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PurposeValuesForm;
