
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Clock } from 'lucide-react';

export interface CoachCardProps {
  id: string;
  name: string;
  title: string;
  specialty?: string[];
  rating: number;
  reviewCount: number;
  imageSrc: string;
  availability?: 'high' | 'medium' | 'low';
  category?: 'reneu' | 'business' | 'mind' | 'body';
  pricingModel?: 'custom' | 'packages';
  packages?: {
    basic?: string;
    standard?: string;
    premium?: string;
  };
  nextSession?: {
    date: string;
    time: string;
  };
}

export function CoachCard({
  id,
  name,
  title,
  specialty = [],
  rating,
  reviewCount,
  imageSrc,
  availability = 'medium',
  category,
  pricingModel = 'custom',
  packages,
  nextSession
}: CoachCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryBadge = () => {
    if (!category) return null;
    
    switch (category) {
      case 'reneu':
        return (
          <Badge className="absolute top-4 left-4 bg-primary/20 text-primary border-primary/20 backdrop-blur-sm">
            Reneu Coach
          </Badge>
        );
      case 'business':
        return (
          <Badge className="absolute top-4 left-4 bg-amber-500/20 text-amber-700 border-amber-200 backdrop-blur-sm">
            Business Coach
          </Badge>
        );
      case 'mind':
        return (
          <Badge className="absolute top-4 left-4 bg-purple-500/20 text-purple-700 border-purple-200 backdrop-blur-sm">
            Mental Coach
          </Badge>
        );
      case 'body':
        return (
          <Badge className="absolute top-4 left-4 bg-green-500/20 text-green-700 border-green-200 backdrop-blur-sm">
            Body Coach
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="relative overflow-hidden rounded-xl bg-card border border-border/40 transition-all duration-300 hover:shadow-md hover:border-border/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={`Coach ${name}`} 
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50"></div>
        
        {/* Category Badge */}
        {getCategoryBadge()}
        
        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant="outline" 
            className={`
              ${availability === 'high' ? 'bg-green-500/20 text-green-600 border-green-200' : 
                availability === 'medium' ? 'bg-amber-500/20 text-amber-600 border-amber-200' : 
                'bg-red-500/20 text-red-600 border-red-200'}
              backdrop-blur-sm
            `}
          >
            {availability === 'high' ? 'High Availability' : 
              availability === 'medium' ? 'Medium Availability' : 
              'Limited Availability'}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({reviewCount})</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-muted-foreground mb-3">{title}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {specialty && specialty.map((spec) => (
            <Badge key={spec} variant="secondary" className="font-normal">
              {spec}
            </Badge>
          ))}
        </div>
        
        {/* Next Session Info (if available) */}
        {nextSession && (
          <div className="mb-4 p-3 bg-muted/30 border border-border/50 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">Next Session</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <p>{nextSession.date} at {nextSession.time}</p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-2 pt-4 border-t border-border/30">
          {nextSession && (
            <Button variant="outline" size="sm" className="w-full">
              Join Session
            </Button>
          )}
          <Link to={`/coaches/${id}`} className="w-full">
            <Button 
              size="sm" 
              className="w-full relative overflow-hidden premium-button"
            >
              {nextSession ? "Schedule New Session" : "View Profile"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
