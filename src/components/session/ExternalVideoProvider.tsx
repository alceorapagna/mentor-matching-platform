
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Video } from 'lucide-react';

interface ExternalVideoProviderProps {
  providerName: string;
  meetingUrl: string;
}

const ExternalVideoProvider = ({
  providerName,
  meetingUrl
}: ExternalVideoProviderProps) => {
  return (
    <Card className="flex flex-col items-center justify-center p-8 bg-muted/30 h-[calc(100vh-20rem)]">
      <Video className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">External {providerName} Meeting</h3>
      <p className="text-muted-foreground mb-4 text-center max-w-md">
        This session is configured to use {providerName}. Click the button below to join the meeting.
      </p>
      <Button size="lg" onClick={() => window.open(meetingUrl, '_blank')}>
        <ExternalLink className="mr-2 h-5 w-5" />
        Join {providerName} Meeting
      </Button>
    </Card>
  );
};

export default ExternalVideoProvider;
