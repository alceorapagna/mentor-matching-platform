
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import SearchAndFilter from '@/components/coaches/SearchAndFilter';
import CoachCategorySection from '@/components/coaches/CoachCategorySection';
import { Coach } from '@/types/coach';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

// Sample coach data with category property
const coachesData: Coach[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Business & Leadership Coach',
    rating: 4.9,
    reviewCount: 128,
    hourlyRate: 120,
    specializations: ['Business', 'Leadership', 'Career'],
    imageSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    bio: 'Former Fortune 500 executive with 15+ years experience helping professionals achieve their career goals.',
    category: 'business',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Life & Wellness Coach',
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 95,
    specializations: ['Life', 'Wellness', 'Mindfulness'],
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Certified life coach specializing in stress management, work-life balance, and personal development.',
    category: 'mind',
  },
  {
    id: 3,
    name: 'David Rodriguez',
    title: 'Sports Performance Coach',
    rating: 5.0,
    reviewCount: 56,
    hourlyRate: 110,
    specializations: ['Sports', 'Fitness', 'Performance'],
    imageSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    bio: 'Former Olympic athlete helping sports enthusiasts and professionals reach peak performance.',
    category: 'body',
  },
  {
    id: 4,
    name: 'Emma Williams',
    title: 'Nutrition & Health Coach',
    rating: 4.7,
    reviewCount: 73,
    hourlyRate: 85,
    specializations: ['Nutrition', 'Health', 'Wellness'],
    imageSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    bio: 'Registered dietitian with a holistic approach to nutrition, health, and sustainable lifestyle changes.',
    category: 'body',
  },
  {
    id: 5,
    name: 'James Wilson',
    title: 'Executive Coach',
    rating: 4.9,
    reviewCount: 112,
    hourlyRate: 150,
    specializations: ['Executive', 'Leadership', 'Business'],
    imageSrc: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=200',
    bio: 'Helps executives and leaders develop strategic thinking, improve team dynamics, and drive business results.',
    category: 'business',
  },
  {
    id: 6,
    name: 'Aisha Patel',
    title: 'Career Development Coach',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 100,
    specializations: ['Career', 'Professional', 'Leadership'],
    imageSrc: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=200',
    bio: 'Specializes in career transitions, personal branding, and professional development strategies.',
    category: 'business',
  },
  {
    id: 7,
    name: 'Thomas Reynolds',
    title: 'Reneu Master Coach',
    rating: 5.0,
    reviewCount: 142,
    hourlyRate: 175,
    specializations: ['Holistic', 'Work-Life', 'Wellness', 'Career'],
    imageSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    bio: 'Certified Reneu coach with expertise across all three pillars - work, mind, and body. Specializes in creating personalized renewal journeys.',
    category: 'reneu',
  },
  {
    id: 8,
    name: 'Sophia Martinez',
    title: 'Mental Health Coach',
    rating: 4.9,
    reviewCount: 107,
    hourlyRate: 125,
    specializations: ['Stress Management', 'Anxiety', 'Resilience'],
    imageSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
    bio: 'Licensed therapist and mental health coach helping clients develop emotional resilience and mindfulness practices.',
    category: 'mind',
  },
  {
    id: 9,
    name: 'Rebecca Lin',
    title: 'Reneu Wellness Coach',
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 160,
    specializations: ['Holistic', 'Transformation', 'Life Balance'],
    imageSrc: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200',
    bio: 'Dedicated Reneu coach with a comprehensive approach to personal renewal across all dimensions of life.',
    category: 'reneu',
  }
];

const Coaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Filter coaches by search term and selected category
  const getFilteredCoaches = () => {
    return coachesData.filter(coach => {
      const matchesSearch = 
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || coach.category === selectedCategory;
      
      const matchesPrice = coach.hourlyRate >= priceRange[0] && coach.hourlyRate <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const filteredCoaches = getFilteredCoaches();
  const totalPages = Math.ceil(filteredCoaches.length / itemsPerPage);
  
  // Get paginated coaches
  const getPaginatedCoaches = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCoaches.slice(startIndex, endIndex);
  };

  // Get coaches grouped by category from the paginated results
  const getReneuCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'reneu');
  const getBusinessCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'business');
  const getMindCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'mind');
  const getBodyCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'body');
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 5; // Maximum number of page links to show
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Coach</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our network of certified coaches across various specializations to find the perfect match for your goals.
          </p>
        </div>
        
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
        
        <div className="space-y-16">
          {(selectedCategory === 'all' || selectedCategory === 'reneu') && (
            <CoachCategorySection
              title="Reneu Coaches"
              description="Our certified Reneu coaches are dedicated professionals capable of guiding you through your overall renewal journey, encompassing all aspects of work, mind, and body."
              badgeText="Holistic Support"
              badgeClassName="bg-primary/10 border-primary/40"
              coaches={getReneuCoaches()}
            />
          )}

          {(selectedCategory === 'all' || selectedCategory === 'business') && (
            <CoachCategorySection
              title="Business Coaches"
              description="Our business coaches provide focused support for your professional goals, career advancement, leadership development, and work-related challenges."
              badgeText="Professional Goals"
              badgeClassName="bg-amber-50 text-amber-700 border-amber-200"
              coaches={getBusinessCoaches()}
            />
          )}

          {(selectedCategory === 'all' || selectedCategory === 'mind') && (
            <CoachCategorySection
              title="Mental Coaches"
              description="Our mental coaches specialize in supporting your mental wellbeing, emotional resilience, stress management, and personal growth."
              badgeText="Mental Wellbeing"
              badgeClassName="bg-purple-50 text-purple-700 border-purple-200"
              coaches={getMindCoaches()}
            />
          )}

          {(selectedCategory === 'all' || selectedCategory === 'body') && (
            <CoachCategorySection
              title="Body Coaches"
              description="Our body coaches focus on physical wellness, nutrition, fitness, energy management, and establishing healthy habits."
              badgeText="Physical Wellness"
              badgeClassName="bg-green-50 text-green-700 border-green-200"
              coaches={getBodyCoaches()}
            />
          )}

          {filteredCoaches.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No coaches found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 200]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
        
        {filteredCoaches.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {generatePaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Coaches;
