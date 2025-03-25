
import { Briefcase, Heart, Dumbbell, Salad, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CoachingTypes = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary inline-block mb-2">Diverse Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Coaching Areas</h2>
          <p className="text-muted-foreground">
            Our platform connects you with expert coaches across multiple disciplines to help you excel in every aspect of your life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <CoachingTypeCard 
            icon={<Briefcase className="h-8 w-8" />}
            title="Business Coaching"
            description="Develop leadership skills, improve business strategies, and advance your career with expert guidance."
            link="/coaches/business"
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          
          <CoachingTypeCard 
            icon={<Heart className="h-8 w-8" />}
            title="Life Coaching"
            description="Find purpose, improve relationships, and achieve personal growth with transformative coaching."
            link="/coaches/life"
            bgColor="bg-pink-50"
            iconColor="text-pink-600"
          />
          
          <CoachingTypeCard 
            icon={<Dumbbell className="h-8 w-8" />}
            title="Sports Coaching"
            description="Enhance your athletic performance, technique, and mental game with specialized sports coaches."
            link="/coaches/sports"
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
          
          <CoachingTypeCard 
            icon={<Salad className="h-8 w-8" />}
            title="Nutrition Coaching"
            description="Optimize your diet, develop healthy eating habits, and reach your wellness goals with expert nutritionists."
            link="/coaches/nutrition"
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          />
          
          <CoachingTypeCard 
            icon={<Brain className="h-8 w-8" />}
            title="Mental Coaching"
            description="Build resilience, manage stress, and improve focus with psychological and mental performance coaching."
            link="/coaches/mental"
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Explore our full range of coaching specialties.
          </p>
          <Link to="/coaches">
            <Button size="lg">View All Specialties</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const CoachingTypeCard = ({ 
  icon, 
  title, 
  description, 
  link,
  bgColor,
  iconColor
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  link: string;
  bgColor: string;
  iconColor: string;
}) => (
  <Link 
    to={link} 
    className="group flex flex-col items-center text-center p-6 rounded-xl border border-border/40 bg-white shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300"
  >
    <div className={`mb-4 p-4 rounded-full ${bgColor} ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    
    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
      {title}
    </h3>
    
    <p className="text-muted-foreground mb-4">
      {description}
    </p>
    
    <div className="mt-auto pt-4 text-primary font-medium group-hover:underline">
      Explore Coaches
    </div>
  </Link>
);

export default CoachingTypes;
