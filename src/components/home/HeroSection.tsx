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
              <Stat label="Work" value="Career" icon={<Briefcase className="h-5 w-5 text-blue-500" />} />
              <Stat label="Mind" value="Wellness" icon={<Brain className="h-5 w-5 text-purple-500" />} />
              <Stat label="Body" value="Health" icon={<Dumbbell className="h-5 w-5 text-green-500" />} />
            </div>
          </div>
          
          {/* Right Image/Illustration - Reneu Framework */}
          <div className="lg:w-1/2 relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-scale-in">
              <div className="bg-[#1d4c4f] p-8 aspect-square flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full h-auto">
                  {/* Large background circles */}
                  <circle cx="200" cy="200" r="190" fill="none" stroke="#2a5c5f" strokeWidth="1" />
                  <circle cx="200" cy="200" r="170" fill="none" stroke="#2a5c5f" strokeWidth="1" />
                  
                  {/* Center text area */}
                  <g className="text-center">
                    <text x="200" y="180" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">KNOWLEDGE &</text>
                    <text x="200" y="200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">COMMUNITY</text>
                    <text x="200" y="225" textAnchor="middle" fill="white" fontSize="12">Grow with</text>
                    <text x="200" y="245" textAnchor="middle" fill="white" fontSize="12">like-minded and</text>
                    <text x="200" y="265" textAnchor="middle" fill="white" fontSize="12">inspiring people</text>
                  </g>

                  {/* Mind Circle */}
                  <g transform="translate(200, 80)">
                    <circle r="40" fill="#1d4c4f" stroke="white" strokeWidth="2" />
                    <Brain color="white" size={30} x="-15" y="-15" />
                    <text y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">MIND</text>
                    <text y="-50" textAnchor="middle" fill="white" fontSize="10" width="100">
                      <tspan x="0">Know how your mind & body</tspan>
                      <tspan x="0" dy="15">work, and learn new</tspan>
                      <tspan x="0" dy="15">professional skills</tspan>
                    </text>
                  </g>

                  {/* Work Circle */}
                  <g transform="translate(120, 280)">
                    <circle r="40" fill="#1d4c4f" stroke="white" strokeWidth="2" />
                    <Briefcase color="white" size={30} x="-15" y="-15" />
                    <text y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">WORK</text>
                    <text x="-100" y="0" textAnchor="end" fill="white" fontSize="10">A fulfilling job</text>
                    <text x="-100" y="15" textAnchor="end" fill="white" fontSize="10">reduces the</text>
                    <text x="-100" y="30" textAnchor="end" fill="white" fontSize="10">level of stress</text>
                  </g>

                  {/* Body Circle */}
                  <g transform="translate(280, 280)">
                    <circle r="40" fill="#1d4c4f" stroke="white" strokeWidth="2" />
                    <Dumbbell color="white" size={30} x="-15" y="-15" />
                    <text y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">BODY</text>
                    <text x="100" y="0" textAnchor="start" fill="white" fontSize="10">A healthy body</text>
                    <text x="100" y="15" textAnchor="start" fill="white" fontSize="10">strengthens</text>
                    <text x="100" y="30" textAnchor="start" fill="white" fontSize="10">your attitude</text>
                  </g>

                  {/* Connecting lines and relationship descriptions */}
                  <path d="M150 250 L250 250" stroke="white" strokeWidth="1" fill="none" />
                  <text x="200" y="270" textAnchor="middle" fill="white" fontSize="10">
                    Lower job stress drives a healthier body
                  </text>

                  <path d="M160 200 L240 200" stroke="white" strokeWidth="1" fill="none" />
                  <text x="200" y="190" textAnchor="middle" fill="white" fontSize="10">
                    A healthier body increases productivity
                  </text>
                </svg>
              </div>
            </div>
            
            {/* Floating component showing the three dimensions */}
            <div className="absolute -bottom-6 -left-6 glass-card rounded-lg p-4 shadow-lg backdrop-blur-xl animate-slide-up">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-primary" />
                <span className="font-medium">Your Renewal Path</span>
              </div>
              <div className="mt-3 space-y-2">
                <DimensionPill icon={<Briefcase className="h-4 w-4 text-blue-500" />} label="Work Renewal" />
                <DimensionPill icon={<Brain className="h-4 w-4 text-purple-500" />} label="Mind Renewal" />
                <DimensionPill icon={<Dumbbell className="h-4 w-4 text-green-500" />} label="Body Renewal" />
              </div>
            </div>
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

const DimensionPill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">{icon}</div>
    <span className="text-sm">{label}</span>
  </div>
);

export default HeroSection;
