
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CoachesTab = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleNavigateToCoachDashboard = () => {
    setIsLoading(true);
    // Navigate directly without timeout
    navigate("/coach-dashboard");
    toast.success("Redirected to Coach Dashboard");
  };
  
  // Attempt to navigate automatically when the tab is displayed
  useEffect(() => {
    // This is kept as a fallback but we'll primarily use the button now
    const redirectTimeout = setTimeout(() => {
      // Don't auto-redirect to avoid confusion if the button is visible
      // navigate("/coach-dashboard");
    }, 300);
    
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            My Coaches
          </CardTitle>
          <CardDescription>View and manage your coaching relationships</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground mb-6">
            Access your coaching sessions and resources in the Coach Dashboard.
          </p>
          <Button 
            onClick={handleNavigateToCoachDashboard}
            disabled={isLoading}
            className="group"
          >
            Go to Coach Dashboard
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesTab;
