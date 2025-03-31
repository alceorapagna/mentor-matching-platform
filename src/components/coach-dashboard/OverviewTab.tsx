
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MessageSquare, Users, Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Mock upcoming sessions data
const UPCOMING_SESSIONS = [
  {
    id: "session1",
    clientName: "Alex Johnson",
    clientId: "client1",
    date: "2023-11-15",
    time: "10:00 AM",
    duration: 60,
    status: "confirmed"
  },
  {
    id: "session2",
    clientName: "Maria Garcia",
    clientId: "client2",
    date: "2023-11-16",
    time: "2:00 PM",
    duration: 45,
    status: "confirmed"
  },
  {
    id: "session3",
    clientName: "Ravi Patel",
    clientId: "client3",
    date: "2023-11-17",
    time: "11:30 AM",
    duration: 60,
    status: "pending"
  }
];

interface OverviewTabProps {
  handleViewClient: (clientId: string) => void;
}

const OverviewTab = ({ handleViewClient }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{UPCOMING_SESSIONS.length}</p>
            <p className="text-sm text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Active Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">4</p>
            <p className="text-sm text-muted-foreground">Total clients</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">3</p>
            <p className="text-sm text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Upcoming Sessions</h2>
      <div className="space-y-4">
        {UPCOMING_SESSIONS.map(session => (
          <Card key={session.id} className="overflow-hidden">
            <div className={`h-2 ${session.status === 'confirmed' ? 'bg-green-500' : 'bg-amber-500'}`} />
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="font-medium">{session.clientName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {session.date} • {session.time} • {session.duration} min
                  </p>
                </div>
                <div className="flex gap-2 mt-3 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewClient(session.clientId)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button size="sm">Join Session</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="flex justify-center mt-4">
          <Button variant="outline">View All Sessions</Button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
