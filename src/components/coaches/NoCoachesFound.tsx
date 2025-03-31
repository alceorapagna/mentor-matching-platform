
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoCoachesFoundProps {
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: number[]) => void;
}

export const NoCoachesFound = ({
  setSearchTerm,
  setSelectedCategory,
  setPriceRange
}: NoCoachesFoundProps) => {
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 200]);
  };

  return (
    <div className="text-center py-12">
      <p className="text-lg text-muted-foreground">No coaches found matching your criteria.</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};
