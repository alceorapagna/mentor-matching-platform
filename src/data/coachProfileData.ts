
import { Coach } from '@/components/coach-profile/types';

export const getCoachData = (id: string | undefined): Coach => {
  return {
    id: id,
    name: 'Dr. Sarah Johnson',
    title: 'Executive Coach & Leadership Specialist',
    bio: 'With over 15 years of experience in executive coaching, I help professionals unlock their leadership potential and achieve both personal and organizational goals. My approach combines neuroscience, behavioral psychology, and practical business strategies.',
    rating: 4.9,
    reviewCount: 127,
    specialties: ['Executive Leadership', 'Career Transitions', 'Stress Management', 'Team Building', 'Public Speaking'],
    experience: '15+ years',
    education: [
      { degree: 'Ph.D. in Organizational Psychology', institution: 'Stanford University', year: '2008' },
      { degree: 'MBA', institution: 'Harvard Business School', year: '2003' },
    ],
    certifications: [
      { name: 'Certified Professional Coach (CPC)', issuer: 'International Coach Federation', year: '2010' },
      { name: 'Certified Emotional Intelligence Coach', issuer: 'EQ-i 2.0', year: '2012' },
    ],
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
    location: 'San Francisco, CA (Remote Available)',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
    availability: 'high',
    packages: [
      { 
        id: 1, 
        name: 'Basic Package', 
        description: '4 coaching sessions for one team member',
        features: [
          '4 sessions (60 minutes each)',
          'Initial assessment',
          'Basic goal setting',
          'Email support'
        ],
        type: 'team-member' as const
      },
      { 
        id: 2, 
        name: 'Standard Package', 
        description: '8 sessions for one team member plus assessment and planning',
        features: [
          '8 sessions (60 minutes each)',
          'Comprehensive assessment',
          'Detailed development plan',
          'Email and chat support',
          'Monthly progress reports'
        ],
        type: 'team-member' as const
      },
      { 
        id: 3, 
        name: 'Premium Team Package', 
        description: 'Coaching for multiple team members plus team workshops',
        features: [
          'Sessions for up to 5 team members',
          'Bi-weekly team workshops',
          'Leadership assessment for all participants',
          'Customized team development plan',
          'Unlimited support',
          'Detailed analytics and ROI reporting'
        ],
        type: 'team' as const
      }
    ],
    customSolutions: [
      'Enterprise-wide coaching programs',
      'Leadership development for entire departments',
      'Specialized workshops for specific challenges',
      'Integration with existing L&D initiatives'
    ],
    reviews: [
      {
        id: 1,
        author: 'Michael T.',
        role: 'Marketing Director',
        content: 'Dr. Johnson helped me overcome my leadership challenges and build a more cohesive team. Her insights were practical and immediately applicable.',
        rating: 5,
        date: '3 weeks ago'
      },
      {
        id: 2,
        author: 'Jennifer L.',
        role: 'Startup Founder',
        content: 'Working with Sarah was transformative for my business. She helped me clarify my vision and develop the leadership skills needed to grow my company.',
        rating: 5,
        date: '2 months ago'
      },
      {
        id: 3,
        author: 'Robert K.',
        role: 'Senior Project Manager',
        content: 'Sarah provided excellent guidance on navigating a difficult career transition. Her coaching was tailored to my specific needs.',
        rating: 4,
        date: '3 months ago'
      }
    ],
    category: 'business' as const
  };
};
