
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  Send, 
  FileText, 
  FilePlus,
  ClipboardList,
  List, 
  PanelRight, 
  CalendarIcon, 
  PlusCircle,
  CheckCircle2,
  PlusSquare,
  Info,
  Download,
  Check,
  X,
  Settings,
  Target,
  History,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import VideoProviderSelector, { VideoProvider } from '@/components/session/VideoProviderSelector';
import ExternalVideoProvider from '@/components/session/ExternalVideoProvider';

const CoachingSession = () => {
  const { id } = useParams();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [message, setMessage] = useState('');
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState('resources');
  const [isMounted, setIsMounted] = useState(false);
  const [documentUploadOpen, setDocumentUploadOpen] = useState(false);
  const [surveyCreationOpen, setSurveyCreationOpen] = useState(false);
  const [showSessionHistory, setShowSessionHistory] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [videoProvider, setVideoProvider] = useState<VideoProvider>('embedded');
  const [externalMeetingUrl, setExternalMeetingUrl] = useState('');
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'coach', text: 'Hello! Welcome to our session today.', time: '10:01 AM' },
    { id: 2, sender: 'client', text: 'Hi, thanks for having me!', time: '10:02 AM' },
    { id: 3, sender: 'coach', text: 'Let\'s start by reviewing your progress since our last meeting.', time: '10:03 AM' },
    { id: 4, sender: 'coach', text: 'I\'ve uploaded a new article on leadership principles. Please check the Resources tab.', time: '10:04 AM' },
    { id: 5, sender: 'coach', text: 'Also, please complete the mid-program evaluation survey when you have time.', time: '10:05 AM' },
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Leadership Fundamentals.pdf', type: 'pdf', date: '2023-10-15', description: 'Core principles of effective leadership' },
    { id: 2, name: 'Weekly Progress Template.docx', type: 'document', date: '2023-10-10', description: 'Template for tracking weekly goals' },
    { id: 3, name: 'Emotional Intelligence Article.pdf', type: 'pdf', date: '2023-10-20', description: 'Research on EQ in workplace relationships' },
    { id: 4, name: 'Strategic Planning Guide.pdf', type: 'pdf', date: '2023-10-25', description: 'Framework for long-term goal setting' },
  ]);

  const [surveys, setSurveys] = useState([
    { id: 1, name: 'Initial Assessment', completed: true, date: '2023-09-30', progress: 100, questions: 12 },
    { id: 2, name: 'Mid-program Evaluation', completed: false, date: '2023-11-15', progress: 0, questions: 8 },
    { id: 3, name: 'Leadership Skills Assessment', completed: false, date: '2023-11-05', progress: 60, questions: 15 },
    { id: 4, name: 'Communication Style Analysis', completed: true, date: '2023-10-18', progress: 100, questions: 10 },
  ]);

  // Client goals data
  const [clientGoals] = useState([
    { id: 1, text: "Improve leadership communication skills", progress: 65 },
    { id: 2, text: "Develop strategic planning capabilities", progress: 40 },
    { id: 3, text: "Enhance team management and delegation", progress: 25 },
  ]);

  // Previous session summaries
  const [previousSessions] = useState([
    { 
      id: 1, 
      date: "October 25, 2023", 
      summary: "Discussed communication challenges with the marketing team. Identified key areas for improvement including active listening and providing clearer feedback.",
      keyTakeaways: ["Practice active listening", "Document feedback before meetings", "Follow up with team members individually"]
    },
    { 
      id: 2, 
      date: "November 1, 2023", 
      summary: "Reviewed progress on team communication. Explored strategic planning frameworks that can be applied to the upcoming quarterly planning session.",
      keyTakeaways: ["Implement SWOT analysis", "Schedule individual prep meetings", "Create communication plan template"]
    },
    { 
      id: 3, 
      date: "November 8, 2023", 
      summary: "Focused on delegation techniques. Identified tasks currently taking too much time that could be delegated to team members.",
      keyTakeaways: ["Identify 3 tasks to delegate next week", "Schedule training session for team", "Create accountability framework"]
    }
  ]);

  useEffect(() => {
    setIsMounted(true);
    
    if (videoProvider === 'embedded') {
      const setupMockVideo = () => {
        if (videoRef.current) {
          videoRef.current.style.backgroundColor = '#000';
        }
      };
      
      setupMockVideo();
    }
    
    return () => {
    };
  }, [videoProvider]);
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };
  
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };
  
  const endCall = () => {
    console.log('Call ended');
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'client',
          text: message,
          time: format(new Date(), 'h:mm a')
        }
      ]);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleUploadDocument = () => {
    const newDocument = {
      id: documents.length + 1,
      name: 'New Uploaded Document.pdf',
      type: 'pdf',
      date: format(new Date(), 'yyyy-MM-dd'),
      description: 'Recently uploaded document'
    };
    
    setDocuments([...documents, newDocument]);
    setDocumentUploadOpen(false);
  };

  const handleCreateSurvey = () => {
    const newSurvey = {
      id: surveys.length + 1,
      name: 'New Custom Survey',
      completed: false,
      date: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      progress: 0,
      questions: 5
    };
    
    setSurveys([...surveys, newSurvey]);
    setSurveyCreationOpen(false);
  };

  const getProviderName = (provider: VideoProvider) => {
    switch (provider) {
      case 'zoom': return 'Zoom';
      case 'teams': return 'Microsoft Teams';
      case 'meet': return 'Google Meet';
      default: return 'Reneu';
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Coaching Session with Mark Johnson
          </h1>
          <VideoProviderSelector
            selectedProvider={videoProvider}
            onSelectProvider={setVideoProvider}
            externalMeetingUrl={externalMeetingUrl}
            onExternalMeetingUrlChange={setExternalMeetingUrl}
          />
        </div>
        
        {/* Client Goals Section */}
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Client Goals & Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientGoals.map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.text}</span>
                      <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t">
              <div className="w-full">
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center gap-2" 
                  onClick={() => setShowSessionHistory(!showSessionHistory)}
                >
                  <History className="h-4 w-4" />
                  {showSessionHistory ? "Hide Previous Sessions" : "Show Previous Sessions"}
                  {showSessionHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Previous Session History - Collapsible */}
        {showSessionHistory && (
          <div className="mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <History className="h-5 w-5 mr-2 text-primary" />
                  Previous Session Summaries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previousSessions.map(session => (
                  <div key={session.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <h4 className="font-medium">{session.date}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{session.summary}</p>
                    <div className="mt-2">
                      <h5 className="text-sm font-medium">Key Takeaways:</h5>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        {session.keyTakeaways.map((takeaway, index) => (
                          <li key={index}>{takeaway}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-16rem)]">
          <div className={`${showRightPanel ? 'lg:col-span-2' : 'lg:col-span-3'} h-full`}>
            {videoProvider === 'embedded' ? (
              <div className="relative bg-muted rounded-lg overflow-hidden h-[calc(100vh-20rem)]">
                <div className="absolute inset-0">
                  <video 
                    ref={videoRef}
                    className={`w-full h-full object-cover ${isVideoOn ? '' : 'hidden'}`}
                    autoPlay 
                    muted 
                  />
                  {!isVideoOn && (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center">
                        <span className="text-2xl text-white">MJ</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-4 right-4 w-48 h-32 rounded-lg overflow-hidden border-2 border-background shadow-lg">
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <span className="text-xl text-white">You</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-background/90 p-2 rounded-full">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-full ${isAudioOn ? '' : 'bg-red-500 text-white hover:bg-red-600'}`}
                    onClick={toggleAudio}
                  >
                    {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-full ${isVideoOn ? '' : 'bg-red-500 text-white hover:bg-red-600'}`}
                    onClick={toggleVideo}
                  >
                    {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full"
                    onClick={endCall}
                  >
                    <Phone className="h-5 w-5 rotate-135" />
                  </Button>
                </div>
              </div>
            ) : (
              <ExternalVideoProvider 
                providerName={getProviderName(videoProvider)}
                meetingUrl={externalMeetingUrl}
              />
            )}
            
            <div className="mt-6 bg-card border rounded-lg h-64 flex flex-col">
              <div className="p-3 border-b font-medium flex justify-between items-center">
                <div>Chat</div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowRightPanel(!showRightPanel)}
                >
                  <PanelRight className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'client' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'client' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t flex gap-2">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button size="icon" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <FilePlus className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" onClick={() => setDocumentUploadOpen(true)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Upload Document
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => setSurveyCreationOpen(true)}>
                        <ClipboardList className="mr-2 h-4 w-4" />
                        Create Survey
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          {showRightPanel && (
            <div className="col-span-1 space-y-6 bg-card border rounded-lg p-4">
              <Tabs defaultValue="resources" value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="w-full">
                  <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
                  <TabsTrigger value="surveys" className="flex-1">Surveys</TabsTrigger>
                  <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
                </TabsList>
                
                <TabsContent value="resources" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">Documents & Resources</h3>
                    <Button variant="outline" size="sm" onClick={() => setDocumentUploadOpen(true)}>
                      <FilePlus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  {documentUploadOpen && (
                    <Card className="mb-4 border-primary">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Upload New Document</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Button className="w-full border-dashed border-2 border-muted-foreground/50 py-8 bg-muted/30">
                            <FileText className="h-6 w-6 mr-2" />
                            Select File to Upload
                          </Button>
                        </div>
                        <Input placeholder="Document Title" />
                        <Textarea placeholder="Document Description (optional)" />
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setDocumentUploadOpen(false)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleUploadDocument}>
                          Upload
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                  
                  <div className="space-y-3">
                    {documents.map(doc => (
                      <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-primary" />
                            {doc.name}
                          </CardTitle>
                          <CardDescription>{doc.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Added on {doc.date}</span>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="surveys" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">Evaluation Surveys</h3>
                    <Button variant="outline" size="sm" onClick={() => setSurveyCreationOpen(true)}>
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
                        <Button variant="outline" size="sm" onClick={() => setSurveyCreationOpen(false)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleCreateSurvey}>
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
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">Next Sessions</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : "Select Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        <li className="p-3 hover:bg-muted">
                          <p className="font-medium">Next Session</p>
                          <p className="text-sm">Tuesday, Nov 8th, 2023</p>
                          <p className="text-xs text-muted-foreground">3:00 PM - 4:00 PM</p>
                        </li>
                        <li className="p-3 hover:bg-muted">
                          <p className="font-medium">Follow-up Session</p>
                          <p className="text-sm">Tuesday, Nov 15th, 2023</p>
                          <p className="text-xs text-muted-foreground">3:00 PM - 4:00 PM</p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Button className="w-full">Schedule New Session</Button>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoachingSession;
