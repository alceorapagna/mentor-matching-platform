
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import SearchAndFilter from '@/components/coaches/SearchAndFilter';
import CoachCategorySection from '@/components/coaches/CoachCategorySection';
import { Coach } from '@/types/coach';

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

  // Get coaches grouped by category
  const getReneuCoaches = () => getFilteredCoaches().filter(coach => coach.category === 'reneu');
  const getBusinessCoaches = () => getFilteredCoaches().filter(coach => coach.category === 'business');
  const getMindCoaches = () => getFilteredCoaches().filter(coach => coach.category === 'mind');
  const getBodyCoaches = () => getFilteredCoaches().filter(coach => coach.category === 'body');
  
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

          {getFilteredCoaches().length === 0 && (
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
        
        {getFilteredCoaches().length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-1">
              <Button variant="outline" size="icon" disabled>
                <span className="sr-only">Previous page</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </Button>
              <Button variant="outline" size="icon" className="bg-primary/10 border-primary">
                <span className="sr-only">Page 1</span>
                1
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Page 2</span>
                2
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Page 3</span>
                3
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Next page</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Coaches;
