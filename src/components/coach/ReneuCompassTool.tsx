
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Compass, 
  User, 
  Activity, 
  Brain, 
  Briefcase,
  Heart,
  FileText,
  Save,
  CheckCircle
} from "lucide-react";

interface ClientData {
  id: string;
  name: string;
  email: string;
  assessmentCompleted: boolean;
  discoverySessionCompleted: boolean;
  compassData?: {
    purpose: string;
    coreValues: string[];
    dimensions: {
      work: { current: number; desired: number; notes: string };
      mind: { current: number; desired: number; notes: string };
      body: { current: number; desired: number; notes: string };
    };
    coachingRecommendations: {
      suggestedCoaches: string[];
      suggestedFocus: string[];
      notes: string;
    };
  };
}

// Mock client data
const mockClientData: ClientData = {
  id: "client123",
  name: "Alex Johnson",
  email: "alex@example.com",
  assessmentCompleted: true,
  discoverySessionCompleted: false,
  compassData: {
    purpose: "I believe my purpose is to create positive impact through my work and help others achieve their goals.",
    coreValues: ["Growth", "Compassion", "Balance", "Impact", "Learning"],
    dimensions: {
      work: { 
        current: 5, 
        desired: 8, 
        notes: "Feeling stagnant in current role, looking for more leadership opportunities" 
      },
      mind: { 
        current: 4, 
        desired: 7, 
        notes: "Struggling with work-related stress and finding it hard to disconnect" 
      },
      body: { 
        current: 3, 
        desired: 8, 
        notes: "Inconsistent exercise routine, poor sleep habits" 
      }
    },
    coachingRecommendations: {
      suggestedCoaches: [],
      suggestedFocus: [],
      notes: ""
    }
  }
};

const ReneuCompassTool = () => {
  const [client, setClient] = useState<ClientData>(mockClientData);
  const [activeTab, setActiveTab] = useState("assessment");
  const [selectedDimension, setSelectedDimension] = useState("work");
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSaveRecommendations = () => {
    // In a real app, this would save to the database
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <Compass className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Reneu Compass Tool</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Discovery Session with:</div>
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
            <User className="h-4 w-4" />
            <span className="font-medium">{client.name}</span>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="assessment">
            <FileText className="h-4 w-4 mr-2" />
            Client Assessment
          </TabsTrigger>
          <TabsTrigger value="compass">
            <Compass className="h-4 w-4 mr-2" />
            Compass Evaluation
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <CheckCircle className="h-4 w-4 mr-2" />
            Recommendations
          </TabsTrigger>
        </TabsList>
        
        {/* Client Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Self-Assessment</CardTitle>
              <CardDescription>
                Review the client's Reneu Compass self-assessment before your discovery session.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Purpose Statement</h3>
                  <p className="p-3 bg-muted/30 rounded-md mt-2">
                    {client.compassData?.purpose || "No purpose statement provided"}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Core Values</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {client.compassData?.coreValues.map((value) => (
                      <div key={value} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Dimension Ratings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Briefcase className="h-5 w-5 text-amber-600 mr-2" />
                          <h3 className="font-medium">Work</h3>
                        </div>
                        <div className="text-xl font-bold">
                          {client.compassData?.dimensions.work.current} → {client.compassData?.dimensions.work.desired}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Client Notes:</p>
                      <p className="text-sm p-2 bg-muted/30 rounded">
                        {client.compassData?.dimensions.work.notes}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Brain className="h-5 w-5 text-purple-600 mr-2" />
                          <h3 className="font-medium">Mind</h3>
                        </div>
                        <div className="text-xl font-bold">
                          {client.compassData?.dimensions.mind.current} → {client.compassData?.dimensions.mind.desired}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Client Notes:</p>
                      <p className="text-sm p-2 bg-muted/30 rounded">
                        {client.compassData?.dimensions.mind.notes}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Heart className="h-5 w-5 text-green-600 mr-2" />
                          <h3 className="font-medium">Body</h3>
                        </div>
                        <div className="text-xl font-bold">
                          {client.compassData?.dimensions.body.current} → {client.compassData?.dimensions.body.desired}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Client Notes:</p>
                      <p className="text-sm p-2 bg-muted/30 rounded">
                        {client.compassData?.dimensions.body.notes}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Compass Evaluation Tab */}
        <TabsContent value="compass" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compass Evaluation</CardTitle>
              <CardDescription>
                Deepen the assessment during your discovery session. Take notes and refine the client's goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={selectedDimension} onValueChange={setSelectedDimension}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="work">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Work
                  </TabsTrigger>
                  <TabsTrigger value="mind">
                    <Brain className="h-4 w-4 mr-2" />
                    Mind
                  </TabsTrigger>
                  <TabsTrigger value="body">
                    <Activity className="h-4 w-4 mr-2" />
                    Body
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="work" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Current State Assessment</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Self-Rating: {client.compassData?.dimensions.work.current}/10</span>
                            <span className="text-sm">Goal: {client.compassData?.dimensions.work.desired}/10</span>
                          </div>
                          <Progress 
                            value={client.compassData?.dimensions.work.current ? (client.compassData?.dimensions.work.current * 10) : 0} 
                            className="h-2 mb-4" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="work-coach-assessment">Coach Assessment</Label>
                          <textarea 
                            id="work-coach-assessment"
                            className="min-h-[120px] w-full p-3 rounded-md border" 
                            placeholder="Enter your assessment of the client's current work situation..."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Desired State & Goals</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="work-primary-goals">Primary Goals</Label>
                          <textarea 
                            id="work-primary-goals"
                            className="min-h-[80px] w-full p-3 rounded-md border" 
                            placeholder="What are the client's primary goals in their work life?"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="work-action-steps">Suggested Action Steps</Label>
                          <textarea 
                            id="work-action-steps"
                            className="min-h-[80px] w-full p-3 rounded-md border" 
                            placeholder="What immediate steps can the client take?"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mind" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Current State Assessment</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Self-Rating: {client.compassData?.dimensions.mind.current}/10</span>
                            <span className="text-sm">Goal: {client.compassData?.dimensions.mind.desired}/10</span>
                          </div>
                          <Progress 
                            value={client.compassData?.dimensions.mind.current ? (client.compassData?.dimensions.mind.current * 10) : 0} 
                            className="h-2 mb-4" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="mind-coach-assessment">Coach Assessment</Label>
                          <textarea 
                            id="mind-coach-assessment"
                            className="min-h-[120px] w-full p-3 rounded-md border" 
                            placeholder="Enter your assessment of the client's current mental wellbeing..."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Desired State & Goals</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="mind-primary-goals">Primary Goals</Label>
                          <textarea 
                            id="mind-primary-goals"
                            className="min-h-[80px] w-full p-3 rounded-md border" 
                            placeholder="What are the client's primary goals for mental wellbeing?"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="mind-action-steps">Suggested Action Steps</Label>
                          <textarea 
                            id="mind-action-steps"
                            className="min-h-[80px] w-full p-3 rounded-md border" 
                            placeholder="What immediate steps can the client take?"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="body" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Current State Assessment</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Self-Rating: {client.compassData?.dimensions.body.current}/10</span>
                            <span className="text-sm">Goal: {client.compassData?.dimensions.body.desired}/10</span>
                          </div>
                          <Progress 
                            value={client.compassData?.dimensions.body.current ? (client.compassData?.dimensions.body.current * 10) : 0} 
                            className="h-2 mb-4" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="body-coach-assessment">Coach Assessment</Label>
                          <textarea 
                            id="body-coach-assessment"
                            className="min-h-[120px] w-full p-3 rounded-md border" 
                            placeholder="Enter your assessment of the client's current physical health..."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Desired State & Goals</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="body-primary-goals">Primary Goals</Label>
                          <textarea 
                            id="body-primary-goals"
                            className="min-h-[80px] w-full p-3 rounded-md border" 
                            placeholder="What are the client's primary goals for physical health?"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="body-action-steps">Suggested Action Steps</Label>
                          <textarea 
                            id="body-action-steps"
                            className="min-h-[80px] w-full p-3 rounded-md border" 
                            placeholder="What immediate steps can the client take?"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Journey Recommendations</CardTitle>
                <CardDescription>
                  Recommend specialized coaches and next steps for the client's renewal journey.
                </CardDescription>
              </div>
              <Button 
                variant={isEditing ? "default" : "outline"} 
                size="sm"
                onClick={() => isEditing ? handleSaveRecommendations() : setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                ) : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Recommended Coaches</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select the specialized coaches that would benefit this client's renewal journey.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: "coach1", name: "Dr. Sarah Johnson", type: "Leadership Development" },
                      { id: "coach2", name: "Mark Williams", type: "Career Transition" },
                      { id: "coach3", name: "Emily Chen", type: "Mental Wellness" },
                      { id: "coach4", name: "David Kim", type: "Nutrition & Health" },
                      { id: "coach5", name: "Rachel Patel", type: "Mindfulness" },
                      { id: "coach6", name: "Michael Torres", type: "Fitness & Exercise" }
                    ].map((coach) => (
                      <div 
                        key={coach.id} 
                        className={`p-3 border rounded-md cursor-pointer flex items-center gap-3 ${
                          isEditing ? "hover:bg-muted/50" : ""
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          id={coach.id} 
                          disabled={!isEditing}
                          className="h-4 w-4"
                        />
                        <label htmlFor={coach.id} className={`flex-1 ${isEditing ? "cursor-pointer" : ""}`}>
                          <div className="font-medium">{coach.name}</div>
                          <div className="text-xs text-muted-foreground">{coach.type}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Recommended Focus Areas</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select the priority focus areas for this client.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {[
                      "Leadership Skills", "Work-Life Balance", "Stress Management", 
                      "Career Development", "Communication", "Mental Clarity",
                      "Emotional Intelligence", "Energy Management", "Physical Fitness",
                      "Nutrition", "Sleep Optimization", "Purpose Alignment"
                    ].map((area) => (
                      <div 
                        key={area} 
                        className={`px-3 py-2 border rounded-md flex items-center gap-2 ${
                          isEditing ? "cursor-pointer hover:bg-muted/50" : ""
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          id={`area-${area}`} 
                          disabled={!isEditing}
                          className="h-4 w-4"
                        />
                        <label 
                          htmlFor={`area-${area}`} 
                          className={`text-sm ${isEditing ? "cursor-pointer" : ""}`}
                        >
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Journey Plan</h3>
                  <textarea 
                    className="min-h-[150px] w-full p-3 rounded-md border" 
                    placeholder="Outline the recommended renewal journey plan for this client..."
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReneuCompassTool;
