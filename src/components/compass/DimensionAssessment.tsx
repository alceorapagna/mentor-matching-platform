
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Brain, Activity } from "lucide-react";

export interface DimensionData {
  work: { current: number; desired: number; notes: string };
  mind: { current: number; desired: number; notes: string };
  body: { current: number; desired: number; notes: string };
}

interface DimensionAssessmentProps {
  dimensions: DimensionData;
  onDimensionChange: (dimension: keyof DimensionData, field: 'current' | 'desired' | 'notes', value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const DimensionAssessment = ({ 
  dimensions, 
  onDimensionChange, 
  onNext, 
  onBack 
}: DimensionAssessmentProps) => {
  const [selectedDimension, setSelectedDimension] = useState("work");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Current State</CardTitle>
        <CardDescription>
          Rate your current level of satisfaction in each dimension from 1 (very dissatisfied) to 10 (completely satisfied).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedDimension} onValueChange={setSelectedDimension}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="work">
              <Briefcase className="h-4 w-4 mr-2" />
              Work
            </TabsTrigger>
            <TabsTrigger value="mind">
              <Brain className="h-4 w-4 mr-2" />
              Mind
            </TabsTrigger>
            <TabsTrigger value="body">
              <Activity className="h-4 w-4 mr-2" />
              Body
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="work" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Professional Fulfillment</h3>
              <p className="text-muted-foreground text-sm">How satisfied are you with your current work, career path, and professional growth?</p>
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs">Very Dissatisfied</span>
                  <span className="text-xs">Very Satisfied</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={dimensions.work.current}
                    onChange={(e) => onDimensionChange('work', 'current', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">10</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg font-bold">{dimensions.work.current}</span>
                </div>
              </div>
            </div>
            
            <textarea 
              className="w-full min-h-[100px] p-3 rounded-md border mt-4" 
              placeholder="What specifically about your work would you like to change or improve?"
              value={dimensions.work.notes}
              onChange={(e) => onDimensionChange('work', 'notes', e.target.value)}
            />
          </TabsContent>
          
          <TabsContent value="mind" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Mental Wellbeing</h3>
              <p className="text-muted-foreground text-sm">How would you rate your current mental clarity, emotional balance, and stress levels?</p>
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs">Very Dissatisfied</span>
                  <span className="text-xs">Very Satisfied</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={dimensions.mind.current}
                    onChange={(e) => onDimensionChange('mind', 'current', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">10</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg font-bold">{dimensions.mind.current}</span>
                </div>
              </div>
            </div>
            
            <textarea 
              className="w-full min-h-[100px] p-3 rounded-md border mt-4" 
              placeholder="What aspects of your mental wellbeing would you like to focus on improving?"
              value={dimensions.mind.notes}
              onChange={(e) => onDimensionChange('mind', 'notes', e.target.value)}
            />
          </TabsContent>
          
          <TabsContent value="body" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Physical Health</h3>
              <p className="text-muted-foreground text-sm">How would you rate your current physical health, energy levels, and wellness habits?</p>
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs">Very Dissatisfied</span>
                  <span className="text-xs">Very Satisfied</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={dimensions.body.current}
                    onChange={(e) => onDimensionChange('body', 'current', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">10</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg font-bold">{dimensions.body.current}</span>
                </div>
              </div>
            </div>
            
            <textarea 
              className="w-full min-h-[100px] p-3 rounded-md border mt-4" 
              placeholder="What aspects of your physical health would you like to prioritize?"
              value={dimensions.body.notes}
              onChange={(e) => onDimensionChange('body', 'notes', e.target.value)}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DimensionAssessment;
