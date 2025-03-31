
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourcesTab from './ResourcesTab';
import SurveysTab from './SurveysTab';
import ScheduleTab from './ScheduleTab';

interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  description: string;
}

interface Survey {
  id: number;
  name: string;
  completed: boolean;
  date: string;
  progress: number;
  questions: number;
}

interface RightPanelProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  documents: Document[];
  surveys: Survey[];
  documentUploadOpen: boolean;
  surveyCreationOpen: boolean;
  onCloseDocumentUpload: () => void;
  onCloseSurveyCreation: () => void;
  onUploadDocument: () => void;
  onCreateSurvey: () => void;
}

const RightPanel = ({
  activeTab,
  onTabChange,
  documents,
  surveys,
  documentUploadOpen,
  surveyCreationOpen,
  onCloseDocumentUpload,
  onCloseSurveyCreation,
  onUploadDocument,
  onCreateSurvey
}: RightPanelProps) => {
  return (
    <div className="col-span-1 space-y-6 bg-card border rounded-lg p-4">
      <Tabs defaultValue="resources" value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
          <TabsTrigger value="surveys" className="flex-1">Surveys</TabsTrigger>
          <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources">
          <ResourcesTab 
            documents={documents}
            documentUploadOpen={documentUploadOpen}
            onCloseDocumentUpload={onCloseDocumentUpload}
            onUploadDocument={onUploadDocument}
          />
        </TabsContent>
        
        <TabsContent value="surveys">
          <SurveysTab 
            surveys={surveys}
            surveyCreationOpen={surveyCreationOpen}
            onCloseSurveyCreation={onCloseSurveyCreation}
            onCreateSurvey={onCreateSurvey}
          />
        </TabsContent>
        
        <TabsContent value="schedule">
          <ScheduleTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RightPanel;
