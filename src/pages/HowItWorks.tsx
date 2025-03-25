
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Users, Calendar, Video, MessageSquare, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How MentorMatch Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow these simple steps to find the perfect coach and start your journey
            to personal and professional growth.
          </p>
        </div>
        
        {/* Step-by-step process */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">1. Discover Your Perfect Coach</h2>
                <p className="text-muted-foreground mb-4">
                  Browse through our network of certified coaches across various specializations. 
                  Filter by expertise, experience, rating, and availability to find the perfect match.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Review detailed coach profiles and credentials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Read client testimonials and success stories</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Compare coaching styles and approaches</span>
                  </li>
                </ul>
                <Link to="/coaches">
                  <Button className="group">
                    Browse Coaches
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="bg-muted rounded-xl overflow-hidden h-80 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                  alt="Person browsing coaches" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-muted rounded-xl overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Person scheduling a coaching session" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">2. Schedule Your Session</h2>
                <p className="text-muted-foreground mb-4">
                  Book a session directly through our platform using our intuitive scheduling tool.
                  Choose a time that works for you from your coach's available slots.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Flexible scheduling with time zone support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Manage recurring sessions effortlessly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Receive calendar invites and reminders</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">3. Connect with Your Coach</h2>
                <p className="text-muted-foreground mb-4">
                  Join your coaching sessions through our built-in video conferencing tool.
                  No additional software needed — everything happens right in your browser.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>HD video and crystal-clear audio</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Screen sharing and collaborative tools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>End-to-end encryption for complete privacy</span>
                  </li>
                </ul>
              </div>
              <div className="bg-muted rounded-xl overflow-hidden h-80 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Video conference session" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-muted rounded-xl overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=1000" 
                  alt="Person using messaging" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">4. Continue the Conversation</h2>
                <p className="text-muted-foreground mb-4">
                  Stay connected with your coach between sessions via our secure messaging system.
                  Share updates, ask questions, and receive feedback to maximize your progress.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Exchange messages and files securely</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Track conversation history for reference</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Set and track goals collaboratively</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 5 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">5. Track Your Progress</h2>
                <p className="text-muted-foreground mb-4">
                  Monitor your development with our comprehensive progress tracking tools.
                  Visualize your growth and celebrate milestones along your coaching journey.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Set measurable goals and track achievements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Review session history and notes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Generate progress reports to share with stakeholders</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="group">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="bg-muted rounded-xl overflow-hidden h-80 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000" 
                  alt="Progress tracking dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="border-t border-border/40 pt-16 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-1">
              <h3 className="text-xl font-medium">How do I know which coach is right for me?</h3>
              <p className="text-muted-foreground">
                We recommend starting with our coach matching tool or scheduling a complimentary discovery call with coaches who specialize in your area of interest to find the best fit.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">What if I need to reschedule a session?</h3>
              <p className="text-muted-foreground">
                You can easily reschedule sessions through your dashboard up to 24 hours before the scheduled time without any penalty.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">How long are the coaching sessions?</h3>
              <p className="text-muted-foreground">
                Standard sessions are 50 minutes, but coaches may offer different durations. The length will be clearly displayed when booking your session.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">Can my company sponsor my coaching?</h3>
              <p className="text-muted-foreground">
                Yes, we offer corporate packages where employers can sponsor coaching for their employees. Contact our enterprise team for more information.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary/10 rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of individuals who have achieved their personal and professional goals through MentorMatch coaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/coaches">
              <Button size="lg" variant="default">
                Find Your Coach
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HowItWorks;
