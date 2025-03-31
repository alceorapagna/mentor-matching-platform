
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface PurposeValuesFormProps {
  purpose: string;
  coreValues: string[];
  onPurposeChange: (value: string) => void;
  onCoreValuesChange: (values: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const VALUES_LIST = [
  "Authenticity", "Balance", "Compassion", "Courage", "Creativity", 
  "Growth", "Family", "Freedom", "Health", "Honesty", 
  "Impact", "Joy", "Learning", "Security", "Connection",
  "Achievement", "Adventure", "Community", "Gratitude", "Harmony",
  "Independence", "Innovation", "Integrity", "Leadership", "Respect"
];

const MAX_VALUES = 5;

const PurposeValuesForm = ({ 
  purpose, 
  coreValues, 
  onPurposeChange, 
  onCoreValuesChange, 
  onNext, 
  onBack 
}: PurposeValuesFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredValues = searchTerm 
    ? VALUES_LIST.filter(value => value.toLowerCase().includes(searchTerm.toLowerCase())) 
    : VALUES_LIST;

  const isValueSelected = (value: string) => coreValues.includes(value);
  
  const toggleValue = (value: string) => {
    const newValues = [...coreValues];
    if (newValues.includes(value)) {
      onCoreValuesChange(newValues.filter(v => v !== value));
    } else if (newValues.length < MAX_VALUES) {
      onCoreValuesChange([...newValues, value]);
    }
  };
  
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
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-medium">Purpose Statement</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Purpose info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Your purpose statement reflects what gives your life meaning and direction.
                      This will be refined with your coach during your sessions.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Describe what gives your life meaning. This doesn't have to be perfect - you'll refine this with your coach.
            </p>
            <textarea 
              className="w-full min-h-[120px] p-3 rounded-md border focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="I believe my purpose is to..."
              value={purpose}
              onChange={(e) => onPurposeChange(e.target.value)}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-medium">Core Values</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Values info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Your core values serve as guiding principles for your decisions and actions.
                      Select the ones that resonate most with you.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground text-sm mb-2">
              Select 3-5 values that are most important to you.
            </p>
            
            {coreValues.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {coreValues.map(value => (
                  <Badge key={value} className="flex items-center gap-1 px-3 py-1">
                    {value}
                    <button 
                      className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
                      onClick={() => toggleValue(value)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search values..."
                className="w-full p-2 border rounded-md mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredValues.map((value) => (
                <Button
                  key={value}
                  variant={isValueSelected(value) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => toggleValue(value)}
                  disabled={!isValueSelected(value) && coreValues.length >= MAX_VALUES}
                >
                  {value}
                </Button>
              ))}
            </div>
            {coreValues.length >= MAX_VALUES && (
              <p className="text-amber-600 text-sm mt-2">
                Maximum of {MAX_VALUES} values selected. Remove a value to select a different one.
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
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
