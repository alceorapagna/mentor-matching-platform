
import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, Phone, Flag } from 'lucide-react';
import ExternalVideoProvider from '@/components/session/ExternalVideoProvider';
import { VideoProvider } from '@/components/session/VideoProviderSelector';

interface VideoAreaProps {
  videoProvider: VideoProvider;
  providerName: string;
  externalMeetingUrl: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onEndCall: () => void;
  onShowGoalTracker: () => void;
}

const VideoArea = ({
  videoProvider,
  providerName,
  externalMeetingUrl,
  isVideoOn,
  isAudioOn,
  onToggleVideo,
  onToggleAudio,
  onEndCall,
  onShowGoalTracker
}: VideoAreaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoProvider === 'embedded') {
      if (videoRef.current) {
        videoRef.current.style.backgroundColor = '#000';
      }
    }
  }, [videoProvider]);
  
  if (videoProvider !== 'embedded') {
    return (
      <ExternalVideoProvider 
        providerName={providerName}
        meetingUrl={externalMeetingUrl}
      />
    );
  }
  
  return (
    <div className="relative bg-muted rounded-lg overflow-hidden h-[calc(100vh-20rem)]">
      <div className="absolute inset-0">
        <video 
          ref={videoRef}
          className={`w-full h-full object-cover ${isVideoOn ? '' : 'hidden'}`}
          autoPlay 
          muted 
        />
        {!isVideoOn && (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-2xl text-white">MJ</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 right-4 w-48 h-32 rounded-lg overflow-hidden border-2 border-background shadow-lg">
        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
          <span className="text-xl text-white">You</span>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-background/90 p-2 rounded-full">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full ${isAudioOn ? '' : 'bg-red-500 text-white hover:bg-red-600'}`}
          onClick={onToggleAudio}
        >
          {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full ${isVideoOn ? '' : 'bg-red-500 text-white hover:bg-red-600'}`}
          onClick={onToggleVideo}
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button 
          variant="destructive" 
          size="icon" 
          className="rounded-full"
          onClick={onEndCall}
        >
          <Phone className="h-5 w-5 rotate-135" />
        </Button>
      </div>
      
      {/* Quick "Update Goals" button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="sm"
          className="bg-background/80 hover:bg-background flex items-center gap-2"
          onClick={onShowGoalTracker}
        >
          <Flag className="h-4 w-4" />
          Update Goals
        </Button>
      </div>
    </div>
  );
};

export default VideoArea;
