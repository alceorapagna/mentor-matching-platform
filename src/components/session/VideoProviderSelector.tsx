
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Settings, Video, ExternalLink } from 'lucide-react';

export type VideoProvider = 'embedded' | 'zoom' | 'teams' | 'meet';

interface VideoProviderSelectorProps {
  selectedProvider: VideoProvider;
  onSelectProvider: (provider: VideoProvider) => void;
  externalMeetingUrl: string;
  onExternalMeetingUrlChange: (url: string) => void;
}

const VideoProviderSelector = ({
  selectedProvider,
  onSelectProvider,
  externalMeetingUrl,
  onExternalMeetingUrlChange
}: VideoProviderSelectorProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempProvider, setTempProvider] = useState<VideoProvider>(selectedProvider);
  const [tempUrl, setTempUrl] = useState(externalMeetingUrl);

  const handleSaveSettings = () => {
    onSelectProvider(tempProvider);
    onExternalMeetingUrlChange(tempUrl);
    setDialogOpen(false);
  };

  const getProviderLabel = (provider: VideoProvider) => {
    switch (provider) {
      case 'embedded': return 'Reneu (Embedded)';
      case 'zoom': return 'Zoom';
      case 'teams': return 'Microsoft Teams';
      case 'meet': return 'Google Meet';
      default: return 'Select Provider';
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          <span>Video Provider: {getProviderLabel(selectedProvider)}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Video Conference Settings</DialogTitle>
          <DialogDescription>
            Select your preferred video conferencing provider or use an external meeting link.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="provider">Provider</Label>
            <Select 
              value={tempProvider} 
              onValueChange={(value: VideoProvider) => setTempProvider(value)}
            >
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="embedded">Reneu (Embedded)</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
                <SelectItem value="teams">Microsoft Teams</SelectItem>
                <SelectItem value="meet">Google Meet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {tempProvider !== 'embedded' && (
            <div className="grid gap-2">
              <Label htmlFor="meetingUrl">Meeting URL</Label>
              <Input
                id="meetingUrl"
                placeholder={`Enter your ${getProviderLabel(tempProvider)} meeting URL`}
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoProviderSelector;
