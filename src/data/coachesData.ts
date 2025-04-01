
import { Coach } from '@/types/coach';

export const coachesData: Coach[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    title: 'Executive Coach & Leadership Specialist',
    rating: 4.9,
    reviewCount: 127,
    specializations: ['Executive Leadership', 'Career Transitions', 'Stress Management'],
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
    bio: 'With over 15 years of experience in executive coaching, I help professionals unlock their leadership potential.',
    category: 'business',
    availability: 'high',
    pricingModel: 'packages',
    packages: {
      basic: '4 sessions package',
      standard: '8 sessions with assessment',
      premium: 'Enterprise team coaching'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Career Development Strategist',
    rating: 4.7,
    reviewCount: 89,
    specializations: ['Career Planning', 'Interview Preparation', 'Negotiation Skills'],
    imageSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    bio: 'I specialize in helping professionals navigate career transitions and advancement opportunities.',
    category: 'business',
    availability: 'medium',
    pricingModel: 'packages'
  },
  {
    id: 3,
    name: 'Dr. Emily Roberts',
    title: 'Mindfulness & Stress Management Coach',
    rating: 4.8,
    reviewCount: 112,
    specializations: ['Mindfulness', 'Stress Reduction', 'Work-Life Balance'],
    imageSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
    bio: 'I help busy professionals reduce stress and find balance through evidence-based mindfulness practices.',
    category: 'mind',
    availability: 'high',
    pricingModel: 'custom'
  },
  {
    id: 4,
    name: 'David Wilson',
    title: 'Executive Leadership Coach',
    rating: 4.9,
    reviewCount: 94,
    specializations: ['C-Suite Coaching', 'Strategic Leadership', 'Organizational Change'],
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    bio: 'Former Fortune 500 executive helping leaders navigate complex organizational challenges.',
    category: 'business',
    availability: 'low',
    pricingModel: 'packages'
  },
  {
    id: 5,
    name: 'Jessica Patel',
    title: 'Holistic Wellness Coach',
    rating: 4.6,
    reviewCount: 78,
    specializations: ['Nutrition', 'Fitness', 'Sleep Optimization'],
    imageSrc: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    bio: 'I take a holistic approach to wellness, focusing on nutrition, exercise, and lifestyle factors.',
    category: 'body',
    availability: 'medium',
    pricingModel: 'custom'
  },
  {
    id: 6,
    name: 'Dr. Robert Garcia',
    title: 'Leadership Development Specialist',
    rating: 4.8,
    reviewCount: 103,
    specializations: ['Team Leadership', 'Communication Skills', 'Conflict Resolution'],
    imageSrc: 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', 
    bio: 'My evidence-based approach helps leaders develop the skills needed to lead high-performing teams.',
    category: 'business',
    availability: 'high',
    pricingModel: 'packages'
  },
  {
    id: 7,
    name: 'Sophia Lee',
    title: 'Reneu Integration Coach',
    rating: 4.9,
    reviewCount: 135,
    specializations: ['Holistic Coaching', 'Work-Mind-Body Integration', 'Life Purpose'],
    imageSrc: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    bio: 'I help clients integrate all aspects of their lives into a cohesive, purposeful journey.',
    category: 'reneu',
    availability: 'high',
    pricingModel: 'packages'
  },
  {
    id: 8,
    name: 'Mark Thompson',
    title: 'Cognitive Performance Coach',
    rating: 4.7,
    reviewCount: 91,
    specializations: ['Mental Focus', 'Cognitive Enhancement', 'Brain Health'],
    imageSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    bio: 'I specialize in helping professionals optimize their cognitive performance and focus.',
    category: 'mind',
    availability: 'medium',
    pricingModel: 'custom'
  },
  {
    id: 9,
    name: 'Amanda Foster',
    title: 'Athletic Performance Specialist',
    rating: 4.8,
    reviewCount: 86,
    specializations: ['Strength Training', 'Endurance', 'Recovery'],
    imageSrc: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1727&q=80',
    bio: 'Former professional athlete helping busy professionals improve their physical performance.',
    category: 'body',
    availability: 'high',
    pricingModel: 'packages'
  }
];
