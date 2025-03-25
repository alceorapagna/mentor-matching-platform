
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestimonialCard, TestimonialProps } from '@/components/ui/testimonial-card';

// Sample testimonial data
const testimonials: TestimonialProps[] = [
  {
    content: "Working with my business coach has transformed how I approach leadership. I've developed crucial skills that helped me secure a promotion and lead my team more effectively.",
    author: {
      name: "James Wilson",
      title: "Marketing Director",
      imageSrc: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    coachingType: "Business Coaching"
  },
  {
    content: "My life coach helped me identify what was holding me back and create actionable steps to achieve my goals. I now have better work-life balance and more fulfillment.",
    author: {
      name: "Emma Rodriguez",
      title: "Project Manager",
      imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    coachingType: "Life Coaching"
  },
  {
    content: "The sports coaching I received helped me improve my technique and overcome mental barriers. I've seen significant performance improvements and achieved personal bests.",
    author: {
      name: "Michael Thompson",
      title: "Amateur Athlete",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    coachingType: "Sports Coaching"
  },
  {
    content: "My nutrition coach created a personalized plan that fit my lifestyle. I've developed healthier habits, increased my energy levels, and finally reached my fitness goals.",
    author: {
      name: "Sophia Lee",
      title: "Healthcare Professional",
      imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    coachingType: "Nutrition Coaching"
  },
  {
    content: "The mental coaching I received gave me tools to manage stress and anxiety. I've improved my focus, productivity, and overall mental wellbeing significantly.",
    author: {
      name: "David Garcia",
      title: "Software Engineer",
      imageSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    coachingType: "Mental Coaching"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleTransitionEnd = () => {
        setIsTransitioning(false);
      };
      
      container.addEventListener('transitionend', handleTransitionEnd);
      return () => {
        container.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, []);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary inline-block mb-2">Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground">
            Our coaching services have helped thousands of professionals and individuals transform their lives. Here are some of their stories.
          </p>
        </div>
        
        <div className="relative">
          {/* Desktop View (3 cards) */}
          <div className="hidden lg:block overflow-hidden">
            <div 
              ref={containerRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Tablet View (2 cards) */}
          <div className="hidden md:block lg:hidden overflow-hidden">
            <div className="flex flex-wrap">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <div key={index} className="w-1/2 p-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile View (1 card) */}
          <div className="md:hidden">
            <div className="space-y-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-white shadow-md pointer-events-auto hidden lg:flex"
              onClick={goToPrev}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-white shadow-md pointer-events-auto hidden lg:flex"
              onClick={goToNext}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Dots for mobile and tablet */}
        <div className="flex justify-center mt-8 space-x-2 lg:hidden">
          {[...Array(3)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-primary w-6' 
                  : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
