import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CoachCard } from "@/components/ui/coach-card";
import { Separator } from "@/components/ui/separator";
import ReneuCompassCard from "@/components/onboarding/ReneuCompassCard";
import WelcomeSection from "@/components/onboarding/WelcomeSection";
import { 
  Calendar, 
  CheckCircle, 
  Compass, 
  MessageSquare, 
  UserCircle, 
  Users,
  ArrowUpRight,
  Briefcase,
  Brain,
  Activity,
  Heart
} from "lucide-react";

// Mock coach data
const COACHES = [
  {
    id: "coach1",
    name: "Dr. Sarah Williams",
    title: "Reneu Life Coach & Psychologist",
    specialty: ["Purpose Discovery", "Life Transitions", "Holistic Wellbeing"],
    rating: 4.9,
    reviewCount: 127,
    imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    availability: "high",
    category: "reneu",
    pricingModel: "custom"
  },
  {
    id: "coach2",
    name: "James Richardson",
    title: "Executive Business Coach",
    specialty: ["Leadership Development", "Career Transitions", "Executive Presence"],
    rating: 4.8,
    reviewCount: 93,
    imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    availability: "medium",
    category: "business",
    pricingModel: "packages",
    packages: {
      basic: "$249/month",
      standard: "$449/month",
      premium: "$849/month"
    }
  },
  {
    id: "coach3",
    name: "Dr. Maya Patel",
    title: "Mind & Wellness Coach",
    specialty: ["Stress Management", "Mindfulness", "Emotional Intelligence"],
    rating: 4.9,
    reviewCount: 156,
    imageSrc: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    availability: "low",
    category: "mind",
    pricingModel: "packages",
    packages: {
      basic: "$199/month",
      standard: "$399/month",
      premium: "$699/month"
    }
  },
  {
    id: "coach4",
    name: "Michael Torres",
    title: "Fitness & Nutrition Coach",
    specialty: ["Holistic Fitness", "Nutrition Planning", "Energy Management"],
    rating: 4.7,
    reviewCount: 89,
    imageSrc: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    availability: "high",
    category: "body",
    pricingModel: "packages",
    packages: {
      basic: "$149/month",
      standard: "$349/month",
      premium: "$599/month"
    }
  }
];

// Mock goals data organized by category
const GOALS = {
  overall: [
    {
      id: "goal1",
      title: "Create a more balanced and purposeful life",
      progress: 32,
      updates: [
        { date: "2 days ago", text: "Completed purpose mapping session" },
        { date: "1 week ago", text: "Started Reneu Compass assessment" }
      ]
    }
  ],
  professional: [
    {
      id: "goal2",
      title: "Transition to a more fulfilling career path",
      progress: 45,
      updates: [
        { date: "3 days ago", text: "Completed skills assessment" },
        { date: "2 weeks ago", text: "Identified target roles and industries" }
      ]
    },
    {
      id: "goal3",
      title: "Develop leadership and management skills",
      progress: 20,
      updates: [
        { date: "1 day ago", text: "Started emotional intelligence module" }
      ]
    }
  ],
  mental: [
    {
      id: "goal4",
      title: "Reduce daily stress and anxiety",
      progress: 60,
      updates: [
        { date: "Yesterday", text: "Completed first mindfulness session" },
        { date: "5 days ago", text: "Started daily meditation practice" }
      ]
    }
  ],
  physical: [
    {
      id: "goal5",
      title: "Establish sustainable exercise routine",
      progress: 15,
      updates: [
        { date: "4 days ago", text: "Initial fitness assessment completed" }
      ]
    },
    {
      id: "goal6",
      title: "Improve sleep quality and consistency",
      progress: 25,
      updates: [
        { date: "6 days ago", text: "Began sleep tracking" }
      ]
    }
  ]
};

// Associate coaches with goal categories
const reneuCoach = COACHES.find(coach => coach.category === "reneu");
const professionalCoaches = COACHES.filter(coach => coach.category === "business");
const mentalCoaches = COACHES.filter(coach => coach.category === "mind");
const bodyCoaches = COACHES.filter(coach => coach.category === "body");

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  
  // Mock Reneu Compass progress data
  const compassProgress = { 
    hasStarted: true, 
    hasCompleted: true, 
    percentComplete: 100 
  };
  
  // Mock user data for compass
  const userData = {
    purpose: "To create a balanced life centered around personal growth and meaningful connections",
    coreValues: ["Growth", "Balance", "Authenticity", "Impact"],
    currentState: {
      work: 5,
      mind: 4,
      body: 3
    },
    desiredState: {
      work: 8,
      mind: 7,
      body: 8
    }
  };
  
  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: "session1",
      date: "Tomorrow",
      time: "10:00 AM",
    },
    {
      id: "session2",
      date: "Friday, Nov 18",
      time: "2:00 PM",
    }
  ];
  
  if (!user) return null;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome section with user greeting and initial steps */}
        <WelcomeSection 
          userName={user.firstName || "Alex"} 
          hasCompletedCompass={compassProgress.hasCompleted}
          compassProgress={compassProgress}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="w-full bg-muted/50">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="sessions" className="flex-1">Sessions</TabsTrigger>
                <TabsTrigger value="goals" className="flex-1">Goals</TabsTrigger>
                <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8 mt-6">
                {/* Reneu Compass Card - Moved to the top */}
                <ReneuCompassCard
                  progress={compassProgress}
                  userData={userData}
                />
                
                {/* Your overall Reneu goals and coach section */}
                <section className="space-y-4">
                  <div className="flex items-center">
                    <Compass className="mr-2 h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Your Overall Reneu Goals and Coach</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Overall Goals */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Overall Renewal Goals</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {GOALS.overall.map(goal => (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{goal.title}</h4>
                              <span className="text-sm">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                            <div className="space-y-1 mt-2">
                              {goal.updates.map((update, idx) => (
                                <div key={idx} className="flex gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                  <div>
                                    <span className="font-medium">{update.text}</span>
                                    <span className="text-muted-foreground ml-2">{update.date}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    
                    {/* Reneu Coach */}
                    {reneuCoach && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Your Reneu Coach</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3">
                            <div className="h-16 w-16 rounded-full overflow-hidden">
                              <img 
                                src={reneuCoach.imageSrc} 
                                alt={reneuCoach.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{reneuCoach.name}</h4>
                              <p className="text-sm text-muted-foreground">{reneuCoach.title}</p>
                              <Badge variant="outline" className="mt-1 bg-primary/10 text-primary border-primary/10">
                                Reneu Coach
                              </Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-4">
                            Schedule Session
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
                
                {/* Upcoming sessions summary - Moved after the main sections */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingSessions.length > 0 ? (
                      <div className="space-y-3">
                        {upcomingSessions.map(session => (
                          <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {session.date} at {session.time}
                              </p>
                            </div>
                            <Button size="sm">Join</Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No upcoming sessions</p>
                        <Button variant="outline" className="mt-2">Schedule a Session</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Your Professional Goals and Coaches section */}
                <section className="space-y-4">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-amber-600" />
                    <h2 className="text-xl font-semibold">Your Professional Goals and Coaches</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Professional Goals */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Professional Goals</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {GOALS.professional.map(goal => (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{goal.title}</h4>
                              <span className="text-sm">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                            <div className="space-y-1 mt-2">
                              {goal.updates.map((update, idx) => (
                                <div key={idx} className="flex gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                  <div>
                                    <span className="font-medium">{update.text}</span>
                                    <span className="text-muted-foreground ml-2">{update.date}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    
                    {/* Professional Coaches */}
                    {professionalCoaches.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Your Professional Coaches</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {professionalCoaches.map(coach => (
                            <div key={coach.id} className="flex items-center gap-3 mb-4">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img 
                                  src={coach.imageSrc} 
                                  alt={coach.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{coach.name}</h4>
                                <p className="text-sm text-muted-foreground">{coach.title}</p>
                                <Badge variant="outline" className="mt-1 bg-amber-500/10 text-amber-700 border-amber-200">
                                  Business Coach
                                </Badge>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="w-full">
                            Schedule Session
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
                
                {/* Your Mental Goals and Coaches section */}
                <section className="space-y-4">
                  <div className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-purple-600" />
                    <h2 className="text-xl font-semibold">Your Mental Goals and Coaches</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mental Goals */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Mental Wellbeing Goals</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {GOALS.mental.map(goal => (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{goal.title}</h4>
                              <span className="text-sm">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                            <div className="space-y-1 mt-2">
                              {goal.updates.map((update, idx) => (
                                <div key={idx} className="flex gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                  <div>
                                    <span className="font-medium">{update.text}</span>
                                    <span className="text-muted-foreground ml-2">{update.date}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    
                    {/* Mental Coaches */}
                    {mentalCoaches.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Your Mental Coaches</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {mentalCoaches.map(coach => (
                            <div key={coach.id} className="flex items-center gap-3 mb-4">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img 
                                  src={coach.imageSrc} 
                                  alt={coach.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{coach.name}</h4>
                                <p className="text-sm text-muted-foreground">{coach.title}</p>
                                <Badge variant="outline" className="mt-1 bg-purple-500/10 text-purple-700 border-purple-200">
                                  Mental Coach
                                </Badge>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="w-full">
                            Schedule Session
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
                
                {/* Your Body Goals and Coaches section */}
                <section className="space-y-4">
                  <div className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-semibold">Your Body Goals and Coaches</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Body Goals */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Physical Health Goals</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {GOALS.physical.map(goal => (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{goal.title}</h4>
                              <span className="text-sm">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                            <div className="space-y-1 mt-2">
                              {goal.updates.map((update, idx) => (
                                <div key={idx} className="flex gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                  <div>
                                    <span className="font-medium">{update.text}</span>
                                    <span className="text-muted-foreground ml-2">{update.date}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    
                    {/* Body Coaches */}
                    {bodyCoaches.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Your Body Coaches</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {bodyCoaches.map(coach => (
                            <div key={coach.id} className="flex items-center gap-3 mb-4">
                              <div className="h-16 w-16 rounded-full overflow-hidden">
                                <img 
                                  src={coach.imageSrc} 
                                  alt={coach.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{coach.name}</h4>
                                <p className="text-sm text-muted-foreground">{coach.title}</p>
                                <Badge variant="outline" className="mt-1 bg-green-500/10 text-green-700 border-green-200">
                                  Body Coach
                                </Badge>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="w-full">
                            Schedule Session
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
              </TabsContent>
              
              {/* Other tabs content */}
              <TabsContent value="sessions">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Coaching Sessions</CardTitle>
                    <CardDescription>View and manage all your scheduled coaching sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {/* Sessions content would go here */}
                      <p className="text-muted-foreground text-center py-8">
                        Sessions tab content coming soon
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="goals">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Goals & Progress</CardTitle>
                    <CardDescription>Track your progress across all dimensions of your renewal journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {/* Goals content would go here */}
                      <p className="text-muted-foreground text-center py-8">
                        Detailed goals tracking coming soon
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Resources</CardTitle>
                    <CardDescription>Access materials and tools shared by your coaches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {/* Resources content would go here */}
                      <p className="text-muted-foreground text-center py-8">
                        Resources library coming soon
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Messages Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You have 3 unread messages from your coaches.
                </p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View Messages
                </Button>
              </CardContent>
            </Card>
            
            {/* Community Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Reneu Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect with others on their renewal journey in our community forums.
                </p>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientDashboard;
