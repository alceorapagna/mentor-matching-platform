
import React from 'react';
import CoachCategorySection from '@/components/coaches/CoachCategorySection';
import { Coach } from '@/types/coach';

interface CoachesContentProps {
  getReneuCoaches: () => Coach[];
  getBusinessCoaches: () => Coach[];
  getMindCoaches: () => Coach[];
  getBodyCoaches: () => Coach[];
  selectedCategory: string;
}

export const CoachesContent = ({
  getReneuCoaches,
  getBusinessCoaches,
  getMindCoaches,
  getBodyCoaches,
  selectedCategory
}: CoachesContentProps) => {
  return (
    <div className="space-y-16">
      {(selectedCategory === 'all' || selectedCategory === 'reneu') && (
        <CoachCategorySection
          title="Your Reneu Coach"
          description="Your dedicated Reneu coach is a certified professional capable of guiding you through your overall renewal journey, encompassing all aspects of work, mind, and body."
          badgeText="Holistic Support"
          badgeClassName="bg-primary/10 border-primary/40"
          coaches={getReneuCoaches()}
          isSingleCoach={true}
        />
      )}

      {(selectedCategory === 'all' || selectedCategory === 'business') && (
        <CoachCategorySection
          title="Your Professional Coaches"
          description="These specialists provide focused support for your professional goals, career advancement, leadership development, and work-related challenges."
          badgeText="Professional Goals"
          badgeClassName="bg-amber-50 text-amber-700 border-amber-200"
          coaches={getBusinessCoaches()}
          allowAddMore={true}
        />
      )}

      {(selectedCategory === 'all' || selectedCategory === 'mind') && (
        <CoachCategorySection
          title="Your Mental Coaches"
          description="These specialists focus on supporting your mental wellbeing, emotional resilience, stress management, and personal growth."
          badgeText="Mental Wellbeing"
          badgeClassName="bg-purple-50 text-purple-700 border-purple-200"
          coaches={getMindCoaches()}
          allowAddMore={true}
        />
      )}

      {(selectedCategory === 'all' || selectedCategory === 'body') && (
        <CoachCategorySection
          title="Your Physical Coaches"
          description="These specialists focus on physical wellness, nutrition, fitness, energy management, and establishing healthy habits."
          badgeText="Physical Wellness"
          badgeClassName="bg-green-50 text-green-700 border-green-200"
          coaches={getBodyCoaches()}
          allowAddMore={true}
        />
      )}
    </div>
  );
};
