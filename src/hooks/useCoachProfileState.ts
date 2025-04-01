import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Coach } from '@/components/coach-profile/types';

export const useCoachProfileState = (coach: Coach) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateUserCoach } = useAuth();
  
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
  
  const handleConfirmSelection = async () => {
    if (!selectedPackage && coach.packages && Object.keys(coach.packages).length > 0) {
      toast({
        title: "Please select a package",
        description: "You need to select a coaching package to continue.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You need to be logged in to add a coach.",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }
      
      // Check if trying to add a Reneu coach when one already exists
      if (coach.category === 'reneu' && (user.hasreneucoach || user.hasReneuCoach)) {
        toast({
          title: "Coach Already Added",
          description: "You already have a Reneu coach on your team. Please remove your current Reneu coach before adding a new one.",
          variant: "destructive"
        });
        setShowConfirmDialog(false);
        return;
      }
      
      // Add coach
      const success = await updateUserCoach(coach.category);
      
      if (success) {
        toast({
          title: "Coach Added",
          description: `${coach.name} has been added to your team.`,
        });
        setShowConfirmDialog(false);
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard?tab=coaches');
        }, 1500);
      }
    } catch (error) {
      console.error("Error confirming coach:", error);
      toast({
        title: "Error",
        description: "There was a problem adding this coach to your team.",
        variant: "destructive"
      });
    }
  };
  
  const handleContactClick = () => {
    setShowContactDialog(true);
    setShowConfirmDialog(false);
  };

  const handleScheduleClick = () => {
    setShowScheduleDialog(true);
  };

  const handleConfirmClick = () => {
    setShowConfirmDialog(true);
  };
  
  return {
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
  };
};
