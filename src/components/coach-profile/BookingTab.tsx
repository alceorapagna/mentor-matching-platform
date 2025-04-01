
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Clock, CalendarIcon } from "lucide-react";

interface BookingTabProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: (timeSlot: string) => void;
  availableTimeSlots: string[];
}

const BookingTab = ({ 
  date, 
  setDate, 
  selectedTimeSlot, 
  setSelectedTimeSlot, 
  availableTimeSlots 
}: BookingTabProps) => {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Schedule a Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-medium mb-4 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Select a Date
          </h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-4 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Available Time Slots
            {date && <span className="ml-2 text-sm text-muted-foreground">
              {format(date, 'EEEE, MMMM do')}
            </span>}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableTimeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTimeSlot === time ? "default" : "outline"}
                className="justify-center"
                onClick={() => setSelectedTimeSlot(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          
          <div className="mt-8">
            <Button 
              disabled={!selectedTimeSlot} 
              className="w-full"
            >
              Confirm Booking
            </Button>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {selectedTimeSlot 
                ? `You're booking a 60-minute session at ${selectedTimeSlot}` 
                : 'Select a time slot to continue'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTab;
