
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { ClipboardList, CheckCircle2, CalendarIcon, Info } from 'lucide-react';
import { format } from 'date-fns';

interface Survey {
  id: number;
  name: string;
  completed: boolean;
  date: string;
  progress: number;
  questions: number;
}

interface SurveysTabProps {
  surveys: Survey[];
  surveyCreationOpen: boolean;
  onCloseSurveyCreation: () => void;
  onCreateSurvey: () => void;
}

const SurveysTab = ({
  surveys,
  surveyCreationOpen,
  onCloseSurveyCreation,
  onCreateSurvey
}: SurveysTabProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">Evaluation Surveys</h3>
        <Button variant="outline" size="sm" onClick={() => surveyCreationOpen || onCloseSurveyCreation()}>
          <ClipboardList className="h-4 w-4 mr-1" />
          Create
        </Button>
      </div>

      {surveyCreationOpen && (
        <Card className="mb-4 border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Create New Survey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Survey Title" />
            <Textarea placeholder="Description of what this survey will measure" />
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm">Due Date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PP') : "Select Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onCloseSurveyCreation}>
              Cancel
            </Button>
            <Button size="sm" onClick={onCreateSurvey}>
              Create Survey
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-3">
        {surveys.map(survey => (
          <Card key={survey.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                {survey.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <ClipboardList className="h-4 w-4 text-amber-500 mr-2" />
                )}
                {survey.name}
              </CardTitle>
              <CardDescription>
                {survey.questions} questions · Due: {survey.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-0">
              <Progress value={survey.progress} className="h-2" />
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {survey.progress === 100 ? "Completed" : survey.progress > 0 ? "In progress" : "Not started"}
              </span>
              <Button 
                variant={survey.completed ? "outline" : "default"}
                size="sm"
              >
                {survey.completed ? "View Results" : survey.progress > 0 ? "Continue" : "Start"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {surveys.length === 0 && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No surveys available</AlertTitle>
          <AlertDescription>
            Your coach hasn't created any surveys for you yet.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SurveysTab;
