
import MainLayout from '@/components/layout/MainLayout';
import SearchAndFilter from '@/components/coaches/SearchAndFilter';
import { CoachesHeader } from '@/components/coaches/CoachesHeader';
import { CoachesContent } from '@/components/coaches/CoachesContent';
import { CoachPagination } from '@/components/coaches/CoachPagination';
import { NoCoachesFound } from '@/components/coaches/NoCoachesFound';
import { ContactDialog } from '@/components/coaches/dialogs/ContactDialog';
import { ScheduleDialog } from '@/components/coaches/dialogs/ScheduleDialog';
import { ConfirmDialog } from '@/components/coaches/dialogs/ConfirmDialog';
import { useCoachesPage } from '@/hooks/useCoachesPage';

const Coaches = () => {
  const {
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    showFilters,
    setShowFilters,
    selectedCategory,
    setSelectedCategory,
    currentPage,
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
  } = useCoachesPage();

  const filteredCoachesCount = getReneuCoaches().length +
    getBusinessCoaches().length +
    getMindCoaches().length +
    getBodyCoaches().length;

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <CoachesHeader />
        
        <SearchAndFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        {filteredCoachesCount > 0 ? (
          <>
            <CoachesContent 
              getReneuCoaches={getReneuCoaches}
              getBusinessCoaches={getBusinessCoaches}
              getMindCoaches={getMindCoaches}
              getBodyCoaches={getBodyCoaches}
              selectedCategory={selectedCategory}
              onContactCoach={handleContactCoach}
              onScheduleSession={handleScheduleSession}
              onConfirmCoach={handleConfirmCoach}
              hasCompletedCompass={hasCompletedCompass}
            />
            
            {totalPages > 1 && (
              <CoachPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <NoCoachesFound 
            setSearchTerm={setSearchTerm}
            setSelectedCategory={setSelectedCategory}
            setPriceRange={setPriceRange}
          />
        )}
      </div>
      
      <ContactDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        selectedCoach={selectedCoach}
        onSubmit={handleSubmitContact}
      />
      
      <ScheduleDialog
        open={showScheduleDialog}
        onOpenChange={setShowScheduleDialog}
        selectedCoach={selectedCoach}
        onSubmit={handleScheduleIntro}
      />
      
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        selectedCoach={selectedCoach}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        onSubmit={handleConfirmSelection}
        onContact={() => {
          setShowConfirmDialog(false);
          if (selectedCoach) handleContactCoach(selectedCoach);
        }}
      />
    </MainLayout>
  );
};

export default Coaches;
