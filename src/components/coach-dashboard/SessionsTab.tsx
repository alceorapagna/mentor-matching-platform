
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const SessionsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Sessions</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Session
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Session Calendar</CardTitle>
          <CardDescription>Manage your upcoming coaching sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-muted/30 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Calendar view will be implemented here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionsTab;
