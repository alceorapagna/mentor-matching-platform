
export const getCategoryIcon = (category: 'work' | 'mind' | 'body') => {
  switch (category) {
    case 'work':
      return 'h-5 w-5 text-amber-600';
    case 'mind':
      return 'h-5 w-5 text-purple-600';
    case 'body':
      return 'h-5 w-5 text-green-600';
    default:
      return 'h-5 w-5 text-primary';
  }
};

export const getCategoryColor = (category: 'work' | 'mind' | 'body') => {
  switch (category) {
    case 'work':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'mind':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'body':
      return 'text-green-600 bg-green-50 border-green-200';
    default:
      return 'text-primary bg-primary/10 border-primary/20';
  }
};

export const getCategoryTitle = (category: 'work' | 'mind' | 'body') => {
  switch (category) {
    case 'work':
      return 'Work Renewal';
    case 'mind':
      return 'Mind Renewal';
    case 'body':
      return 'Body Renewal';
    default:
      return 'Renewal';
  }
};

export const getAvailabilityClass = (availability?: 'high' | 'medium' | 'low') => {
  return availability === 'high' 
    ? 'bg-green-500/10 text-green-600 border-green-200' 
    : availability === 'medium' 
      ? 'bg-amber-500/10 text-amber-600 border-amber-200' 
      : 'bg-red-500/10 text-red-600 border-red-200';
};

export const getAvailabilityText = (availability?: 'high' | 'medium' | 'low') => {
  return availability === 'high' 
    ? 'High Availability' 
    : availability === 'medium' 
      ? 'Medium Availability' 
      : 'Limited Availability';
};
