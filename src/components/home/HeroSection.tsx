
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Briefcase, Brain, Dumbbell } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] h-[800px] w-[800px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[30%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-block mb-4 relative">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary animate-bounce-light">
                Holistic Personal Transformation
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block">Begin your journey of</span>
              <span className="text-gradient">renewal today</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl lg:mx-0 mx-auto">
              Transform your life with Reneu's holistic coaching approach. Balance and enhance your work, mind, and body with dedicated coaches guiding your personal renewal journey.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/coaches">
                <Button size="lg" className="w-full sm:w-auto premium-button group">
                  Start Your Renewal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/for-coaches">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto hover-transition"
                >
                  Become a Coach
                </Button>
              </Link>
            </div>
            
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <Stat label="Work" value="Career" icon={<Briefcase className="h-5 w-5 text-reneu-500" />} />
              <Stat label="Mind" value="Wellness" icon={<Brain className="h-5 w-5 text-reneu-500" />} />
              <Stat label="Body" value="Health" icon={<Dumbbell className="h-5 w-5 text-reneu-500" />} />
            </div>
          </div>
          
          {/* Right Image/Illustration */}
          <div className="lg:w-1/2 relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-scale-in">
              <img 
                src="/lovable-uploads/97dd8d6d-87eb-43df-b863-783cf2001c71.png" 
                alt="Reneu Framework" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Removed the floating glass card that was overlapping with the image */}
          </div>
        </div>
      </div>
      
      {/* Wave SVG Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 hidden lg:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,181.3C840,171,960,181,1080,197.3C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

const Stat = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="text-center p-3 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
    <div className="flex justify-center mb-2">{icon}</div>
    <p className="text-lg font-bold">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

// DimensionPill component removed as it's no longer used

export default HeroSection;
