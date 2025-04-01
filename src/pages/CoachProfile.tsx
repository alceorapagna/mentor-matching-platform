
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Components
import ProfileHeader from '@/components/coach-profile/ProfileHeader';
import PackagesTab from '@/components/coach-profile/PackagesTab';
import BookingTab from '@/components/coach-profile/BookingTab';
import AboutTab from '@/components/coach-profile/AboutTab';
import ReviewsTab from '@/components/coach-profile/ReviewsTab';
import ContactDialog from '@/components/coach-profile/ContactDialog';
import ScheduleDialog from '@/components/coach-profile/ScheduleDialog';
import ConfirmDialog from '@/components/coach-profile/ConfirmDialog';

// Hooks and data
import { useCoachProfileState } from '@/hooks/useCoachProfileState';
import { getCoachData } from '@/data/coachProfileData';

const CoachProfile = () => {
  const { id } = useParams();
  const coach = getCoachData(id);
  
  const {
    date,
    setDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    selectedPackage,
    setSelectedPackage,
    showContactDialog,
    setShowContactDialog,
    showScheduleDialog,
    setShowScheduleDialog,
    showConfirmDialog,
    setShowConfirmDialog,
    availableTimeSlots,
    handleSubmitContact,
    handleScheduleIntro,
    handleConfirmSelection,
    handleContactClick,
    handleScheduleClick,
    handleConfirmClick
  } = useCoachProfileState(coach);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader 
          coach={coach} 
          onContactClick={handleContactClick}
          onScheduleClick={handleScheduleClick}
          onConfirmClick={handleConfirmClick}
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
