
import { Briefcase, Brain, Dumbbell, TrendingUp, Heart, Puzzle, Scale, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CoachingTypes = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary inline-block mb-2">The Reneu Framework</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Three Dimensions of Renewal</h2>
          <p className="text-muted-foreground">
            Our holistic approach addresses the three key dimensions of personal renewal, helping you transform your life with dedicated coaching support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ReneuDimension 
            icon={<Briefcase className="h-10 w-10" />}
            title="Work Renewal"
            description="Transform your career, develop leadership skills, and find greater purpose and satisfaction in your professional life."
            subAreas={[
              { icon: <TrendingUp />, name: "Career Growth" },
              { icon: <Users />, name: "Leadership" },
              { icon: <Target />, name: "Purpose Finding" }
            ]}
            link="/framework/work"
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          
          <ReneuDimension 
            icon={<Brain className="h-10 w-10" />}
            title="Mind Renewal"
            description="Enhance mental wellness, emotional intelligence, and cognitive abilities to achieve greater clarity and peace of mind."
            subAreas={[
              { icon: <Heart />, name: "Emotional Balance" },
              { icon: <Puzzle />, name: "Cognitive Growth" },
              { icon: <Scale />, name: "Mindfulness" }
            ]}
            link="/framework/mind"
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
          
          <ReneuDimension 
            icon={<Dumbbell className="h-10 w-10" />}
            title="Body Renewal"
            description="Optimize physical health, nutrition, fitness, and overall wellbeing for increased energy and longevity."
            subAreas={[
              { icon: <Dumbbell />, name: "Fitness" },
              { icon: <Heart />, name: "Nutrition" },
              { icon: <Target />, name: "Energy Management" }
            ]}
            link="/framework/body"
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
        </div>
        
        <div className="mt-16 text-center">
          <div className="mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Your Personal Renewal Journey</h3>
            <p className="text-muted-foreground">
              Each journey begins with a dedicated Reneu coach who helps you assess your goals across all three dimensions and coordinates with specialized coaches to create your personalized renewal plan.
            </p>
          </div>
          <Link to="/coaches">
            <Button size="lg">Start Your Journey</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const ReneuDimension = ({ 
  icon, 
  title, 
  description, 
  subAreas,
  link,
  bgColor,
  iconColor
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  subAreas: {icon: React.ReactNode, name: string}[];
  link: string;
  bgColor: string;
  iconColor: string;
}) => (
  <div className="group flex flex-col p-8 rounded-xl border border-border/40 bg-white shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300">
    <div className={`self-center mb-6 p-5 rounded-full ${bgColor} ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    
    <h3 className="text-2xl font-semibold mb-4 text-center group-hover:text-primary transition-colors duration-300">
      {title}
    </h3>
    
    <p className="text-muted-foreground mb-6 text-center">
      {description}
    </p>

    <div className="border-t border-border/30 pt-6 mb-6">
      <h4 className="font-medium mb-3 text-center">Focus Areas</h4>
      <div className="grid grid-cols-1 gap-3">
        {subAreas.map((area, index) => (
          <div key={index} className="flex items-center px-4 py-2 rounded-lg bg-secondary/30">
            <div className={`mr-3 ${iconColor}`}>{area.icon}</div>
            <span className="text-sm font-medium">{area.name}</span>
          </div>
        ))}
      </div>
    </div>
    
    <div className="mt-auto text-center">
      <Link to={link}>
        <Button variant="outline" className="w-full group-hover:bg-primary/10">
          Explore {title}
        </Button>
      </Link>
    </div>
  </div>
);

export default CoachingTypes;
