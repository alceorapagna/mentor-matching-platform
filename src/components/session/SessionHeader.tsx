
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import VideoProviderSelector, { VideoProvider } from '@/components/session/VideoProviderSelector';

interface SessionHeaderProps {
  onShowGoalTracker: () => void;
  videoProvider: VideoProvider;
  onSelectProvider: (provider: VideoProvider) => void;
  externalMeetingUrl: string;
  onExternalMeetingUrlChange: (url: string) => void;
}

const SessionHeader = ({
  onShowGoalTracker,
  videoProvider,
  onSelectProvider,
  externalMeetingUrl,
  onExternalMeetingUrlChange
}: SessionHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
        Coaching Session with Mark Johnson
      </h1>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          onClick={onShowGoalTracker}
          className="gap-2"
        >
          <Target className="h-4 w-4" />
          Track Progress
        </Button>
        <VideoProviderSelector
          selectedProvider={videoProvider}
          onSelectProvider={onSelectProvider}
          externalMeetingUrl={externalMeetingUrl}
          onExternalMeetingUrlChange={onExternalMeetingUrlChange}
        />
      </div>
    </div>
  );
};

export default SessionHeader;
