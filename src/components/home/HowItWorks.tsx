
import { Calendar, Video, MessageSquare, CheckSquare } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary inline-block mb-2">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How MentorMatch Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes it easy to find the perfect coach and start your journey to personal and professional growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StepCard 
            number={1}
            title="Find Your Coach"
            description="Browse profiles of expert coaches and filter by specialty, availability, and price to find your perfect match."
            icon={<CheckSquare className="h-6 w-6" />}
          />
          
          <StepCard 
            number={2}
            title="Schedule a Session"
            description="Book your first session at a time that works for you with our easy-to-use scheduling system."
            icon={<Calendar className="h-6 w-6" />}
          />
          
          <StepCard 
            number={3}
            title="Meet Virtually"
            description="Connect with your coach through our integrated video conferencing system for seamless communication."
            icon={<Video className="h-6 w-6" />}
          />
          
          <StepCard 
            number={4}
            title="Ongoing Support"
            description="Stay connected with your coach between sessions with our messaging system for continuous guidance."
            icon={<MessageSquare className="h-6 w-6" />}
          />
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl bg-white border border-border/40 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat 
              value="97%" 
              label="Client Satisfaction" 
              description="Our clients report high satisfaction with their coaching experience"
            />
            
            <Stat 
              value="85%" 
              label="Goal Achievement" 
              description="Of clients achieve or exceed their intended goals"
            />
            
            <Stat 
              value="10,000+" 
              label="Coaching Sessions" 
              description="Successfully completed on our platform"
            />
            
            <Stat 
              value="30+" 
              label="Countries" 
              description="With coaches and clients spanning the globe"
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
