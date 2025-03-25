
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CoachCard, CoachCardProps } from '@/components/ui/coach-card';
import { ChevronRight } from 'lucide-react';

// Sample coach data
const coaches: CoachCardProps[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Executive Leadership Coach',
    specialty: ['Business', 'Leadership', 'Career Transition'],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 150,
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    availability: 'high',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Life & Wellness Coach',
    specialty: ['Life Coaching', 'Mindfulness', 'Stress Management'],
    rating: 4.8,
    reviewCount: 93,
    hourlyRate: 120,
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    availability: 'medium',
  },
  {
    id: '3',
    name: 'Rebecca Martinez',
    title: 'Sports Performance Coach',
    specialty: ['Sports', 'Athletes', 'Performance'],
    rating: 4.7,
    reviewCount: 68,
    hourlyRate: 110,
    imageSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    availability: 'high',
  },
  {
    id: '4',
    name: 'David Wilson',
    title: 'Nutrition & Wellness Expert',
    specialty: ['Nutrition', 'Diet Planning', 'Health'],
    rating: 4.9,
    reviewCount: 112,
    hourlyRate: 130,
    imageSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    availability: 'low',
  },
];

// Specialized categories
const categories = [
  'All', 'Business', 'Life Coaching', 'Sports', 'Nutrition', 'Mental Health'
];

const FeaturedCoaches = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm font-medium text-primary inline-block mb-2">Expert Guidance</span>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Coaches</h2>
          </div>
          
          <div className="mt-6 md:mt-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {coaches.map((coach) => (
            <CoachCard key={coach.id} {...coach} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/coaches">
            <Button variant="outline" size="lg" className="group">
              View All Coaches
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoaches;
