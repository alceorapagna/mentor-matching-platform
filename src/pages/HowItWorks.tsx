
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Lightbulb, 
  BarChart, 
  Users, 
  Brain, 
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorks = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Renewal Journey</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our three-step renewal process to transform your professional, mental, and physical wellbeing 
            through a purposeful and guided approach.
          </p>
        </div>
        
        {/* Step-by-step process */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">1. Map Your Purpose, Values & Goals</h2>
                <p className="text-muted-foreground mb-4">
                  Begin your renewal journey by mapping your purpose, values, and desired goals across 
                  three key dimensions: work, mind, and body. This personalized compass becomes your guide to transformation.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Complete your Reneu Compass assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Define your core values and purpose</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Set meaningful renewal goals across all dimensions</span>
                  </li>
                </ul>
                <Link to="/reneu-compass">
                  <Button className="group">
                    Begin Your Assessment
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg h-80 order-1 md:order-2">
                <img 
                  src="/lovable-uploads/15948167-5c62-4bb1-86d4-85389339d83c.png" 
                  alt="Reneu Compass Framework" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-muted rounded-xl overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1573164574472-797cdf4a583a?auto=format&fit=crop&q=80&w=1000" 
                  alt="Personalized coaching session" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">2. Gain Personalized Insights & Support</h2>
                <p className="text-muted-foreground mb-4">
                  Access tailored opportunities through our in-person Reneu Academies and 
                  personalized coaching programs designed to support your unique renewal journey.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Attend immersive Reneu Academy workshops</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Connect with specialized renewal coaches</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Receive customized guidance and resources</span>
                  </li>
                </ul>
                <Link to="/coaches">
                  <Button className="group">
                    Explore Coaching Options
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">3. Measure Progress & Keep Evolving</h2>
                <p className="text-muted-foreground mb-4">
                  Track your renewal journey with our comprehensive tools and continue evolving in your 
                  professional, mental, and physical wellbeing through ongoing support and resources.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Monitor progress with personalized dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Celebrate milestones in your renewal journey</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>Adjust your path with continuous assessment</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="group">
                    Start Your Journey Today
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="bg-muted rounded-xl overflow-hidden h-80 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Progress tracking and evolution" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Dimensions Section */}
        <div className="border-t border-border/40 pt-16 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">The Three Dimensions of Renewal</h2>
          <Tabs defaultValue="work" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="work">Professional</TabsTrigger>
              <TabsTrigger value="mind">Mental</TabsTrigger>
              <TabsTrigger value="body">Physical</TabsTrigger>
            </TabsList>
            <TabsContent value="work" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Professional Renewal
                  </CardTitle>
                  <CardDescription>Reconnect with your professional purpose and potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Our professional renewal program helps you rediscover meaning in your career, 
                    develop new skills, and align your work with your deeper purpose.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Career mapping and purpose alignment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Leadership and professional skill development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Work-life integration strategies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mind" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Mental Renewal
                  </CardTitle>
                  <CardDescription>Nurture your cognitive and emotional wellbeing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Our mental renewal approach focuses on building resilience, emotional intelligence, 
                    and mindfulness practices to enhance your overall mental wellbeing.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Stress management and resilience building</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Mindfulness and meditation practices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Cognitive performance optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="body" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Physical Renewal
                  </CardTitle>
                  <CardDescription>Revitalize your body and physical energy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Our physical renewal program helps you establish sustainable health routines, 
                    optimize energy levels, and enhance your overall physical wellbeing.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Energy management and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Personalized nutrition and movement plans</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>Sleep quality and recovery strategies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* FAQ Section */}
        <div className="border-t border-border/40 pt-16 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-1">
              <h3 className="text-xl font-medium">How do I start my renewal journey?</h3>
              <p className="text-muted-foreground">
                Begin by taking our Reneu Compass assessment to map your current state and goals across all three dimensions of renewal: professional, mental, and physical.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">What are Reneu Academies?</h3>
              <p className="text-muted-foreground">
                Reneu Academies are immersive in-person workshops where you can connect with experts and peers to gain deeper insights and practical tools for your renewal journey.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">How often should I reassess my renewal progress?</h3>
              <p className="text-muted-foreground">
                We recommend quarterly check-ins with your Reneu Compass to track progress and make adjustments to your renewal journey as needed.
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">Can organizations sponsor renewal programs?</h3>
              <p className="text-muted-foreground">
                Yes, we offer corporate packages where employers can sponsor renewal journeys for their teams. Contact our enterprise team for more information.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary/10 rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Begin Your Renewal Journey Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of individuals who have transformed their professional, mental, and physical wellbeing through our comprehensive renewal approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reneu-compass">
              <Button size="lg" variant="default">
                Start Your Assessment
              </Button>
            </Link>
            <Link to="/coaches">
              <Button size="lg" variant="outline">
                Find a Coach
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HowItWorks;
