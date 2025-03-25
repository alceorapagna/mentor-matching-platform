
import { Badge } from '@/components/ui/badge';
import { QuoteIcon } from 'lucide-react';

export interface TestimonialProps {
  content: string;
  author: {
    name: string;
    title: string;
    imageSrc: string;
  };
  coachingType: string;
}

export function TestimonialCard({ content, author, coachingType }: TestimonialProps) {
  return (
    <div className="glass-card rounded-xl p-6 md:p-8 relative">
      <div className="absolute -top-3 -left-3 text-primary/10">
        <QuoteIcon className="h-12 w-12" />
      </div>
      
      <div className="relative">
        <Badge className="mb-4">{coachingType}</Badge>
        
        <blockquote className="text-lg mb-6">
          "{content}"
        </blockquote>
        
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border border-border">
            <img 
              src={author.imageSrc} 
              alt={author.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="text-sm text-muted-foreground">{author.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
