
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History, BookOpen, Calendar, CheckCircle2 } from "lucide-react";
import { SessionSummary } from "@/types/session";

interface SessionHistoryTabProps {
  pastSessions: SessionSummary[];
}

const SessionHistoryTab = ({ pastSessions }: SessionHistoryTabProps) => {
  return (
    <div className="space-y-6">
      {/* Session History Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Session History
          </CardTitle>
          <CardDescription>Key insights and takeaways from your past sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {pastSessions.length > 0 ? (
            <div className="space-y-6">
              {pastSessions.map(session => (
                <div key={session.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Session {session.id}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{session.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{session.summary}</p>
                  <div>
                    <h5 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      Key Takeaways:
                    </h5>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {session.keyTakeaways.map((takeaway, index) => (
                        <li key={index}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-6 text-muted-foreground">
              No past sessions recorded yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionHistoryTab;
