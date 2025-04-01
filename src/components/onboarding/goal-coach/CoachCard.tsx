
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { CoachCardProps } from "./types";
import { getAvailabilityClass, getAvailabilityText } from "./utils";

const CoachCard = ({ coach }: CoachCardProps) => {
  return (
    <Card key={coach.id} className="overflow-hidden">
      <div className="h-40 relative">
        <img 
          src={coach.imageSrc} 
          alt={coach.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 text-white">
          <h4 className="font-semibold">{coach.name}</h4>
          <p className="text-xs">{coach.title}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span className="font-medium">{coach.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({coach.reviewCount})</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {coach.specialty.slice(0, 2).map((spec) => (
            <Badge key={spec} variant="secondary" className="font-normal text-xs">
              {spec}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between mt-2">
          <Badge 
            variant="outline" 
            className={getAvailabilityClass(coach.availability)}
          >
            {getAvailabilityText(coach.availability)}
          </Badge>
          
          <Button size="sm" asChild>
            <Link to={`/coaches/${coach.id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoachCard;
