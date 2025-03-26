import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ReneuCompassCard from '@/components/onboarding/ReneuCompassCard';
import GoalCoachRecommendations from '@/components/onboarding/GoalCoachRecommendations';
import { 
  Calendar, 
  ChevronRight, 
  Clock, 
  Compass, 
  FileText, 
  BarChart2, 
  Video, 
  Users, 
  Star, 
  Award, 
  CheckCircle, 
  Circle, 
  Bookmark,
  FileUp,
  PlusCircle,
  Briefcase,
  Brain,
  Heart
} from 'lucide-react';

const ClientDashboard = () => {
  const [currentGoalProgress, setCurrentGoalProgress] = useState(65);
  const [compassProgress, setCompassProgress] = useState({
    hasStarted: true,
    hasCompleted: false,
    percentComplete: 45
  });
  
  const userCompassData = {
    purpose: "To create balance and meaning across all areas of my life",
    coreValues: ["Growth", "Connection", "Authenticity", "Balance"],
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
  
  const renewalGoals = [
    {
      id: "goal1",
      title: "AI Innovation for Business",
      description: "Learn how to use AI to innovate our business processes and offerings",
      category: 'work' as const,
      progress: 25
    },
    {
      id: "goal2",
      title: "Growth Mindset Development",
      description: "Break limiting beliefs and develop a growth-oriented mindset",
      category: 'mind' as const,
      progress: 15
    }
  ];
  
  const recommendedCoaches = [
    {
      id: "coach1",
      name: "Dr. Sarah Johnson",
      title: "AI & Business Innovation Coach",
      specialty: ["AI Strategy", "Digital Transformation", "Business Innovation"],
      rating: 4.9,
      reviewCount: 127,
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'work' as const,
      availability: 'high' as const
    },
    {
      id: "coach2",
      name: "David Williams",
      title: "Tech Leadership Coach",
      specialty: ["Tech Strategy", "Leadership", "Innovation"],
      rating: 4.7,
      reviewCount: 85,
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'work' as const,
      availability: 'medium' as const
    },
    {
      id: "coach3",
      name: "Robert Chen",
      title: "Business Technology Advisor",
      specialty: ["Digital Strategy", "AI Implementation", "Process Optimization"],
      rating: 4.8,
      reviewCount: 92,
      imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'work' as const,
      availability: 'low' as const
    },
    {
      id: "coach4",
      name: "Emily Parker",
      title: "Mindset & Growth Coach",
      specialty: ["Limiting Beliefs", "Growth Mindset", "Cognitive Restructuring"],
      rating: 4.9,
      reviewCount: 118,
      imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'mind' as const,
      availability: 'high' as const
    },
    {
      id: "coach5",
      name: "Michael Thompson",
      title: "Executive Mindset Coach",
      specialty: ["Belief Systems", "Mental Resilience", "Performance Psychology"],
      rating: 4.8,
      reviewCount: 76,
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: 'mind' as const,
      availability: 'medium' as const
    },
    {
      id: "coach6",
      name: "Lisa Rodriguez",
      title: "Cognitive Behavioral Coach",
      specialty: ["CBT Techniques", "Thought Patterns", "Behavioral Change"],
      rating: 4.7,
      reviewCount: 64,
      imageSrc: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      category: 'mind' as const,
      availability: 'medium' as const
    }
  ];
  
  const upcomingSessions = [
    {
      id: 1,
      coachName: 'Dr. Sarah Johnson',
      coachImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
      type: 'Leadership Development',
      date: 'Today',
      time: '3:00 PM - 4:00 PM',
      status: 'upcoming'
    },
    {
      id: 2,
      coachName: 'Mark Williams',
      coachImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      type: 'Career Coaching',
      date: 'Tomorrow',
      time: '11:00 AM - 12:00 PM',
      status: 'upcoming'
    },
    {
      id: 3,
      coachName: 'Emily Chen',
      coachImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80',
      type: 'Wellness Coaching',
      date: 'Nov 10, 2023',
      time: '2:00 PM - 3:00 PM',
      status: 'upcoming'
    }
  ];
  
  const pastSessions = [
    {
      id: 101,
      coachName: 'Dr. Sarah Johnson',
      coachImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
      type: 'Leadership Development',
      date: 'Nov 1, 2023',
      time: '3:00 PM - 4:00 PM',
      status: 'completed',
      hasRecording: true,
      hasNotes: true
    },
    {
      id: 102,
      coachName: 'Mark Williams',
      coachImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      type: 'Career Coaching',
      date: 'Oct 25, 2023',
      time: '11:00 AM - 12:00 PM',
      status: 'completed',
      hasRecording: true,
      hasNotes: true
    }
  ];
  
  const developmentGoals = [
    {
      id: 1,
      title: 'Improve public speaking skills',
      description: 'Become more comfortable and effective when presenting to large groups',
      progress: 65,
      startDate: 'Oct 1, 2023',
      targetDate: 'Dec 15, 2023',
      coach: 'Dr. Sarah Johnson',
      status: 'in-progress',
      milestones: [
        { id: 1, title: 'Complete initial assessment', completed: true },
        { id: 2, title: 'Practice speech techniques', completed: true },
        { id: 3, title: 'Deliver practice presentation to team', completed: false },
        { id: 4, title: 'Record and analyze performance', completed: false },
        { id: 5, title: 'Present at company all-hands', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Develop strategic thinking',
      description: 'Enhance ability to think long-term and make strategic decisions',
      progress: 30,
      startDate: 'Oct 15, 2023',
      targetDate: 'Jan 15, 2024',
      coach: 'Mark Williams',
      status: 'in-progress',
      milestones: [
        { id: 1, title: 'Complete strategic thinking assessment', completed: true },
        { id: 2, title: 'Read recommended literature', completed: true },
        { id: 3, title: 'Apply frameworks to current projects', completed: false },
        { id: 4, title: 'Develop strategic plan for department', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Work-life balance improvement',
      description: 'Develop better boundaries between work and personal life',
      progress: 45,
      startDate: 'Sep 15, 2023',
      targetDate: 'Dec 1, 2023',
      coach: 'Emily Chen',
      status: 'in-progress',
      milestones: [
        { id: 1, title: 'Complete stress assessment', completed: true },
        { id: 2, title: 'Implement daily mindfulness practice', completed: true },
        { id: 3, title: 'Establish work boundaries', completed: true },
        { id: 4, title: 'Track progress and adjust as needed', completed: false }
      ]
    }
  ];
  
  const myCoaches = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Executive & Leadership Coach',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
      focus: 'Leadership Development',
      nextSession: 'Today, 3:00 PM'
    },
    {
      id: 2,
      name: 'Mark Williams',
      title: 'Career Development Specialist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      focus: 'Career Transitions',
      nextSession: 'Tomorrow, 11:00 AM'
    },
    {
      id: 3,
      name: 'Emily Chen',
      title: 'Wellness & Balance Coach',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80',
      focus: 'Mental Well-being',
      nextSession: 'Nov 10, 2:00 PM'
    }
  ];
  
  const getCategoryColors = (category) => {
    switch (category) {
      case 'work':
        return {
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-600',
          iconColor: 'text-amber-600',
          borderColor: 'border-amber-200'
        };
      case 'mind':
        return {
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-600',
          iconColor: 'text-purple-600',
          borderColor: 'border-purple-200'
        };
      case 'body':
        return {
          bgColor: 'bg-green-50',
          textColor: 'text-green-600',
          iconColor: 'text-green-600',
          borderColor: 'border-green-200'
        };
      default:
        return {
          bgColor: 'bg-primary/10',
          textColor: 'text-primary',
          iconColor: 'text-primary',
          borderColor: 'border-primary/20'
        };
    }
  };
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work':
        return <Briefcase className="h-5 w-5 text-amber-600" />;
      case 'mind':
        return <Brain className="h-5 w-5 text-purple-600" />;
      case 'body':
        return <Heart className="h-5 w-5 text-green-600" />;
      default:
        return <Compass className="h-5 w-5 text-primary" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
            <p className="text-muted-foreground">Track your progress and manage your coaching journey</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="premium-button">Find a New Coach</Button>
          </div>
        </div>
        
        <div className="mb-8">
          <ReneuCompassCard 
            progress={compassProgress}
            userData={userCompassData}
          />
        </div>
        
        <div className="mb-8">
          <GoalCoachRecommendations 
            goals={renewalGoals} 
            recommendedCoaches={recommendedCoaches} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Upcoming Sessions</p>
                  <p className="text-3xl font-bold mt-1">3</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Link to="#upcoming" className="flex items-center mt-4 text-sm text-primary">
                <span>View schedule</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Active Goals</p>
                  <p className="text-3xl font-bold mt-1">3</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span className="font-medium">{currentGoalProgress}%</span>
                </div>
                <Progress value={currentGoalProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Total Sessions</p>
                  <p className="text-3xl font-bold mt-1">12</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-muted-foreground">
                <span>18 hours of coaching</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Next Session</h2>
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={upcomingSessions[0].coachImage} 
                      alt={upcomingSessions[0].coachName}
                      className="h-16 w-16 rounded-full object-cover border-2 border-background"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-background"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{upcomingSessions[0].coachName}</h3>
                    <p className="text-sm text-muted-foreground">{upcomingSessions[0].type}</p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center md:items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{upcomingSessions[0].date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{upcomingSessions[0].time}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-end gap-3">
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Prep Notes
                  </Button>
                  <Button className="premium-button">
                    <Video className="mr-2 h-4 w-4" />
                    Join Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="goals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="goals">
              <Compass className="mr-2 h-4 w-4" />
              My Goals
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <Calendar className="mr-2 h-4 w-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="coaches">
              <Users className="mr-2 h-4 w-4" />
              My Coaches
            </TabsTrigger>
            <TabsTrigger value="resources">
              <FileUp className="mr-2 h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Development Goals</h2>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Goal
              </Button>
            </div>
            
            {developmentGoals.map((goal) => (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge variant={goal.progress > 50 ? "default" : "outline"}>
                      {goal.progress}% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4">
                    <Progress value={goal.progress} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Started: {goal.startDate}</span>
                      <span>Target: {goal.targetDate}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Milestones</h4>
                    <ul className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <li key={milestone.id} className="flex items-start gap-2">
                          {milestone.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <span className={milestone.completed ? "line-through text-muted-foreground" : ""}>
                            {milestone.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Coach: {goal.coach}</span>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="sessions" className="space-y-6">
            <div id="upcoming">
              <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex gap-4">
                        <img 
                          src={session.coachImage} 
                          alt={session.coachName}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{session.coachName}</h3>
                          <p className="text-sm text-muted-foreground">{session.type}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button size="sm" asChild>
                            <Link to={`/session/${session.id}`}>
                              {session.date === 'Today' ? 'Join' : 'View'}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-bold mb-4">Past Sessions</h2>
              <div className="bg-card rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Coach</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Resources</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={session.coachImage} 
                              alt={session.coachName}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <span>{session.coachName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{session.type}</TableCell>
                        <TableCell>
                          <div>
                            <div>{session.date}</div>
                            <div className="text-xs text-muted-foreground">{session.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {session.hasRecording && (
                              <Badge variant="outline" className="bg-primary/10 border-primary/20">
                                Recording
                              </Badge>
                            )}
                            {session.hasNotes && (
                              <Badge variant="outline" className="bg-primary/10 border-primary/20">
                                Notes
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/session/${session.id}`}>
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">View All Sessions</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="coaches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">My Coaching Team</h2>
              <Button variant="outline">Find More Coaches</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myCoaches.map((coach) => (
                <Card key={coach.id} className="overflow-hidden">
                  <div className="aspect-[3/1] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className="text-white">
                        <h3 className="font-bold text-lg">{coach.name}</h3>
                        <p className="text-white/80 text-sm">{coach.focus}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="text-white border border-white/20 bg-black/30 backdrop-blur-sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium">Next Session</p>
                        <p className="text-sm text-muted-foreground">{coach.nextSession}</p>
                      </div>
                      <div className="flex">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">Message</Button>
                      <Button size="sm" asChild>
                        <Link to={`/coaches/${coach.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Resources & Materials</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload
                </Button>
                <Button variant="outline">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Progress Reports
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Worksheets</CardTitle>
                  <CardDescription>Materials shared by your coaches</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    <li className="flex items-center justify-between p-4 hover:bg-muted">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Leadership Self-Assessment</p>
                          <p className="text-xs text-muted-foreground">Shared by Dr. Sarah Johnson • 2 days ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Download</Button>
                    </li>
                    <li className="flex items-center justify-between p-4 hover:bg-muted">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Career Planning Worksheet</p>
                          <p className="text-xs text-muted-foreground">Shared by Mark Williams • 1 week ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Download</Button>
                    </li>
                    <li className="flex items-center justify-between p-4 hover:bg-muted">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Stress Management Guide</p>
                          <p className="text-xs text-muted-foreground">Shared by Emily Chen • 2 weeks ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Download</Button>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  <Button variant="ghost">View All Resources</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your progress and milestones</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    <li className="flex items-center gap-3 p-4 hover:bg-muted">
                      <div className="p-2 bg-green-500/10 rounded">
                        <Award className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Public Speaking - Level 1</p>
                        <p className="text-xs text-muted-foreground">Completed 1 week ago</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-4 hover:bg-muted">
                      <div className="p-2 bg-amber-500/10 rounded">
                        <CheckCircle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium">10 Hours of Coaching</p>
                        <p className="text-xs text-muted-foreground">Milestone reached 2 weeks ago</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-4 hover:bg-muted">
                      <div className="p-2 bg-blue-500/10 rounded">
                        <Award className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Strategic Planning - Intermediate</p>
                        <p className="text-xs text-muted-foreground">Completed 3 weeks ago</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  <Button variant="ghost">View All Achievements</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClientDashboard;

