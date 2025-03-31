
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users } from "lucide-react";

const CoachesTab = () => {
  // This is a placeholder component that will redirect to the Coaches page
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
          <p className="text-muted-foreground mb-4">
            You don't have any coaches assigned yet. Find a coach to begin your renewal journey.
          </p>
          <Button asChild>
            <Link to="/coaches">
              <Plus className="mr-2 h-4 w-4" />
              Find a Coach
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesTab;
