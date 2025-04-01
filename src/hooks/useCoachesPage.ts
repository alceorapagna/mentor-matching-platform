
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Coach } from '@/types/coach';
import { coachesData } from '@/data/coachesData';

export const useCoachesPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, updateUserCoach } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  
  const itemsPerPage = 6;
  const hasCompletedCompass = user?.compassCompleted || false;
  
  const getFilteredCoaches = () => {
    return coachesData.filter(coach => {
      const matchesSearch = 
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || coach.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredCoaches = getFilteredCoaches();
  const totalPages = Math.ceil(filteredCoaches.length / itemsPerPage);
  
  const getPaginatedCoaches = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCoaches.slice(startIndex, endIndex);
  };

  const getReneuCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'reneu');
  const getBusinessCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'business');
  const getMindCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'mind');
  const getBodyCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'body');
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
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
  
  const handleConfirmSelection = async () => {
    if (!selectedCoach) return;
    
    if (!selectedPackage && selectedCoach?.pricingModel === 'packages') {
      toast({
        title: "Please select a package",
        description: "You need to select a coaching package to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to add a coach.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    try {
      // Check if trying to add a Reneu coach when one already exists
      if (selectedCoach.category === 'reneu' && (user.hasreneucoach || user.hasReneuCoach)) {
        toast({
          title: "Coach Already Added",
          description: "You already have a Reneu coach on your team. Please remove your current Reneu coach before adding a new one.",
          variant: "destructive"
        });
        setShowConfirmDialog(false);
        return;
      }
      
      console.log('Confirming selection of coach:', { 
        coachId: selectedCoach.id,
        coachName: selectedCoach.name,
        coachCategory: selectedCoach.category
      });
      
      // Add specifically this coach by passing both category and coach ID
      const success = await updateUserCoach(selectedCoach.category, selectedCoach.id);
      
      if (success) {
        toast({
          title: "Coach Added to Your Team",
          description: `${selectedCoach?.name} is now part of your coaching team.`,
        });
        
        setShowConfirmDialog(false);
        
        // Use a timeout to ensure the toast is visible before navigation
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

  return {
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    showFilters,
    setShowFilters,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    itemsPerPage,
    totalPages,
    hasCompletedCompass,
    selectedCoach,
    showContactDialog,
    setShowContactDialog,
    showScheduleDialog,
    setShowScheduleDialog,
    showConfirmDialog,
    setShowConfirmDialog,
    selectedPackage,
    setSelectedPackage,
    getReneuCoaches,
    getBusinessCoaches,
    getMindCoaches,
    getBodyCoaches,
    handlePageChange,
    handleContactCoach,
    handleScheduleSession,
    handleConfirmCoach,
    handleSubmitContact,
    handleScheduleIntro,
    handleConfirmSelection
  };
};
