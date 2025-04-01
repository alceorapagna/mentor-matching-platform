
import { useCoachFilter } from './coaches/useCoachFilter';
import { useCoachPagination } from './coaches/useCoachPagination';
import { useCoachDialogs } from './coaches/useCoachDialogs';
import { useCoachSelection } from './coaches/useCoachSelection';

export const useCoachesPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    showFilters,
    setShowFilters,
    selectedCategory,
    setSelectedCategory,
    filteredCoaches,
    getReneuCoaches: getFilteredReneuCoaches,
    getBusinessCoaches: getFilteredBusinessCoaches,
    getMindCoaches: getFilteredMindCoaches,
    getBodyCoaches: getFilteredBodyCoaches
  } = useCoachFilter();
  
  const {
    currentPage,
    totalPages,
    getPaginatedCoaches,
    handlePageChange
  } = useCoachPagination(filteredCoaches);
  
  const {
    selectedCoach,
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
  } = useCoachDialogs();
  
  const {
    hasCompletedCompass,
    handleConfirmSelection
  } = useCoachSelection();
  
  // Combine the hooks together and return a unified API
  
  const paginatedCoaches = getPaginatedCoaches();
  
  const getReneuCoaches = () => getFilteredReneuCoaches(paginatedCoaches);
  const getBusinessCoaches = () => getFilteredBusinessCoaches(paginatedCoaches);
  const getMindCoaches = () => getFilteredMindCoaches(paginatedCoaches);
  const getBodyCoaches = () => getFilteredBodyCoaches(paginatedCoaches);
  
  const handleConfirmSelectionWrapper = async () => {
    return await handleConfirmSelection(selectedCoach, selectedPackage, navigate);
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
    itemsPerPage: 6, // Hard-coded to match useCoachPagination
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
    handleConfirmSelection: handleConfirmSelectionWrapper
  };
};
