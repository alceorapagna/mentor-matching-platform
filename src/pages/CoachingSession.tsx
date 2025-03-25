
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  Send, 
  FileUp, 
  List, 
  PanelRight, 
  CalendarIcon, 
  PlusCircle,
  CheckCircle2,
  PlusSquare
} from 'lucide-react';

const CoachingSession = () => {
  const { id } = useParams();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [message, setMessage] = useState('');
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Mock data for messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'coach', text: 'Hello! Welcome to our session today.', time: '10:01 AM' },
    { id: 2, sender: 'client', text: 'Hi, thanks for having me!', time: '10:02 AM' },
    { id: 3, sender: 'coach', text: 'Let\'s start by reviewing your progress since our last meeting.', time: '10:03 AM' },
  ]);

  // Mock data for documents
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Leadership Fundamentals.pdf', type: 'pdf', date: '2023-10-15' },
    { id: 2, name: 'Weekly Progress Template.docx', type: 'document', date: '2023-10-10' },
  ]);

  // Mock data for surveys
  const [surveys, setSurveys] = useState([
    { id: 1, name: 'Initial Assessment', completed: true, date: '2023-09-30' },
    { id: 2, name: 'Mid-program Evaluation', completed: false, date: '2023-11-15' },
  ]);

  // Mock video stream setup
  useEffect(() => {
    setIsMounted(true);
    
    // Simulating video setup instead of actual navigator.mediaDevices
    // In a real application, you would use:
    // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    const setupMockVideo = () => {
      if (videoRef.current) {
        // Mock video element with a colored background to simulate a video feed
        videoRef.current.style.backgroundColor = '#000';
      }
    };
    
    setupMockVideo();
    
    return () => {
      // Clean up resources
    };
  }, []);
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };
  
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };
  
  const endCall = () => {
    // Handle ending the call
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
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          Coaching Session with Mark Johnson
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-16rem)]">
          {/* Video Conference Area */}
          <div className={`${showRightPanel ? 'lg:col-span-2' : 'lg:col-span-3'} h-full`}>
            <div className="relative bg-muted rounded-lg overflow-hidden h-[calc(100vh-20rem)]">
              {/* Main Video */}
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
              
              {/* User's own video (picture-in-picture) */}
              <div className="absolute bottom-4 right-4 w-48 h-32 rounded-lg overflow-hidden border-2 border-background shadow-lg">
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                  <span className="text-xl text-white">You</span>
                </div>
              </div>
              
              {/* Controls */}
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
            
            {/* Chat Area */}
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
                      <FileUp className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <List className="mr-2 h-4 w-4" />
                        Create Survey
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          {/* Right Panel - Resources, Surveys, and Schedule */}
          {showRightPanel && (
            <div className="col-span-1 space-y-6">
              <Tabs defaultValue="resources">
                <TabsList className="w-full">
                  <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
                  <TabsTrigger value="surveys" className="flex-1">Surveys</TabsTrigger>
                  <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
                </TabsList>
                
                <TabsContent value="resources" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Documents</h3>
                    <Button variant="ghost" size="sm">
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        {documents.map(doc => (
                          <li key={doc.id} className="p-3 hover:bg-muted flex justify-between items-center">
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.date}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="surveys" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Evaluation Surveys</h3>
                    <Button variant="ghost" size="sm">
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Create
                    </Button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        {surveys.map(survey => (
                          <li key={survey.id} className="p-3 hover:bg-muted flex justify-between items-center">
                            <div className="flex items-center">
                              {survey.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <PlusSquare className="h-4 w-4 text-amber-500 mr-2" />
                              )}
                              <div>
                                <p className="font-medium">{survey.name}</p>
                                <p className="text-xs text-muted-foreground">Due: {survey.date}</p>
                              </div>
                            </div>
                            <Button 
                              variant={survey.completed ? "outline" : "default"}
                              size="sm"
                            >
                              {survey.completed ? "View" : "Complete"}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Next Sessions</h3>
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
