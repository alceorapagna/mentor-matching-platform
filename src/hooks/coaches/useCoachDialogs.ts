
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Coach } from '@/types/coach';

export const useCoachDialogs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  
  const handleContactCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setShowContactDialog(true);
  };
  
  const handleScheduleSession = (coach: Coach) => {
    setSelectedCoach(coach);
    setShowScheduleDialog(true);
  };
  
  const handleConfirmCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setSelectedPackage('');
    setShowConfirmDialog(true);
  };
  
  const handleSubmitContact = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedCoach?.name}. They will contact you shortly.`,
    });
    setShowContactDialog(false);
  };
  
  const handleScheduleIntro = () => {
    toast({
      title: "Session Scheduled",
      description: `Your intro session with ${selectedCoach?.name} has been scheduled. Check your email for details.`,
    });
    setShowScheduleDialog(false);
  };

  return {
    selectedCoach,
    setSelectedCoach,
    showContactDialog,
    setShowContactDialog,
    showScheduleDialog,
    setShowScheduleDialog,
    showConfirmDialog,
    setShowConfirmDialog,
    selectedPackage,
    setSelectedPackage,
    navigate,
    handleContactCoach,
    handleScheduleSession,
    handleConfirmCoach,
    handleSubmitContact,
    handleScheduleIntro
  };
};
