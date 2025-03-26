
import { MapPin, Lightbulb, BarChart } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary inline-block mb-2">Your Renewal Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Reneu Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our guided renewal process helps you transform your professional, mental, and physical wellbeing through a structured approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard 
            number={1}
            title="Map Your Renewal Path"
            description="Define your purpose, values, and desired goals of renewal across work, mind, and body dimensions to establish your personal compass."
            icon={<MapPin className="h-6 w-6" />}
          />
          
          <StepCard 
            number={2}
            title="Gain Personalized Insights"
            description="Access customized opportunities through in-person Reneu Academies and personalized coaching programs tailored to your unique renewal journey."
            icon={<Lightbulb className="h-6 w-6" />}
          />
          
          <StepCard 
            number={3}
            title="Measure & Evolve"
            description="Track your renewal progress with our comprehensive tools and continue evolving in your professional, mental, and physical wellbeing."
            icon={<BarChart className="h-6 w-6" />}
          />
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl bg-white border border-border/40 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat 
              value="92%" 
              label="Renewal Satisfaction" 
              description="Our clients report significant improvements in overall wellbeing"
            />
            
            <Stat 
              value="87%" 
              label="Goal Achievement" 
              description="Of clients achieve their personal renewal objectives"
            />
            
            <Stat 
              value="12,000+" 
              label="Coaching Sessions" 
              description="Successfully completed on our renewal platform"
            />
            
            <Stat 
              value="35+" 
              label="Countries" 
              description="With renewal programs spanning the globe"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ 
  number, 
  title, 
  description, 
  icon 
}: { 
  number: number; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
}) => (
  <div className="relative flex flex-col items-center text-center p-6 rounded-xl bg-white border border-border/40 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300">
    <div className="absolute -top-5 flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-semibold">
      {number}
    </div>
    
    <div className="mt-6 mb-4 p-3 rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Stat = ({ 
  value, 
  label, 
  description 
}: { 
  value: string; 
  label: string; 
  description: string; 
}) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-gradient mb-2">{value}</div>
    <div className="text-lg font-medium mb-2">{label}</div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default HowItWorks;
