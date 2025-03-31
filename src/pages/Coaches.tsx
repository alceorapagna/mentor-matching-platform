import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SearchAndFilter from '@/components/coaches/SearchAndFilter';
import { CoachesHeader } from '@/components/coaches/CoachesHeader';
import { CoachesContent } from '@/components/coaches/CoachesContent';
import { CoachPagination } from '@/components/coaches/CoachPagination';
import { NoCoachesFound } from '@/components/coaches/NoCoachesFound';
import { coachesData } from '@/data/coachesData';
import { Coach } from '@/types/coach';

const Coaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
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
        
        {filteredCoaches.length > 0 ? (
          <>
            <CoachesContent 
              getReneuCoaches={getReneuCoaches}
              getBusinessCoaches={getBusinessCoaches}
              getMindCoaches={getMindCoaches}
              getBodyCoaches={getBodyCoaches}
              selectedCategory={selectedCategory}
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
    </MainLayout>
  );
};

export default Coaches;
