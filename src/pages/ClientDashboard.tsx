
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompassRequiredForm from "@/components/onboarding/CompassRequiredForm";
import WelcomeSection from "@/components/onboarding/WelcomeSection";
import { Goal, SessionSummary } from "@/types/session";
import { generateGoalsFromCompass, getSampleJourneyData } from "@/utils/goalUtils";
import { useLocation } from "react-router-dom";

// Tab components
import OverviewTab from "@/components/dashboard/OverviewTab";
import SessionsTab from "@/components/dashboard/SessionsTab";
import SessionHistoryTab from "@/components/dashboard/SessionHistoryTab";
import ResourcesTab from "@/components/dashboard/ResourcesTab";
import CoachesTab from "@/components/dashboard/CoachesTab";

const ClientDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || "compass-goals");
  const [generatedGoals, setGeneratedGoals] = useState<Goal[]>([]);
  const [journeyData, setJourneyData] = useState<{
    pastSessions: SessionSummary[];
    goals: Goal[];
    upcomingSessions: any[];
  }>({
    pastSessions: [],
    goals: [],
    upcomingSessions: []
  });
  
  // Generate goals based on compass data
  useEffect(() => {
    if (user?.compassData) {
      const goals = generateGoalsFromCompass(user.compassData);
      setGeneratedGoals(goals);
      setJourneyData(getSampleJourneyData(goals));
    } else {
      const defaultGoals = generateGoalsFromCompass();
      setGeneratedGoals(defaultGoals);
      setJourneyData(getSampleJourneyData(defaultGoals));
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
        
        <Tabs defaultValue="compass-goals" value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="compass-goals">Compass & Goals</TabsTrigger>
            <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="coaches">My Coaches</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compass-goals">
            <OverviewTab 
              goals={journeyData.goals} 
              compassData={user.compassData} 
            />
          </TabsContent>
          
          <TabsContent value="sessions">
            <SessionsTab />
          </TabsContent>
          
          <TabsContent value="history">
            <SessionHistoryTab pastSessions={journeyData.pastSessions} />
          </TabsContent>
          
          <TabsContent value="coaches">
            <CoachesTab />
          </TabsContent>
          
          <TabsContent value="resources">
            <ResourcesTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClientDashboard;
