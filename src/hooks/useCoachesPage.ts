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
  
  const paginatedCoaches = getPaginatedCoaches();
  
  const getReneuCoaches = () => getFilteredReneuCoaches(paginatedCoaches);
  const getBusinessCoaches = () => getFilteredBusinessCoaches(paginatedCoaches);
  const getMindCoaches = () => getFilteredMindCoaches(paginatedCoaches);
  const getBodyCoaches = () => getFilteredBodyCoaches(paginatedCoaches);
  
  const handleConfirmSelectionWrapper = async () => {
    return await handleConfirmSelection(selectedCoach, selectedPackage);
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
    itemsPerPage: 6,
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
