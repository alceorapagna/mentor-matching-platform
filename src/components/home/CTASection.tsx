
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="relative z-10 bg-white border border-border/40 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16">
              <span className="text-sm font-medium text-primary inline-block mb-2">
                Start Your Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to transform your life with expert coaching?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of professionals who have accelerated their personal and professional growth through our platform.
              </p>
              
              <ul className="space-y-3 mb-8">
                <BenefitItem text="Access to 500+ verified expert coaches" />
                <BenefitItem text="Seamless scheduling and communication" />
                <BenefitItem text="Integrated video conferencing platform" />
                <BenefitItem text="Flexible payment options and packages" />
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/coaches">
                  <Button size="lg" className="w-full sm:w-auto premium-button">
                    Find Your Coach
                  </Button>
                </Link>
                <Link to="/for-coaches">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto hover-transition">
                    Become a Coach
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:block hidden"></div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Coaching Session" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <span className="mr-3 text-primary">
      <CheckCircle2 className="h-5 w-5" />
    </span>
    <span>{text}</span>
  </li>
);

export default CTASection;
