
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

// Import refactored components
import OverviewTab from "@/components/coach-dashboard/OverviewTab";
import SessionsTab from "@/components/coach-dashboard/SessionsTab";
import ClientsTab from "@/components/coach-dashboard/ClientsTab";
import ResourcesTab from "@/components/coach-dashboard/ResourcesTab";
import SettingsTab from "@/components/coach-dashboard/SettingsTab";
import { getSelectedClients } from "@/components/coach-dashboard/ClientUtils";

const CoachDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [displayClientDetails, setDisplayClientDetails] = useState(false);
  
  if (!user) return null;

  const handleViewClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setDisplayClientDetails(true);
    // Switch to clients tab to show the detailed view
    setActiveTab("clients");
  };

  const handleBackToClientList = () => {
    setDisplayClientDetails(false);
  };

  // Get selected clients based on current selection
  const selectedClients = getSelectedClients(selectedClientId);

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

          <TabsContent value="overview">
            <OverviewTab handleViewClient={handleViewClient} />
          </TabsContent>

          <TabsContent value="sessions">
            <SessionsTab />
          </TabsContent>

          <TabsContent value="clients">
            <ClientsTab 
              selectedClientId={selectedClientId}
              displayClientDetails={displayClientDetails}
              handleViewClient={handleViewClient}
              handleBackToClientList={handleBackToClientList}
              selectedClients={selectedClients}
            />
          </TabsContent>

          <TabsContent value="resources">
            <ResourcesTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CoachDashboard;
