
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SessionsTab = () => {
  return (
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
  );
};

export default SessionsTab;
