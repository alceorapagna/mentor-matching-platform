
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { PanelRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { VideoProvider } from '@/components/session/VideoProviderSelector';
import { Goal } from '@/components/session/GoalProgressTracker';
import { Message, Document, Survey, SessionSummary } from '@/types/session';

// Extracted Components
import SessionHeader from '@/components/session/SessionHeader';
import ClientGoalsCard from '@/components/session/ClientGoalsCard';
import PreviousSessionsCard from '@/components/session/PreviousSessionsCard';
import VideoArea from '@/components/session/VideoArea';
import ChatPanel from '@/components/session/ChatPanel';
import RightPanel from '@/components/session/RightPanel';
import GoalProgressTracker from '@/components/session/GoalProgressTracker';

const CoachingSession = () => {
  const { id } = useParams();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [activeTab, setActiveTab] = useState('resources');
  const [isMounted, setIsMounted] = useState(false);
  const [documentUploadOpen, setDocumentUploadOpen] = useState(false);
  const [surveyCreationOpen, setSurveyCreationOpen] = useState(false);
  const [showSessionHistory, setShowSessionHistory] = useState(false);
  const [showGoalTracker, setShowGoalTracker] = useState(false);
  const [sessionEnding, setSessionEnding] = useState(false);
  const { toast } = useToast();
  
  const [videoProvider, setVideoProvider] = useState<VideoProvider>('embedded');
  const [externalMeetingUrl, setExternalMeetingUrl] = useState('');
  
  // State for messages
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'coach', text: 'Hello! Welcome to our session today.', time: '10:01 AM' },
    { id: 2, sender: 'client', text: 'Hi, thanks for having me!', time: '10:02 AM' },
    { id: 3, sender: 'coach', text: 'Let\'s start by reviewing your progress since our last meeting.', time: '10:03 AM' },
    { id: 4, sender: 'coach', text: 'I\'ve uploaded a new article on leadership principles. Please check the Resources tab.', time: '10:04 AM' },
    { id: 5, sender: 'coach', text: 'Also, please complete the mid-program evaluation survey when you have time.', time: '10:05 AM' },
  ]);

  // State for documents
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'Leadership Fundamentals.pdf', type: 'pdf', date: '2023-10-15', description: 'Core principles of effective leadership' },
    { id: 2, name: 'Weekly Progress Template.docx', type: 'document', date: '2023-10-10', description: 'Template for tracking weekly goals' },
    { id: 3, name: 'Emotional Intelligence Article.pdf', type: 'pdf', date: '2023-10-20', description: 'Research on EQ in workplace relationships' },
    { id: 4, name: 'Strategic Planning Guide.pdf', type: 'pdf', date: '2023-10-25', description: 'Framework for long-term goal setting' },
  ]);

  // State for surveys
  const [surveys, setSurveys] = useState<Survey[]>([
    { id: 1, name: 'Initial Assessment', completed: true, date: '2023-09-30', progress: 100, questions: 12 },
    { id: 2, name: 'Mid-program Evaluation', completed: false, date: '2023-11-15', progress: 0, questions: 8 },
    { id: 3, name: 'Leadership Skills Assessment', completed: false, date: '2023-11-05', progress: 60, questions: 15 },
    { id: 4, name: 'Communication Style Analysis', completed: true, date: '2023-10-18', progress: 100, questions: 10 },
  ]);

  // Client goals data
  const [clientGoals, setClientGoals] = useState<Goal[]>([
    { id: 1, text: "Improve leadership communication skills", progress: 65 },
    { id: 2, text: "Develop strategic planning capabilities", progress: 40 },
    { id: 3, text: "Enhance team management and delegation", progress: 25 },
  ]);

  // Previous session summaries
  const [previousSessions, setPreviousSessions] = useState<SessionSummary[]>([
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
    return () => {};
  }, []);
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };
  
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };
  
  const endCall = () => {
    setSessionEnding(true);
    setShowGoalTracker(true);
  };
  
  const sendMessage = (newMessage: string) => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'client',
          text: newMessage,
          time: format(new Date(), 'h:mm a')
        }
      ]);
    }
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

  const handleSaveGoalProgress = (updatedGoals: Goal[], sessionNotes: string) => {
    setClientGoals(updatedGoals);
    
    // Create a new session summary entry
    const newSession = {
      id: previousSessions.length + 1,
      date: format(new Date(), 'MMMM d, yyyy'),
      summary: sessionNotes,
      keyTakeaways: ["Session notes recorded"] // In a real app, this would be parsed or entered separately
    };
    
    setPreviousSessions([newSession, ...previousSessions]);
    setShowGoalTracker(false);
    
    // In a real app, we would save this data to a backend
    toast({
      title: "Session completed",
      description: "Goals updated and session notes saved.",
    });
    
    if (sessionEnding) {
      // Wait briefly to show the toast before ending the session
      setTimeout(() => {
        console.log('Call ended and progress saved');
        // Here you would redirect to a post-session page or dashboard
      }, 1500);
    }
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
        {/* Session Header */}
        <SessionHeader 
          onShowGoalTracker={() => setShowGoalTracker(true)}
          videoProvider={videoProvider}
          onSelectProvider={setVideoProvider}
          externalMeetingUrl={externalMeetingUrl}
          onExternalMeetingUrlChange={setExternalMeetingUrl}
        />
        
        {/* Client Goals Section */}
        <div className="mb-6">
          <ClientGoalsCard 
            clientGoals={clientGoals}
            showSessionHistory={showSessionHistory}
            onToggleSessionHistory={() => setShowSessionHistory(!showSessionHistory)}
          />
        </div>

        {/* Previous Session History - Collapsible */}
        {showSessionHistory && (
          <div className="mb-6">
            <PreviousSessionsCard previousSessions={previousSessions} />
          </div>
        )}
        
        {/* Goal Progress Tracker Modal */}
        {showGoalTracker && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl w-full">
              <GoalProgressTracker 
                isOpen={showGoalTracker}
                onClose={() => {
                  setShowGoalTracker(false);
                  setSessionEnding(false);
                }}
                goals={clientGoals}
                onSaveProgress={handleSaveGoalProgress}
              />
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-16rem)]">
          <div className={`${showRightPanel ? 'lg:col-span-2' : 'lg:col-span-3'} h-full`}>
            {/* Video Area */}
            <VideoArea 
              videoProvider={videoProvider}
              providerName={getProviderName(videoProvider)}
              externalMeetingUrl={externalMeetingUrl}
              isVideoOn={isVideoOn}
              isAudioOn={isAudioOn}
              onToggleVideo={toggleVideo}
              onToggleAudio={toggleAudio}
              onEndCall={endCall}
              onShowGoalTracker={() => setShowGoalTracker(true)}
            />
            
            {/* Chat Panel */}
            <ChatPanel 
              messages={messages}
              onSendMessage={sendMessage}
              onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
              onDocumentUpload={() => setDocumentUploadOpen(true)}
              onSurveyCreation={() => setSurveyCreationOpen(true)}
              onShowGoalTracker={() => setShowGoalTracker(true)}
            />
          </div>
          
          {/* Right Panel with Tabs */}
          {showRightPanel && (
            <RightPanel 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              documents={documents}
              surveys={surveys}
              documentUploadOpen={documentUploadOpen}
              surveyCreationOpen={surveyCreationOpen}
              onCloseDocumentUpload={() => setDocumentUploadOpen(false)}
              onCloseSurveyCreation={() => setSurveyCreationOpen(false)}
              onUploadDocument={handleUploadDocument}
              onCreateSurvey={handleCreateSurvey}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoachingSession;
