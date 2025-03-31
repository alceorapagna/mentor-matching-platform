
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReneuCompassCard from "@/components/onboarding/ReneuCompassCard";
import CompassRequiredForm from "@/components/onboarding/CompassRequiredForm";
import WelcomeSection from "@/components/onboarding/WelcomeSection";
import { Progress } from "@/components/ui/progress";
import { Target, History, BookOpen, Calendar, CheckCircle2 } from "lucide-react";
import { Goal } from "@/types/session";

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [generatedGoals, setGeneratedGoals] = useState<Goal[]>([]);
  
  // Generate goals based on compass data
  useEffect(() => {
    if (user?.compassData) {
      const goals: Goal[] = [];
      
      // Generate Work goals
      if (user.compassData.dimensions.work.notes) {
        goals.push({
          id: 1,
          text: `Work: ${user.compassData.dimensions.work.notes.split('.')[0] || 'Improve professional fulfillment'}`,
          progress: Math.round((user.compassData.dimensions.work.current / 10) * 100),
          category: 'work'
        });
      } else {
        goals.push({
          id: 1,
          text: "Improve leadership communication skills",
          progress: 65,
          category: 'work'
        });
      }

      // Generate Mind goals
      if (user.compassData.dimensions.mind.notes) {
        goals.push({
          id: 2,
          text: `Mind: ${user.compassData.dimensions.mind.notes.split('.')[0] || 'Enhance mental wellbeing'}`,
          progress: Math.round((user.compassData.dimensions.mind.current / 10) * 100),
          category: 'mind'
        });
      } else {
        goals.push({
          id: 2,
          text: "Develop strategic planning capabilities",
          progress: 40,
          category: 'mind'
        });
      }

      // Generate Body goals
      if (user.compassData.dimensions.body.notes) {
        goals.push({
          id: 3,
          text: `Body: ${user.compassData.dimensions.body.notes.split('.')[0] || 'Improve physical health'}`,
          progress: Math.round((user.compassData.dimensions.body.current / 10) * 100),
          category: 'body'
        });
      } else {
        goals.push({
          id: 3,
          text: "Enhance team management and delegation",
          progress: 25,
          category: 'body'
        });
      }
      
      setGeneratedGoals(goals);
    }
  }, [user?.compassData]);
  
  console.log("ClientDashboard user:", user); // Debug log to see the user object
  
  if (!user) {
    return null; // Protected route will handle redirection
  }
  
  // Show the Compass Required form if the user hasn't completed it
  if (user.compassCompleted === false) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <CompassRequiredForm userName={user.firstName} />
        </div>
      </MainLayout>
    );
  }

  // Sample journey data - in a real application, this would come from the backend
  const journeyData = {
    pastSessions: [
      { 
        id: 1, 
        date: "October 15, 2023", 
        title: "Initial Assessment",
        coach: "Mark Johnson",
        summary: "Discussed communication challenges with the team. Identified key areas for improvement including active listening and providing clearer feedback.",
        keyTakeaways: ["Practice active listening", "Document feedback before meetings", "Follow up with team members individually"]
      },
      { 
        id: 2, 
        date: "November 1, 2023", 
        title: "Strategic Planning",
        coach: "Mark Johnson",
        summary: "Reviewed progress on team communication. Explored strategic planning frameworks that can be applied to the upcoming quarterly planning session.",
        keyTakeaways: ["Implement SWOT analysis", "Schedule individual prep meetings", "Create communication plan template"]
      },
    ],
    goals: generatedGoals.length > 0 ? generatedGoals : [
      { id: 1, text: "Improve leadership communication skills", progress: 65, category: 'work' },
      { id: 2, text: "Develop strategic planning capabilities", progress: 40, category: 'mind' },
      { id: 3, text: "Enhance team management and delegation", progress: 25, category: 'body' },
    ],
    upcomingSessions: [
      {
        id: 1,
        date: "November 15, 2023",
        time: "3:00 PM - 4:00 PM",
        title: "Goal Review",
        coach: "Mark Johnson",
      }
    ]
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Welcome section with onboarding steps or dashboard header */}
        <WelcomeSection 
          userName={user.firstName}
          hasCompletedCompass={true}
          compassProgress={{
            hasStarted: true,
            hasCompleted: true,
            percentComplete: 100
          }}
        />
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Full-width Reneu Compass Card */}
            <ReneuCompassCard 
              progress={{
                hasStarted: true,
                hasCompleted: true,
                percentComplete: 100
              }}
              compassData={user.compassData}
              className="w-full"
            />
            
            {/* Goals Progress Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  My Goals & Progress
                </CardTitle>
                <CardDescription>Track your coaching journey and progress towards your goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {journeyData.goals.map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.text}</span>
                      <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <Progress 
                      value={goal.progress} 
                      className="h-2"
                      indicatorColor={
                        goal.progress >= 75 ? "bg-green-500" : 
                        goal.progress >= 40 ? "bg-amber-500" : 
                        "bg-blue-500"
                      } 
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Next Session Card below the compass */}
            <Card>
              <CardHeader>
                <CardTitle>Next Session</CardTitle>
                <CardDescription>Your upcoming coaching session</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-6 text-muted-foreground">
                  No sessions scheduled yet
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>View and manage your scheduled coaching sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  You don't have any upcoming sessions scheduled
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-6">
              {/* Session History Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Session History
                  </CardTitle>
                  <CardDescription>Key insights and takeaways from your past sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {journeyData.pastSessions.length > 0 ? (
                    <div className="space-y-6">
                      {journeyData.pastSessions.map(session => (
                        <div key={session.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-primary" />
                                {session.title}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Calendar className="h-3 w-3" />
                                <span>{session.date}</span>
                                <span>•</span>
                                <span>Coach: {session.coach}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{session.summary}</p>
                          <div>
                            <h5 className="text-sm font-medium flex items-center gap-1 mb-1">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              Key Takeaways:
                            </h5>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                              {session.keyTakeaways.map((takeaway, index) => (
                                <li key={index}>{takeaway}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">
                      No past sessions recorded yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Learning Resources
                </CardTitle>
                <CardDescription>Resources shared by your coach to support your development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-6 text-muted-foreground">
                  No learning resources added yet
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClientDashboard;
