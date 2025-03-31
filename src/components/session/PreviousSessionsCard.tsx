
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { History } from 'lucide-react';

interface SessionSummary {
  id: number;
  date: string;
  summary: string;
  keyTakeaways: string[];
}

interface PreviousSessionsCardProps {
  previousSessions: SessionSummary[];
}

const PreviousSessionsCard = ({ previousSessions }: PreviousSessionsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <History className="h-5 w-5 mr-2 text-primary" />
          Previous Session Summaries
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {previousSessions.map(session => (
          <div key={session.id} className="border-b pb-4 last:border-0 last:pb-0">
            <h4 className="font-medium">{session.date}</h4>
            <p className="text-sm text-muted-foreground mt-1">{session.summary}</p>
            <div className="mt-2">
              <h5 className="text-sm font-medium">Key Takeaways:</h5>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {session.keyTakeaways.map((takeaway, index) => (
                  <li key={index}>{takeaway}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PreviousSessionsCard;
