
export interface Coach {
  id: string | undefined;
  name: string;
  title: string;
  bio: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  experience?: string;
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: string;
  }[];
  languages?: string[];
  location?: string;
  profileImage: string;
  availability: string;
  packages: {
    id: number;
    name: string;
    description: string;
    features: string[];
    type: 'team-member' | 'team';
  }[];
  customSolutions?: string[];
  reviews?: {
    id: number;
    author: string;
    role: string;
    content: string;
    rating: number;
    date: string;
  }[];
}
