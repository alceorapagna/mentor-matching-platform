
import { MessageSquare, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivitySummaryProps {
  totalSessions: number;
  avgEngagement: number;
  avgImpact: number;
}

const OverviewCards = ({ totalSessions, avgEngagement, avgImpact }: ActivitySummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-reneu-500 mr-2" />
            <div className="text-2xl font-bold">{totalSessions}</div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Across all employees</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-reneu-500 mr-2" />
            <div className="text-2xl font-bold">{avgEngagement}%</div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Based on participation</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-reneu-500 mr-2" />
            <div className="text-2xl font-bold">{avgImpact}%</div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Goal achievement progress</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
