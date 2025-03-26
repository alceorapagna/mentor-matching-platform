
export interface Coach {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  specializations: string[];
  imageSrc: string;
  bio: string;
  category: 'reneu' | 'business' | 'mind' | 'body';
}
