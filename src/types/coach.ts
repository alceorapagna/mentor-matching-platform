
export interface Coach {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  specializations: string[];
  imageSrc: string;
  bio: string;
  category: 'reneu' | 'business' | 'mind' | 'body';
  availability?: 'high' | 'medium' | 'low';
  pricingModel?: 'custom' | 'packages';
  packages?: {
    basic?: string;
    standard?: string;
    premium?: string;
  };
}
