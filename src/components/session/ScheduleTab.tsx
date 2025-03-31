
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const ScheduleTab = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">Next Sessions</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <CalendarIcon className="h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : "Select Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            <li className="p-3 hover:bg-muted">
              <p className="font-medium">Next Session</p>
              <p className="text-sm">Tuesday, Nov 8th, 2023</p>
              <p className="text-xs text-muted-foreground">3:00 PM - 4:00 PM</p>
            </li>
            <li className="p-3 hover:bg-muted">
              <p className="font-medium">Follow-up Session</p>
              <p className="text-sm">Tuesday, Nov 15th, 2023</p>
              <p className="text-xs text-muted-foreground">3:00 PM - 4:00 PM</p>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Button className="w-full">Schedule New Session</Button>
    </div>
  );
};

export default ScheduleTab;
