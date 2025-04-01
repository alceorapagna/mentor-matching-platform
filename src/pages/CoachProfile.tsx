
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";

// Components
import ProfileHeader from '@/components/coach-profile/ProfileHeader';
import PackagesTab from '@/components/coach-profile/PackagesTab';
import BookingTab from '@/components/coach-profile/BookingTab';
import AboutTab from '@/components/coach-profile/AboutTab';
import ReviewsTab from '@/components/coach-profile/ReviewsTab';
import ContactDialog from '@/components/coach-profile/ContactDialog';
import ScheduleDialog from '@/components/coach-profile/ScheduleDialog';
import ConfirmDialog from '@/components/coach-profile/ConfirmDialog';

const CoachProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  // Mock data for the coach
  const coach = {
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
        type: 'team-member'
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
        type: 'team-member'
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
        type: 'team'
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
    ]
  };
  
  const handleSubmitContact = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${coach.name}. They will contact you shortly.`,
    });
    setShowContactDialog(false);
  };
  
  const handleScheduleIntro = () => {
    toast({
      title: "Session Scheduled",
      description: `Your intro session with ${coach.name} has been scheduled. Check your email for details.`,
    });
    setShowScheduleDialog(false);
  };
  
  const handleConfirmSelection = () => {
    if (selectedPackage === '' && coach.packages.length > 0) {
      toast({
        title: "Please select a package",
        description: "You need to select a coaching package to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Coach Added to Your Team",
      description: `${coach.name} is now part of your coaching team. You can view them in your dashboard.`,
    });
    
    setShowConfirmDialog(false);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  const handleContactClick = () => {
    setShowContactDialog(true);
    setShowConfirmDialog(false);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader 
          coach={coach} 
          onContactClick={() => setShowContactDialog(true)}
          onScheduleClick={() => setShowScheduleDialog(true)}
          onConfirmClick={() => setShowConfirmDialog(true)}
        />
        
        {/* Tabs */}
        <Tabs defaultValue="packages" className="mb-10">
          <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto">
            <TabsTrigger 
              value="packages" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Packages & Pricing
            </TabsTrigger>
            <TabsTrigger 
              value="booking" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Book a Consultation
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              About
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="packages">
            <PackagesTab 
              coach={coach} 
              selectedPackage={selectedPackage} 
              setSelectedPackage={setSelectedPackage} 
            />
          </TabsContent>
          
          <TabsContent value="booking">
            <BookingTab 
              date={date}
              setDate={setDate}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={setSelectedTimeSlot}
              availableTimeSlots={availableTimeSlots}
            />
          </TabsContent>
          
          <TabsContent value="about">
            <AboutTab coach={coach} />
          </TabsContent>
          
          <TabsContent value="reviews">
            <ReviewsTab coach={coach} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialogs */}
      <ContactDialog 
        coach={coach}
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        onSubmit={handleSubmitContact}
      />
      
      <ScheduleDialog 
        coach={coach}
        open={showScheduleDialog}
        onOpenChange={setShowScheduleDialog}
        onSubmit={handleScheduleIntro}
      />
      
      <ConfirmDialog 
        coach={coach}
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onSubmit={handleConfirmSelection}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        onContactClick={handleContactClick}
      />
    </MainLayout>
  );
};

export default CoachProfile;
