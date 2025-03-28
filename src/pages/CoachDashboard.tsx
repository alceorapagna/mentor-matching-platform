
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Settings, 
  PlusCircle,
  MessageSquare,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

// Mock upcoming sessions data
const UPCOMING_SESSIONS = [
  {
    id: "session1",
    clientName: "Alex Johnson",
    clientId: "client1",
    date: "2023-11-15",
    time: "10:00 AM",
    duration: 60,
    status: "confirmed"
  },
  {
    id: "session2",
    clientName: "Maria Garcia",
    clientId: "client2",
    date: "2023-11-16",
    time: "2:00 PM",
    duration: 45,
    status: "confirmed"
  },
  {
    id: "session3",
    clientName: "Ravi Patel",
    clientId: "client3",
    date: "2023-11-17",
    time: "11:30 AM",
    duration: 60,
    status: "pending"
  }
];

// Mock client list data
const CLIENTS = [
  {
    id: "client1",
    name: "Alex Johnson",
    email: "alex@example.com",
    sessionsCompleted: 5,
    lastSession: "2023-11-08",
    goals: [
      "Improve work-life balance",
      "Develop better communication skills",
      "Reduce stress"
    ],
    sessionNotes: [
      { date: "2023-11-08", note: "Discussed communication strategies in team settings. Alex is making good progress with active listening techniques." },
      { date: "2023-10-25", note: "Reviewed stress management techniques. Alex has been implementing daily meditation." }
    ]
  },
  {
    id: "client2",
    name: "Maria Garcia",
    email: "maria@example.com",
    sessionsCompleted: 3,
    lastSession: "2023-11-05",
    goals: [
      "Career transition planning",
      "Building confidence in leadership role"
    ],
    sessionNotes: [
      { date: "2023-11-05", note: "Worked on leadership vision statement. Maria identified key values she wants to embody as a leader." },
      { date: "2023-10-22", note: "Explored career options and created a 6-month action plan." }
    ]
  },
  {
    id: "client3",
    name: "Ravi Patel",
    email: "ravi@example.com",
    sessionsCompleted: 1,
    lastSession: "2023-11-01",
    goals: [
      "Launch new business venture",
      "Improve time management"
    ],
    sessionNotes: [
      { date: "2023-11-01", note: "Initial session. Discussed business concept and identified key challenges. Ravi will work on market research before next session." }
    ]
  },
  {
    id: "client4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    sessionsCompleted: 0,
    lastSession: null,
    goals: [
      "Set career development goals",
      "Improve work relationships"
    ],
    sessionNotes: []
  }
];

const CoachDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  
  if (!user) return null;

  const handleViewClient = (clientId: string) => {
    // Find the client in our data
    const client = CLIENTS.find(c => c.id === clientId);
    if (client) {
      setSelectedClientId(clientId);
      // Switch to clients tab to show the detailed view
      setActiveTab("clients");
    }
  };

  const selectedClient = selectedClientId ? CLIENTS.find(c => c.id === selectedClientId) : null;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Coach Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user.firstName}! Manage your coaching sessions and clients.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button>
              <Clock className="mr-2 h-4 w-4" />
              Add Availability
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{UPCOMING_SESSIONS.length}</p>
                  <p className="text-sm text-muted-foreground">This week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Active Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{CLIENTS.length}</p>
                  <p className="text-sm text-muted-foreground">Total clients</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">3</p>
                  <p className="text-sm text-muted-foreground">Unread messages</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {UPCOMING_SESSIONS.map(session => (
                <Card key={session.id} className="overflow-hidden">
                  <div className={`h-2 ${session.status === 'confirmed' ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <h3 className="font-medium">{session.clientName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {session.date} • {session.time} • {session.duration} min
                        </p>
                      </div>
                      <div className="flex gap-2 mt-3 md:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewClient(session.clientId)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm">Join Session</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-center mt-4">
                <Button variant="outline">View All Sessions</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Sessions</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Session
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Session Calendar</CardTitle>
                <CardDescription>Manage your upcoming coaching sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] bg-muted/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Calendar view will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Clients</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </div>
            
            {selectedClient ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{selectedClient.name}'s Profile</h3>
                  <Button variant="outline" size="sm" onClick={() => setSelectedClientId(null)}>
                    Back to All Clients
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Client Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{selectedClient.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Sessions Completed</p>
                        <p>{selectedClient.sessionsCompleted}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Last Session</p>
                        <p>{selectedClient.lastSession || "No sessions yet"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {selectedClient.goals.map((goal, index) => (
                        <li key={index} className="text-muted-foreground">
                          <span className="text-foreground">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Session Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedClient.sessionNotes.length > 0 ? (
                      <div className="space-y-4">
                        {selectedClient.sessionNotes.map((note, index) => (
                          <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                            <p className="font-medium">{note.date}</p>
                            <p className="text-muted-foreground">{note.note}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No session notes yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Email</th>
                          <th className="text-left p-4">Sessions</th>
                          <th className="text-left p-4">Last Session</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CLIENTS.map(client => (
                          <tr key={client.id} className="border-b hover:bg-muted/30">
                            <td className="p-4">{client.name}</td>
                            <td className="p-4">{client.email}</td>
                            <td className="p-4">{client.sessionsCompleted}</td>
                            <td className="p-4">{client.lastSession || "No sessions yet"}</td>
                            <td className="p-4">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewClient(client.id)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Coaching Resources</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assessment Templates</CardTitle>
                  <CardDescription>Standard assessments for your clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Initial Assessment</span>
                      </div>
                      <Button variant="ghost" size="sm">Use</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Goal Setting Worksheet</span>
                      </div>
                      <Button variant="ghost" size="sm">Use</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Progress Review</span>
                      </div>
                      <Button variant="ghost" size="sm">Use</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Client Resources</CardTitle>
                  <CardDescription>Materials to share with your clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Communication Styles Guide</span>
                      </div>
                      <Button variant="ghost" size="sm">Share</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Stress Management Techniques</span>
                      </div>
                      <Button variant="ghost" size="sm">Share</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted/30 rounded">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Productivity Best Practices</span>
                      </div>
                      <Button variant="ghost" size="sm">Share</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Coach Profile Settings</CardTitle>
                <CardDescription>Manage how you appear to potential clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Profile Visibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Control whether your profile is visible in the coach directory
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline">Edit Profile</Button>
                      <Button variant="outline">Preview Profile</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Session Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure your default session duration and availability
                    </p>
                    <Button variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      Manage Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CoachDashboard;
