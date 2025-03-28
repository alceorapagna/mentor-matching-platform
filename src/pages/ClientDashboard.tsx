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
  Heart,
  Clock,
  FileText,
  BookOpen,
  Download,
  Video,
  AudioLines
} from "lucide-react";

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
    pricingModel: "custom",
    nextSession: {
      date: "Tomorrow",
      time: "10:00 AM"
    }
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
    },
    nextSession: {
      date: "Friday",
      time: "2:00 PM"
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
    },
    nextSession: {
      date: "Next Monday",
      time: "11:30 AM"
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
    },
    nextSession: {
      date: "Wednesday",
      time: "4:00 PM"
    }
  }
];

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

const reneuCoach = COACHES.find(coach => coach.category === "reneu");
const professionalCoaches = COACHES.filter(coach => coach.category === "business");
const mentalCoaches = COACHES.filter(coach => coach.category === "mind");
const bodyCoaches = COACHES.filter(coach => coach.category === "body");

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  
  const compassProgress = { 
    hasStarted: true, 
    hasCompleted: true, 
    percentComplete: 100 
  };
  
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
  
  if (!user) return null;
  
  const allCoaches = [...COACHES];
  
  const allGoals = [
    ...GOALS.overall, 
    ...GOALS.professional, 
    ...GOALS.mental, 
    ...GOALS.physical
  ];
  
  const RESOURCES = {
    coachProvided: [
      {
        id: "resource1",
        title: "Purpose Discovery Workbook",
        type: "document",
        category: "reneu",
        uploadedBy: "Dr. Sarah Williams",
        dateUploaded: "2 weeks ago",
        icon: FileText
      },
      {
        id: "resource2",
        title: "Leadership Communication Strategies",
        type: "document",
        category: "business",
        uploadedBy: "James Richardson",
        dateUploaded: "1 week ago",
        icon: FileText
      },
      {
        id: "resource3",
        title: "Guided Meditation Series",
        type: "audio",
        category: "mind",
        uploadedBy: "Dr. Maya Patel",
        dateUploaded: "3 days ago",
        icon: AudioLines
      },
      {
        id: "resource4",
        title: "HIIT Workout Routine",
        type: "video",
        category: "body",
        uploadedBy: "Michael Torres",
        dateUploaded: "Yesterday",
        icon: Video
      },
    ],
    userUploaded: [
      {
        id: "resource5",
        title: "My Life Vision Board",
        type: "document",
        category: "reneu",
        uploadedBy: "You",
        dateUploaded: "1 week ago",
        icon: FileText
      },
      {
        id: "resource6",
        title: "Career Development Plan",
        type: "document",
        category: "business",
        uploadedBy: "You",
        dateUploaded: "5 days ago",
        icon: FileText
      }
    ]
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <WelcomeSection 
          userName={user.firstName || "Alex"} 
          hasCompletedCompass={compassProgress.hasCompleted}
          compassProgress={compassProgress}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <div className="lg:col-span-2 space-y-8">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="w-full bg-muted/50">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="sessions" className="flex-1">Sessions</TabsTrigger>
                <TabsTrigger value="goals" className="flex-1">Goals</TabsTrigger>
                <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8 mt-6">
                <ReneuCompassCard
                  progress={compassProgress}
                  userData={userData}
                />
                
                <section className="space-y-4">
                  <div className="flex items-center">
                    <Compass className="mr-2 h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Your Overall Reneu Goals and Coach</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          
                          {reneuCoach.nextSession && (
                            <div className="mt-4 p-3 rounded-lg border border-border/60 bg-muted/30">
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="h-4 w-4 text-primary" />
                                <p className="text-sm font-medium">Upcoming Session</p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                <p>{reneuCoach.nextSession.date} at {reneuCoach.nextSession.time}</p>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button size="sm" variant="outline">Join</Button>
                              </div>
                            </div>
                          )}
                          
                          <Button className="w-full mt-4">
                            Schedule New Session
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
                
                <section className="space-y-4">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-amber-600" />
                    <h2 className="text-xl font-semibold">Your Professional Goals and Coaches</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    
                    {professionalCoaches.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Your Professional Coaches</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {professionalCoaches.map(coach => (
                            <div key={coach.id} className="mb-4">
                              <div className="flex items-center gap-3 mb-2">
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
                              
                              {coach.nextSession && (
                                <div className="mt-2 p-3 rounded-lg border border-border/60 bg-muted/30">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-4 w-4 text-amber-600" />
                                    <p className="text-sm font-medium">Upcoming Session</p>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    <p>{coach.nextSession.date} at {coach.nextSession.time}</p>
                                  </div>
                                  <div className="flex justify-end mt-2">
                                    <Button size="sm" variant="outline">Join</Button>
                                  </div>
                                </div>
                              )}
                              
                              <Button variant="outline" size="sm" className="w-full mt-3">
                                Schedule New Session
                              </Button>
                              
                              {professionalCoaches.indexOf(coach) < professionalCoaches.length - 1 && (
                                <Separator className="my-4" />
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
                
                <section className="space-y-4">
                  <div className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-purple-600" />
                    <h2 className="text-xl font-semibold">Your Mental Goals and Coaches</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    
                    {mentalCoaches.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Your Mental Coaches</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {mentalCoaches.map(coach => (
                            <div key={coach.id} className="mb-4">
                              <div className="flex items-center gap-3 mb-2">
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
                              
                              {coach.nextSession && (
                                <div className="mt-2 p-3 rounded-lg border border-border/60 bg-muted/30">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-4 w-4 text-purple-600" />
                                    <p className="text-sm font-medium">Upcoming Session</p>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    <p>{coach.nextSession.date} at {coach.nextSession.time}</p>
                                  </div>
                                  <div className="flex justify-end mt-2">
                                    <Button size="sm" variant="outline">Join</Button>
                                  </div>
                                </div>
                              )}
                              
                              <Button variant="outline" size="sm" className="w-full mt-3">
                                Schedule New Session
                              </Button>
                              
                              {mentalCoaches.indexOf(coach) < mentalCoaches.length - 1 && (
                                <Separator className="my-4" />
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
                
                <section className="space-y-4">
                  <div className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-semibold">Your Body Goals and Coaches</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    
                    {bodyCoaches.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Your Body Coaches</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {bodyCoaches.map(coach => (
                            <div key={coach.id} className="mb-4">
                              <div className="flex items-center gap-3 mb-2">
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
                              
                              {coach.nextSession && (
                                <div className="mt-2 p-3 rounded-lg border border-border/60 bg-muted/30">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-4 w-4 text-green-600" />
                                    <p className="text-sm font-medium">Upcoming Session</p>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5" />
                                    <p>{coach.nextSession.date} at {coach.nextSession.time}</p>
                                  </div>
                                  <div className="flex justify-end mt-2">
                                    <Button size="sm" variant="outline">Join</Button>
                                  </div>
                                </div>
                              )}
                              
                              <Button variant="outline" size="sm" className="w-full mt-3">
                                Schedule New Session
                              </Button>
                              
                              {bodyCoaches.indexOf(coach) < bodyCoaches.length - 1 && (
                                <Separator className="my-4" />
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="sessions" className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Coaching Sessions</h2>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Your scheduled coaching sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {allCoaches.filter(coach => coach.nextSession).map((coach) => (
                      <div key={coach.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden">
                            <img 
                              src={coach.imageSrc}
                              alt={coach.name}
                              className="object-cover h-full w-full"
                            />
                            <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white
                              ${coach.availability === 'high' ? 'bg-green-500' : 
                                coach.availability === 'medium' ? 'bg-amber-500' : 
                                'bg-red-500'}`} 
                            />
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{coach.name}</h3>
                                <Badge variant="outline" className={`
                                  ${coach.category === 'reneu' ? 'bg-primary/10 text-primary border-primary/10' : 
                                    coach.category === 'business' ? 'bg-amber-500/10 text-amber-700 border-amber-200' : 
                                    coach.category === 'mind' ? 'bg-purple-500/10 text-purple-700 border-purple-200' : 
                                    'bg-green-500/10 text-green-700 border-green-200'}
                                `}>
                                  {coach.category === 'reneu' ? 'Reneu' : 
                                    coach.category === 'business' ? 'Business' : 
                                    coach.category === 'mind' ? 'Mind' : 'Body'} Coach
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{coach.title}</p>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex items-center gap-2">
                            <Calendar className={`h-4 w-4 
                              ${coach.category === 'reneu' ? 'text-primary' : 
                                coach.category === 'business' ? 'text-amber-600' : 
                                coach.category === 'mind' ? 'text-purple-600' : 
                                'text-green-600'}`}
                            />
                            <span className="text-sm font-medium">{coach.nextSession?.date}</span>
                            <Clock className="h-4 w-4 ml-2" />
                            <span className="text-sm font-medium">{coach.nextSession?.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex md:flex-col gap-2 items-end justify-end md:min-w-32">
                          <Button size="sm">
                            Join Session
                          </Button>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">
                      View Past Sessions
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule New Sessions</CardTitle>
                    <CardDescription>Choose a coach to book your next session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {allCoaches.map((coach) => (
                        <div key={coach.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img 
                              src={coach.imageSrc} 
                              alt={coach.name}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{coach.name}</h4>
                              <Badge variant="outline" className={`
                                ${coach.category === 'reneu' ? 'bg-primary/10 text-primary border-primary/10' : 
                                  coach.category === 'business' ? 'bg-amber-500/10 text-amber-700 border-amber-200' : 
                                  coach.category === 'mind' ? 'bg-purple-500/10 text-purple-700 border-purple-200' : 
                                  'bg-green-500/10 text-green-700 border-green-200'}
                              `}>
                                {coach.category === 'reneu' ? 'Reneu' : 
                                  coach.category === 'business' ? 'Business' : 
                                  coach.category === 'mind' ? 'Mind' : 'Body'} Coach
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{coach.specialty?.[0]}</p>
                          </div>
                          <Button size="sm">Book</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Goals & Progress</h2>
                  <Button>
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    New Goal
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                    <CardDescription>Track your development across all dimensions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Compass className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold">{GOALS.overall.length}</span>
                        <span className="text-sm text-muted-foreground">Reneu Goals</span>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
                          <Briefcase className="h-6 w-6 text-amber-600" />
                        </div>
                        <span className="text-xl font-bold">{GOALS.professional.length}</span>
                        <span className="text-sm text-muted-foreground">Work Goals</span>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                          <Brain className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="text-xl font-bold">{GOALS.mental.length}</span>
                        <span className="text-sm text-muted-foreground">Mind Goals</span>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                          <Heart className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-xl font-bold">{GOALS.physical.length}</span>
                        <span className="text-sm text-muted-foreground">Body Goals</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Compass className="h-5 w-5 text-primary" />
                        Reneu Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {GOALS.overall.map(goal => (
                        <div key={goal.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <h4 className="font-semibold">{goal.title}</h4>
                            <div className="flex justify-between mt-2">
                              <span className="text-sm">{goal.progress}% complete</span>
                              <span className="text-sm text-muted-foreground">{goal.updates.length} updates</span>
                            </div>
                            <Progress value={goal.progress} className="h-2 mt-1" />
                          </div>
                          
                          <div className="space-y-2 pt-2 mt-2 border-t">
                            <h5 className="text-sm font-medium">Recent Updates</h5>
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
                          
                          <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" size="sm">Details</Button>
                            <Button size="sm">Update Progress</Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-amber-600" />
                        Work Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {GOALS.professional.map(goal => (
                        <div key={goal.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <h4 className="font-semibold">{goal.title}</h4>
                            <div className="flex justify-between mt-2">
                              <span className="text-sm">{goal.progress}% complete</span>
                              <span className="text-sm text-muted-foreground">{goal.updates.length} updates</span>
                            </div>
                            <Progress value={goal.progress} className="h-2 mt-1" />
                          </div>
                          
                          <div className="space-y-2 pt-2 mt-2 border-t">
                            <h5 className="text-sm font-medium">Recent Updates</h5>
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
                          
                          <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" size="sm">Details</Button>
                            <Button size="sm">Update Progress</Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        Mind Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {GOALS.mental.map(goal => (
                        <div key={goal.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <h4 className="font-semibold">{goal.title}</h4>
                            <div className="flex justify-between mt-2">
                              <span className="text-sm">{goal.progress}% complete</span>
                              <span className="text-sm text-muted-foreground">{goal.updates.length} updates</span>
                            </div>
                            <Progress value={goal.progress} className="h-2 mt-1" />
                          </div>
                          
                          <div className="space-y-2 pt-2 mt-2 border-t">
                            <h5 className="text-sm font-medium">Recent Updates</h5>
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
                          
                          <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" size="sm">Details</Button>
                            <Button size="sm">Update Progress</Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-green-600" />
                        Body Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {GOALS.physical.map(goal => (
                        <div key={goal.id} className="border rounded-lg p-4 space-y-3">
                          <div>
                            <h4 className="font-semibold">{goal.title}</h4>
                            <div className="flex justify-between mt-2">
                              <span className="text-sm">{goal.progress}% complete</span>
                              <span className="text-sm text-muted-foreground">{goal.updates.length} updates</span>
                            </div>
                            <Progress value={goal.progress} className="h-2 mt-1" />
                          </div>
                          
                          <div className="space-y-2 pt-2 mt-2 border-t">
                            <h5 className="text-sm font-medium">Recent Updates</h5>
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
                          
                          <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" size="sm">Details</Button>
                            <Button size="sm">Update Progress</Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Resources</h2>
                  <Button>
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Upload New
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Coach Provided Resources</CardTitle>
                    <CardDescription>Materials shared with you by your coaches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {RESOURCES.coachProvided.map(resource => (
                        <div key={resource.id} className="flex items-start gap-3 p-4 border rounded-lg">
                          <div className={`h-10 w-10 flex items-center justify-center rounded-full 
                            ${resource.category === 'reneu' ? 'bg-primary/10 text-primary' : 
                              resource.category === 'business' ? 'bg-amber-500/10 text-amber-600' : 
                              resource.category === 'mind' ? 'bg-purple-500/10 text-purple-600' : 
                              'bg-green-500/10 text-green-600'}`}
                          >
                            <resource.icon className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              Shared by {resource.uploadedBy} • {resource.dateUploaded}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className={`
                                ${resource.category === 'reneu' ? 'bg-primary/10 text-primary border-primary/10' : 
                                  resource.category === 'business' ? 'bg-amber-500/10 text-amber-700 border-amber-200' : 
                                  resource.category === 'mind' ? 'bg-purple-500/10 text-purple-700 border-purple-200' : 
                                  'bg-green-500/10 text-green-700 border-green-200'}
                              `}>
                                {resource.category === 'reneu' ? 'Reneu' : 
                                  resource.category === 'business' ? 'Business' : 
                                  resource.category === 'mind' ? 'Mind' : 'Body'} Coaching
                              </Badge>
                              <Badge variant="outline">
                                {resource.type === 'document' ? 'Document' : 
                                  resource.type === 'audio' ? 'Audio' : 'Video'}
                              </Badge>
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Uploaded Resources</CardTitle>
                    <CardDescription>Materials you've uploaded to share with your coaches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {RESOURCES.userUploaded.map(resource => (
                        <div key={resource.id} className="flex items-start gap-3 p-4 border rounded-lg">
                          <div className={`h-10 w-10 flex items-center justify-center rounded-full 
                            ${resource.category === 'reneu' ? 'bg-primary/10 text-primary' : 
                              resource.category === 'business' ? 'bg-amber-500/10 text-amber-600' : 
                              resource.category === 'mind' ? 'bg-purple-500/10 text-purple-600' : 
                              'bg-green-500/10 text-green-600'}`}
                          >
                            <resource.icon className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              Uploaded by you • {resource.dateUploaded}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className={`
                                ${resource.category === 'reneu' ? 'bg-primary/10 text-primary border-primary/10' : 
                                  resource.category === 'business' ? 'bg-amber-500/10 text-amber-700 border-amber-200' : 
                                  resource.category === 'mind' ? 'bg-purple-500/10 text-purple-700 border-purple-200' : 
                                  'bg-green-500/10 text-green-700 border-green-200'}
                              `}>
                                {resource.category === 'reneu' ? 'Reneu' : 
                                  resource.category === 'business' ? 'Business' : 
                                  resource.category === 'mind' ? 'Mind' : 'Body'} Coaching
                              </Badge>
                              <Badge variant="outline">Document</Badge>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">
                      Browse All Resources
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Resources</CardTitle>
                    <CardDescription>Discover content that could help with your goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 flex flex-col">
                        <div className="h-36 bg-muted rounded-md flex items-center justify-center mb-3">
                          <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <h4 className="font-medium">Mindfulness for Beginners</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          A guide to starting your mindfulness practice
                        </p>
                        <div className="flex justify-end mt-auto pt-3">
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex flex-col">
                        <div className="h-36 bg-muted rounded-md flex items-center justify-center mb-3">
                          <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <h4 className="font-medium">Career Transition Toolkit</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Resources for navigating professional changes
                        </p>
                        <div className="flex justify-end mt-auto pt-3">
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex flex-col">
                        <div className="h-36 bg-muted rounded-md flex items-center justify-center mb-3">
                          <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <h4 className="font-medium">Healthy Habits Guide</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Building sustainable physical wellness routines
                        </p>
                        <div className="flex justify-end mt-auto pt-3">
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
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
