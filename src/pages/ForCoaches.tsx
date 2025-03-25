
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart4, 
  Shield, 
  Star, 
  ArrowRight 
} from 'lucide-react';

const ForCoaches = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Grow Your Coaching Business with MentorMatch
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our network of professional coaches to expand your reach, streamline your operations, and transform more lives while growing your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="group">
                Apply to Join
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/coach-demo">
              <Button size="lg" variant="outline">
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Coaches Choose MentorMatch</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expand Your Reach</h3>
              <p className="text-muted-foreground">
                Gain access to a global network of clients looking for your specific expertise. Our matching algorithm connects you with ideal clients.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Simplified Scheduling</h3>
              <p className="text-muted-foreground">
                Our integrated scheduling system syncs with your calendar, manages appointments, and sends automatic reminders to reduce no-shows.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">
                Get paid on time, every time with our secure payment processing. Set your own rates and choose between session-based or subscription models.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart4 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Client Management</h3>
              <p className="text-muted-foreground">
                Track client progress, store session notes, and manage your entire coaching practice from one intuitive dashboard.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Credibility & Trust</h3>
              <p className="text-muted-foreground">
                Being part of our vetted coach network enhances your professional credibility and helps build trust with potential clients.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Growth</h3>
              <p className="text-muted-foreground">
                Access coach-exclusive resources, join our community of practitioners, and participate in professional development opportunities.
              </p>
            </div>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works for Coaches</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Apply & Get Verified</h3>
              <p className="text-muted-foreground">
                Submit your application with your credentials and coaching specialization. Our team will review and verify your qualifications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Build your professional profile showcasing your expertise, experience, coaching philosophy, and set your pricing structure.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Start Coaching</h3>
              <p className="text-muted-foreground">
                Accept client requests, conduct sessions through our platform, and grow your coaching practice while we handle the technical details.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pricing Plans */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-4 text-center">Transparent Coach Pricing</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            We offer flexible commission structures designed to help coaches of all stages grow their practice.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="text-sm font-medium text-muted-foreground mb-2">STARTER</div>
              <h3 className="text-2xl font-bold mb-1">15% Commission</h3>
              <p className="text-muted-foreground mb-6">For new coaches building their practice</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Basic profile customization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Client matching & scheduling</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Session-based payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Standard video conferencing</span>
                </li>
              </ul>
              
              <Link to="/register">
                <Button variant="outline" className="w-full">Apply Now</Button>
              </Link>
            </div>
            
            <div className="border border-primary rounded-xl p-6 relative shadow-md">
              <div className="absolute top-0 right-0 left-0 h-1 bg-primary rounded-t-xl"></div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded text-xs font-bold">
                MOST POPULAR
              </div>
              
              <div className="text-sm font-medium text-muted-foreground mb-2">PROFESSIONAL</div>
              <h3 className="text-2xl font-bold mb-1">10% Commission</h3>
              <p className="text-muted-foreground mb-6">For established coaches seeking growth</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Advanced profile customization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Priority in search results</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Session & subscription payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>HD video conferencing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Client progress tracking tools</span>
                </li>
              </ul>
              
              <Link to="/register">
                <Button className="w-full">Apply Now</Button>
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="text-sm font-medium text-muted-foreground mb-2">PREMIER</div>
              <h3 className="text-2xl font-bold mb-1">7.5% Commission</h3>
              <p className="text-muted-foreground mb-6">For high-volume experienced coaches</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Featured coach placement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Enterprise client connections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Group coaching capabilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              
              <Link to="/register">
                <Button variant="outline" className="w-full">Apply Now</Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">What Coaches Say About Us</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=200" 
                    alt="Coach testimonial" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Rebecca Alvarez</h4>
                  <p className="text-sm text-muted-foreground">Executive Coach</p>
                </div>
              </div>
              <p className="italic">
                "Joining MentorMatch was the best business decision I've made. My client base has doubled, and the platform handles all the administrative tasks I used to dread."
              </p>
            </div>
            
            <div className="bg-muted p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
                    alt="Coach testimonial" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Marcus Johnson</h4>
                  <p className="text-sm text-muted-foreground">Life Coach</p>
                </div>
              </div>
              <p className="italic">
                "The quality of client matching on MentorMatch is exceptional. I'm connected with clients who are truly aligned with my coaching style and expertise."
              </p>
            </div>
            
            <div className="bg-muted p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                    alt="Coach testimonial" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Elena Sanchez</h4>
                  <p className="text-sm text-muted-foreground">Nutrition Coach</p>
                </div>
              </div>
              <p className="italic">
                "The scheduling and payment systems are flawless. I've eliminated hours of administrative work each week, allowing me to focus on what I love—coaching."
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">What are the requirements to join as a coach?</h3>
              <p className="text-muted-foreground">
                We require professional certification in your coaching field, at least 2 years of coaching experience, and professional references. Our application process includes a video interview and background check.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">How does the payment process work?</h3>
              <p className="text-muted-foreground">
                Clients pay through our secure platform. We handle payment processing, tax documentation, and automatically transfer your earnings (minus the commission) to your account twice a month.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Can I set my own availability?</h3>
              <p className="text-muted-foreground">
                Absolutely! You have complete control over your schedule. Our system syncs with your calendar to only show available slots to potential clients.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">How long does the application process take?</h3>
              <p className="text-muted-foreground">
                The typical application review takes 7-10 business days. Once approved, you can set up your profile and start accepting clients within 24 hours.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Can I bring my existing clients to the platform?</h3>
              <p className="text-muted-foreground">
                Yes! We offer a streamlined onboarding process for your existing clients, and you'll benefit from a reduced commission rate for clients you bring to the platform.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">What support does MentorMatch provide for coaches?</h3>
              <p className="text-muted-foreground">
                We offer technical support, marketing assistance, professional development resources, and a community of fellow coaches. Premier tier coaches also receive a dedicated account manager.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary/10 rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Coaching Practice?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of successful coaches who have expanded their reach and simplified their business operations with MentorMatch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="group">
                Apply to Join
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/coach-demo">
              <Button size="lg" variant="outline">
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForCoaches;
