
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
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, CalendarClock, ChevronDown } from 'lucide-react';
import { Coach } from '@/types/coach';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCoach: Coach | null;
  onSubmit: () => void;
}

export const ScheduleDialog = ({ 
  open, 
  onOpenChange, 
  selectedCoach, 
  onSubmit 
}: ScheduleDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const { toast } = useToast();
  
  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', 
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];
  
  const handleSubmit = () => {
    if (!date || !time) {
      toast({
        title: "Missing Information",
        description: "Please select both a date and time for your session.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Intro Session with {selectedCoach?.name}</DialogTitle>
          <DialogDescription>
            Book a free 30-minute intro session to get to know {selectedCoach?.name} and discuss your goals.
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
          
          <div className="grid gap-2">
            <Label>Preferred Date & Time</Label>
            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal flex items-center gap-2"
                  >
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    {date ? format(date, 'PPP') : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal flex items-center gap-2"
                  >
                    <CalendarClock className="h-5 w-5 text-primary" />
                    {time || <span>Select time</span>}
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="grid grid-cols-1 gap-1 p-2 max-h-[300px] overflow-y-auto">
                    {availableTimes.map((t) => (
                      <Button
                        key={t}
                        variant="ghost"
                        className={`justify-start ${time === t ? 'bg-secondary' : ''}`}
                        onClick={() => {
                          setTime(t);
                        }}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Schedule Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
