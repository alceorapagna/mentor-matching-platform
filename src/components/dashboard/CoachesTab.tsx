
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";

// Import coach dashboard tabs
import OverviewTab from "@/components/coach-dashboard/OverviewTab";
import SessionsTab from "@/components/coach-dashboard/SessionsTab";
import ClientsTab from "@/components/coach-dashboard/ClientsTab";
import ResourcesTab from "@/components/coach-dashboard/ResourcesTab";
import SettingsTab from "@/components/coach-dashboard/SettingsTab";
import { getSelectedClients } from "@/components/coach-dashboard/ClientUtils";

const CoachesTab = () => {
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
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Coach Dashboard
          </CardTitle>
          <CardDescription>Manage your coaching sessions and clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div>
              <p className="text-muted-foreground mb-4">
                Welcome back! Manage your coaching sessions and clients.
              </p>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesTab;
