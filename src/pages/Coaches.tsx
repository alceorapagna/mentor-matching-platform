
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

// Sample coach data
const coachesData = [
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
  },
];

const Coaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Coach</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our network of certified coaches across various specializations to find the perfect match for your goals.
          </p>
        </div>
        
        {/* Search and filter section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search by name, specialization, or keyword..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border rounded-lg mb-6 animate-fade-in">
              <div>
                <h3 className="font-medium mb-3">Specialization</h3>
                <div className="space-y-2">
                  {['Business', 'Life', 'Career', 'Leadership', 'Sports', 'Nutrition', 'Mental', 'Executive', 'Wellness'].map((spec) => (
                    <div key={spec} className="flex items-center space-x-2">
                      <Checkbox id={`spec-${spec.toLowerCase()}`} />
                      <label
                        htmlFor={`spec-${spec.toLowerCase()}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {spec}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider 
                    defaultValue={[0, 200]} 
                    max={200} 
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        {rating}+ <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="availability-weekends" />
                    <label
                      htmlFor="availability-weekends"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Weekends
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="availability-evenings" />
                    <label
                      htmlFor="availability-evenings"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Evenings
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="availability-next-week" />
                    <label
                      htmlFor="availability-next-week"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Available next week
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-background">
              All Coaches
            </Badge>
            <Badge variant="outline" className="bg-background hover:bg-primary/10 cursor-pointer">
              Business
            </Badge>
            <Badge variant="outline" className="bg-background hover:bg-primary/10 cursor-pointer">
              Life
            </Badge>
            <Badge variant="outline" className="bg-background hover:bg-primary/10 cursor-pointer">
              Career
            </Badge>
            <Badge variant="outline" className="bg-background hover:bg-primary/10 cursor-pointer">
              Sports
            </Badge>
            <Badge variant="outline" className="bg-background hover:bg-primary/10 cursor-pointer">
              Nutrition
            </Badge>
            <Badge variant="outline" className="bg-background hover:bg-primary/10 cursor-pointer">
              Mental
            </Badge>
          </div>
        </div>
        
        {/* Coaches grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coachesData.map((coach) => (
            <Link 
              to={`/coaches/${coach.id}`} 
              key={coach.id}
              className="group"
            >
              <div className="border rounded-xl overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={coach.imageSrc} 
                    alt={coach.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center text-white">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{coach.rating}</span>
                      <span className="text-xs ml-1">({coach.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{coach.name}</h3>
                  <p className="text-muted-foreground">{coach.title}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3 mb-4">
                    {coach.specializations.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{coach.bio}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${coach.hourlyRate}</span>
                      <span className="text-sm text-muted-foreground">per hour</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination placeholder */}
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
      </div>
    </MainLayout>
  );
};

export default Coaches;
