
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const CoachesTab = () => {
  const navigate = useNavigate();
  
  // Redirect to the coach dashboard page when this tab is selected
  useEffect(() => {
    // Small timeout to ensure smooth transition
    const redirectTimeout = setTimeout(() => {
      navigate("/coach-dashboard");
    }, 100);
    
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
          <CardDescription>Redirecting to coaches dashboard...</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground">
            Loading your coaching relationships...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesTab;
