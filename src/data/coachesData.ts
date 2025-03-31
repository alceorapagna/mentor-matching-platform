
import { Coach } from '@/types/coach';

// Sample coach data with category property and updated pricing model
export const coachesData: Coach[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Business & Leadership Coach',
    rating: 4.9,
    reviewCount: 128,
    specializations: ['Business', 'Leadership', 'Career'],
    imageSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    bio: 'Former Fortune 500 executive with 15+ years experience helping professionals achieve their career goals.',
    category: 'business',
    availability: 'high',
    pricingModel: 'packages',
    packages: {
      basic: '4 Sessions',
      standard: '8 Sessions',
      premium: '12 Sessions + Team Workshop'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Life & Wellness Coach',
    rating: 4.8,
    reviewCount: 94,
    specializations: ['Life', 'Wellness', 'Mindfulness'],
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Certified life coach specializing in stress management, work-life balance, and personal development.',
    category: 'mind',
    availability: 'medium',
    pricingModel: 'packages',
    packages: {
      basic: '4 Sessions',
      standard: '8 Sessions',
      premium: '16 Sessions + Monthly Check-ins'
    }
  },
  {
    id: 3,
    name: 'David Rodriguez',
    title: 'Sports Performance Coach',
    rating: 5.0,
    reviewCount: 56,
    specializations: ['Sports', 'Fitness', 'Performance'],
    imageSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    bio: 'Former Olympic athlete helping sports enthusiasts and professionals reach peak performance.',
    category: 'body',
    availability: 'high',
    pricingModel: 'custom'
  },
  {
    id: 4,
    name: 'Emma Williams',
    title: 'Nutrition & Health Coach',
    rating: 4.7,
    reviewCount: 73,
    specializations: ['Nutrition', 'Health', 'Wellness'],
    imageSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    bio: 'Registered dietitian with a holistic approach to nutrition, health, and sustainable lifestyle changes.',
    category: 'body',
    availability: 'low',
    pricingModel: 'packages',
    packages: {
      basic: '4 Sessions',
      standard: '12 Sessions + Nutrition Plan',
      premium: '24 Sessions + Team Workshops'
    }
  },
  {
    id: 5,
    name: 'James Wilson',
    title: 'Executive Coach',
    rating: 4.9,
    reviewCount: 112,
    specializations: ['Executive', 'Leadership', 'Business'],
    imageSrc: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=200',
    bio: 'Helps executives and leaders develop strategic thinking, improve team dynamics, and drive business results.',
    category: 'business',
    availability: 'medium',
    pricingModel: 'custom'
  },
  {
    id: 6,
    name: 'Aisha Patel',
    title: 'Career Development Coach',
    rating: 4.8,
    reviewCount: 89,
    specializations: ['Career', 'Professional', 'Leadership'],
    imageSrc: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=200',
    bio: 'Specializes in career transitions, personal branding, and professional development strategies.',
    category: 'business',
    availability: 'high',
    pricingModel: 'packages',
    packages: {
      basic: '6 Sessions',
      standard: '12 Sessions + Career Planning',
      premium: 'Unlimited Sessions (3 months) + Team Workshops'
    }
  },
  {
    id: 7,
    name: 'Thomas Reynolds',
    title: 'Reneu Master Coach',
    rating: 5.0,
    reviewCount: 142,
    specializations: ['Holistic', 'Work-Life', 'Wellness', 'Career'],
    imageSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    bio: 'Certified Reneu coach with expertise across all three pillars - work, mind, and body. Specializes in creating personalized renewal journeys.',
    category: 'reneu',
    availability: 'medium',
    pricingModel: 'custom'
  },
  {
    id: 8,
    name: 'Sophia Martinez',
    title: 'Mental Health Coach',
    rating: 4.9,
    reviewCount: 107,
    specializations: ['Stress Management', 'Anxiety', 'Resilience'],
    imageSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
    bio: 'Licensed therapist and mental health coach helping clients develop emotional resilience and mindfulness practices.',
    category: 'mind',
    availability: 'high',
    pricingModel: 'packages',
    packages: {
      basic: '4 Sessions',
      standard: '8 Sessions + Stress Assessment',
      premium: '16 Sessions + Team Resilience Workshop'
    }
  },
  {
    id: 9,
    name: 'Rebecca Lin',
    title: 'Reneu Wellness Coach',
    rating: 4.8,
    reviewCount: 98,
    specializations: ['Holistic', 'Transformation', 'Life Balance'],
    imageSrc: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200',
    bio: 'Dedicated Reneu coach with a comprehensive approach to personal renewal across all dimensions of life.',
    category: 'reneu',
    availability: 'low',
    pricingModel: 'custom'
  }
];
