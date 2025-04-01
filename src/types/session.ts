
export interface Message {
  id: number;
  sender: 'coach' | 'client';
  text: string;
  time: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  description: string;
}

export interface Survey {
  id: number;
  name: string;
  completed: boolean;
  date: string;
  progress: number;
  questions: number;
}

export interface SessionSummary {
  id: number;
  date: string;
  summary: string;
  keyTakeaways: string[];
}

export interface Goal {
  id: number;
  text: string;
  progress: number;
  category: 'work' | 'mind' | 'body';
  description?: string; // Added description property
}

export interface CompassGoals {
  work: Goal[];
  mind: Goal[];
  body: Goal[];
}

export interface Coach {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  specialty: string[];
  imageSrc: string;
  bio: string;
  category: 'work' | 'mind' | 'body' | 'reneu' | 'business';
  availability?: 'high' | 'medium' | 'low';
  pricingModel?: 'custom' | 'packages';
  packages?: {
    basic?: string;
    standard?: string;
    premium?: string;
  };
}
