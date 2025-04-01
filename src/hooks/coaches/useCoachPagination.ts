
import { useState } from 'react';
import { Coach } from '@/types/coach';

export const useCoachPagination = (filteredCoaches: Coach[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(filteredCoaches.length / itemsPerPage);
  
  const getPaginatedCoaches = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCoaches.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    getPaginatedCoaches,
    handlePageChange
  };
};
