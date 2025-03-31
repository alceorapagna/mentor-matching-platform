
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Eye, ArrowLeft } from "lucide-react";

// Mock client list data
const CLIENTS = [
  {
    id: "client1",
    name: "Alex Johnson",
    email: "alex@example.com",
    sessionsCompleted: 5,
    lastSession: "2023-11-08",
    goals: [
      "Improve work-life balance",
      "Develop better communication skills",
      "Reduce stress"
    ],
    sessionNotes: [
      { date: "2023-11-08", note: "Discussed communication strategies in team settings. Alex is making good progress with active listening techniques." },
      { date: "2023-10-25", note: "Reviewed stress management techniques. Alex has been implementing daily meditation." }
    ]
  },
  {
    id: "client2",
    name: "Maria Garcia",
    email: "maria@example.com",
    sessionsCompleted: 3,
    lastSession: "2023-11-05",
    goals: [
      "Career transition planning",
      "Building confidence in leadership role"
    ],
    sessionNotes: [
      { date: "2023-11-05", note: "Worked on leadership vision statement. Maria identified key values she wants to embody as a leader." },
      { date: "2023-10-22", note: "Explored career options and created a 6-month action plan." }
    ]
  },
  {
    id: "client3",
    name: "Ravi Patel",
    email: "ravi@example.com",
    sessionsCompleted: 1,
    lastSession: "2023-11-01",
    goals: [
      "Launch new business venture",
      "Improve time management"
    ],
    sessionNotes: [
      { date: "2023-11-01", note: "Initial session. Discussed business concept and identified key challenges. Ravi will work on market research before next session." }
    ]
  },
  {
    id: "client4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    sessionsCompleted: 0,
    lastSession: null,
    goals: [
      "Set career development goals",
      "Improve work relationships"
    ],
    sessionNotes: []
  }
];

interface ClientsTabProps {
  selectedClientId: string | null;
  displayClientDetails: boolean;
  handleViewClient: (clientId: string) => void;
  handleBackToClientList: () => void;
  selectedClients: typeof CLIENTS;
}

const ClientsTab = ({
  selectedClientId,
  displayClientDetails,
  handleViewClient,
  handleBackToClientList,
  selectedClients,
}: ClientsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Clients</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>
      
      {displayClientDetails ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={handleBackToClientList}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Clients
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedClients.map(client => (
              <Card key={client.id} className="overflow-hidden">
                <div className={`h-2 ${client.id === selectedClientId ? 'bg-primary' : 'bg-muted'}`} />
                <CardHeader>
                  <CardTitle className="text-lg">{client.name}'s Profile</CardTitle>
                  <CardDescription>{client.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Sessions Completed</p>
                      <p>{client.sessionsCompleted}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Session</p>
                      <p>{client.lastSession || "No sessions yet"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Goals</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {client.goals.map((goal, index) => (
                        <li key={index} className="text-muted-foreground">
                          <span className="text-foreground">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Recent Session Notes</h4>
                    {client.sessionNotes.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {client.sessionNotes.slice(0, 2).map((note, index) => (
                          <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
                            <p className="font-medium text-sm">{note.date}</p>
                            <p className="text-sm text-muted-foreground">{note.note}</p>
                          </div>
                        ))}
                        {client.sessionNotes.length > 2 && (
                          <Button variant="ghost" size="sm" className="w-full text-sm">
                            View all {client.sessionNotes.length} notes
                          </Button>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No session notes yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Last Session</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CLIENTS.map(client => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.sessionsCompleted}</TableCell>
                    <TableCell>{client.lastSession || "No sessions yet"}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewClient(client.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { CLIENTS };
export default ClientsTab;
