
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReneuCompassCard from "@/components/onboarding/ReneuCompassCard";
import CompassRequiredForm from "@/components/onboarding/CompassRequiredForm";

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
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
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.firstName}</h1>
            <p className="text-muted-foreground mt-1">Your renewal journey dashboard</p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="journey">My Journey</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ReneuCompassCard 
                progress={{
                  hasStarted: true,
                  hasCompleted: true,
                  percentComplete: 100
                }}
                className="md:col-span-2"
              />
              
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
            </div>
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
          
          <TabsContent value="journey">
            <Card>
              <CardHeader>
                <CardTitle>My Renewal Journey</CardTitle>
                <CardDescription>Track your progress and goals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  Your journey metrics will appear here as you progress
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
