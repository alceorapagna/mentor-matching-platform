
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Coach } from '@/types/coach';
import { useToast } from '@/hooks/use-toast';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCoach: Coach | null;
  onSubmit: () => void;
}

export const ContactDialog = ({ 
  open, 
  onOpenChange, 
  selectedCoach, 
  onSubmit 
}: ContactDialogProps) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit();
    setMessage('');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {selectedCoach?.name}</DialogTitle>
          <DialogDescription>
            Send a message to {selectedCoach?.name} to discuss your coaching needs.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={selectedCoach?.imageSrc} 
                alt={selectedCoach?.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{selectedCoach?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedCoach?.title}</p>
            </div>
          </div>
          
          <textarea 
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
