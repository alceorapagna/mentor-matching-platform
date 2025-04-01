
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, CalendarClock } from "lucide-react";
import { Coach } from "./types";

interface ScheduleDialogProps {
  coach: Coach;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

const ScheduleDialog = ({ coach, open, onOpenChange, onSubmit }: ScheduleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Intro Session with {coach.name}</DialogTitle>
          <DialogDescription>
            Book a free 30-minute intro session to get to know {coach.name} and discuss your goals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={coach.profileImage} 
                alt={coach.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{coach.name}</h3>
              <p className="text-sm text-muted-foreground">{coach.title}</p>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Preferred Date & Time</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-4 border rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="text-sm font-medium">Select Date</div>
              </div>
              <div className="flex items-center gap-2 p-4 border rounded-lg">
                <CalendarClock className="h-5 w-5 text-primary" />
                <div className="text-sm font-medium">Select Time</div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit} className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
