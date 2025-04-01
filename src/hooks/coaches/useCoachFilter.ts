
import { useState } from 'react';
import { Coach } from '@/types/coach';
import { coachesData } from '@/data/coachesData';

export const useCoachFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
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
  
  const getReneuCoaches = (paginatedCoaches: Coach[]) => 
    paginatedCoaches.filter(coach => coach.category === 'reneu');
    
  const getBusinessCoaches = (paginatedCoaches: Coach[]) => 
    paginatedCoaches.filter(coach => coach.category === 'business');
    
  const getMindCoaches = (paginatedCoaches: Coach[]) => 
    paginatedCoaches.filter(coach => coach.category === 'mind');
    
  const getBodyCoaches = (paginatedCoaches: Coach[]) => 
    paginatedCoaches.filter(coach => coach.category === 'body');

  return {
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    showFilters,
    setShowFilters,
    selectedCategory,
    setSelectedCategory,
    filteredCoaches,
    getReneuCoaches,
    getBusinessCoaches,
    getMindCoaches,
    getBodyCoaches
  };
};
