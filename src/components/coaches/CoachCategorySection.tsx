
import { Coach } from '@/types/coach';
import { Badge } from '@/components/ui/badge';
import { CoachCard } from '@/components/ui/coach-card';

interface CoachCategorySectionProps {
  title: string;
  description: string;
  badgeText: string;
  badgeClassName: string;
  coaches: Coach[];
}

const CoachCategorySection = ({
  title,
  description,
  badgeText,
  badgeClassName,
  coaches
}: CoachCategorySectionProps) => {
  if (coaches.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Badge variant="outline" className={badgeClassName}>
          {badgeText}
        </Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coaches.map((coach) => (
          <CoachCard 
            key={coach.id} 
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
          />
        ))}
      </div>
    </div>
  );
};

export default CoachCategorySection;
