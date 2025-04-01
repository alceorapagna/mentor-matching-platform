
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, MessageCircle, Calendar, Check } from "lucide-react";
import { Coach } from "./types";

interface ProfileHeaderProps {
  coach: Coach;
  onContactClick: () => void;
  onScheduleClick: () => void;
  onConfirmClick: () => void;
}

const ProfileHeader = ({ coach, onContactClick, onScheduleClick, onConfirmClick }: ProfileHeaderProps) => {
  return (
    <>
      <div className="mb-6">
        <Button variant="ghost" className="pl-0" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Coaches
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-1">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <img 
              src={coach.profileImage} 
              alt={`Coach ${coach.name}`} 
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-green-500/20 text-green-600 backdrop-blur-sm">
                Highly Available
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-500">
                <Star className="fill-amber-400 h-5 w-5" />
                <span className="ml-1 font-medium">{coach.rating}</span>
              </div>
              <span className="text-muted-foreground">({coach.reviewCount} reviews)</span>
            </div>
            <h1 className="text-3xl font-bold">{coach.name}</h1>
            <p className="text-xl text-muted-foreground mb-4">{coach.title}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {coach.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <p className="text-muted-foreground">{coach.bio}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coach.experience && (
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground" />
                <span>{coach.experience} experience</span>
              </div>
            )}
            {coach.location && (
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground" />
                <span>{coach.location}</span>
              </div>
            )}
            {coach.languages && (
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground" />
                <span>Speaks {coach.languages.join(', ')}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-muted-foreground" />
              <span>Video sessions available</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button onClick={onConfirmClick} className="gap-2">
              <Check className="h-4 w-4" />
              Confirm As My Coach
            </Button>
            <Button variant="outline" onClick={onContactClick} className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Contact Coach
            </Button>
            <Button variant="outline" onClick={onScheduleClick} className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Intro
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
