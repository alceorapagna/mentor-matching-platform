
import { Coach } from '@/types/coach';
import { Badge } from '@/components/ui/badge';
import { CoachCard } from '@/components/ui/coach-card';
import { Button } from '@/components/ui/button';
import { Calendar, Check, MessageCircle, PhoneCall, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CoachCategorySectionProps {
  title: string;
  description: string;
  badgeText: string;
  badgeClassName: string;
  coaches: Coach[];
  isSingleCoach?: boolean;
  allowAddMore?: boolean;
  showSessionInfo?: boolean;
  onContactCoach?: (coach: Coach) => void;
  onScheduleSession?: (coach: Coach) => void;
  onConfirmCoach?: (coach: Coach) => void;
  hasCompletedCompass?: boolean;
}

const CoachCategorySection = ({
  title,
  description,
  badgeText,
  badgeClassName,
  coaches,
  isSingleCoach = false,
  allowAddMore = false,
  showSessionInfo = false,
  onContactCoach,
  onScheduleSession,
  onConfirmCoach,
  hasCompletedCompass = false
}: CoachCategorySectionProps) => {
  if (coaches.length === 0) return null;

  // For single coach view, just show the first coach
  const displayCoaches = isSingleCoach ? coaches.slice(0, 1) : coaches;

  // Example of a next session (in a real app, this would come from the backend)
  const nextSession = showSessionInfo ? {
    date: "May 15, 2023",
    time: "10:00 AM"
  } : undefined;

  return (
    <div className={`${title ? 'mb-12' : ''}`}>
      {title && (
        <>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Badge variant="outline" className={badgeClassName}>
              {badgeText}
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            {description}
          </p>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCoaches.map((coach) => (
          <div key={coach.id} className="flex flex-col">
            <CoachCard 
              id={coach.id.toString()} 
              name={coach.name}
              title={coach.title}
              specialty={coach.specializations}
              rating={coach.rating}
              reviewCount={coach.reviewCount}
              imageSrc={coach.imageSrc}
              category={coach.category}
              availability={coach.availability}
              pricingModel={coach.pricingModel}
              packages={coach.packages}
              nextSession={showSessionInfo ? nextSession : undefined}
            />
            
            {/* Action buttons */}
            {hasCompletedCompass && onContactCoach && onScheduleSession && onConfirmCoach && (
              <div className="mt-4 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => onContactCoach(coach)} className="gap-2">
                    <PhoneCall className="h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onScheduleSession(coach)} className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Intro
                  </Button>
                </div>
                <Button onClick={() => onConfirmCoach(coach)} className="gap-2">
                  <Check className="h-4 w-4" />
                  Confirm Coach
                </Button>
              </div>
            )}
          </div>
        ))}
        
        {allowAddMore && (
          <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10 h-full">
            <div className="text-center space-y-4">
              <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium">Add Coach</h3>
              <p className="text-sm text-muted-foreground">Find more professional coaches for your needs</p>
              <Button variant="outline" asChild>
                <Link to="/coaches">Browse Coaches</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachCategorySection;
