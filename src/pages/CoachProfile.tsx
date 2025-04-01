import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Star, Calendar as CalendarIcon, Clock, Video, MapPin, GraduationCap, Award, Briefcase, BookOpen, Languages, Check, MessageCircle, User, Users, FileCheck, Clock3, ArrowLeft, PhoneCall, CalendarClock } from 'lucide-react';

const CoachProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const coach = {
    id: id,
    name: 'Dr. Sarah Johnson',
    title: 'Executive Coach & Leadership Specialist',
    bio: 'With over 15 years of experience in executive coaching, I help professionals unlock their leadership potential and achieve both personal and organizational goals. My approach combines neuroscience, behavioral psychology, and practical business strategies.',
    rating: 4.9,
    reviewCount: 127,
    specialties: ['Executive Leadership', 'Career Transitions', 'Stress Management', 'Team Building', 'Public Speaking'],
    experience: '15+ years',
    education: [
      { degree: 'Ph.D. in Organizational Psychology', institution: 'Stanford University', year: '2008' },
      { degree: 'MBA', institution: 'Harvard Business School', year: '2003' },
    ],
    certifications: [
      { name: 'Certified Professional Coach (CPC)', issuer: 'International Coach Federation', year: '2010' },
      { name: 'Certified Emotional Intelligence Coach', issuer: 'EQ-i 2.0', year: '2012' },
    ],
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
    location: 'San Francisco, CA (Remote Available)',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
    availability: 'high',
    packages: [
      { 
        id: 1, 
        name: 'Basic Package', 
        description: '4 coaching sessions for one team member',
        features: [
          '4 sessions (60 minutes each)',
          'Initial assessment',
          'Basic goal setting',
          'Email support'
        ],
        type: 'team-member'
      },
      { 
        id: 2, 
        name: 'Standard Package', 
        description: '8 sessions for one team member plus assessment and planning',
        features: [
          '8 sessions (60 minutes each)',
          'Comprehensive assessment',
          'Detailed development plan',
          'Email and chat support',
          'Monthly progress reports'
        ],
        type: 'team-member'
      },
      { 
        id: 3, 
        name: 'Premium Team Package', 
        description: 'Coaching for multiple team members plus team workshops',
        features: [
          'Sessions for up to 5 team members',
          'Bi-weekly team workshops',
          'Leadership assessment for all participants',
          'Customized team development plan',
          'Unlimited support',
          'Detailed analytics and ROI reporting'
        ],
        type: 'team'
      }
    ],
    customSolutions: [
      'Enterprise-wide coaching programs',
      'Leadership development for entire departments',
      'Specialized workshops for specific challenges',
      'Integration with existing L&D initiatives'
    ],
    reviews: [
      {
        id: 1,
        author: 'Michael T.',
        role: 'Marketing Director',
        content: 'Dr. Johnson helped me overcome my leadership challenges and build a more cohesive team. Her insights were practical and immediately applicable.',
        rating: 5,
        date: '3 weeks ago'
      },
      {
        id: 2,
        author: 'Jennifer L.',
        role: 'Startup Founder',
        content: 'Working with Sarah was transformative for my business. She helped me clarify my vision and develop the leadership skills needed to grow my company.',
        rating: 5,
        date: '2 months ago'
      },
      {
        id: 3,
        author: 'Robert K.',
        role: 'Senior Project Manager',
        content: 'Sarah provided excellent guidance on navigating a difficult career transition. Her coaching was tailored to my specific needs.',
        rating: 4,
        date: '3 months ago'
      }
    ]
  };

  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  const handleSubmitContact = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${coach.name}. They will contact you shortly.`,
    });
    setShowContactDialog(false);
  };
  
  const handleScheduleIntro = () => {
    toast({
      title: "Session Scheduled",
      description: `Your intro session with ${coach.name} has been scheduled. Check your email for details.`,
    });
    setShowScheduleDialog(false);
  };
  
  const handleConfirmSelection = () => {
    if (selectedPackage === '' && coach.packages.length > 0) {
      toast({
        title: "Please select a package",
        description: "You need to select a coaching package to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Coach Added to Your Team",
      description: `${coach.name} is now part of your coaching team. You can view them in your dashboard.`,
    });
    
    setShowConfirmDialog(false);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" className="pl-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Coaches
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <img 
                src={coach.profileImage} 
                alt={`Coach ${coach.name}`} 
                className="object-cover w-full h-full"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-green-500/20 text-green-600 backdrop-blur-sm">
                  Highly Available
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500">
                  <Star className="fill-amber-400 h-5 w-5" />
                  <span className="ml-1 font-medium">{coach.rating}</span>
                </div>
                <span className="text-muted-foreground">({coach.reviewCount} reviews)</span>
              </div>
              <h1 className="text-3xl font-bold">{coach.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{coach.title}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {coach.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {specialty}
                  </Badge>
                ))}
              </div>
              
              <p className="text-muted-foreground">{coach.bio}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <span>{coach.experience} experience</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{coach.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-muted-foreground" />
                <span>Speaks {coach.languages.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-muted-foreground" />
                <span>Video sessions available</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setShowConfirmDialog(true)} className="gap-2">
                <Check className="h-4 w-4" />
                Confirm As My Coach
              </Button>
              <Button variant="outline" onClick={() => setShowContactDialog(true)} className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact Coach
              </Button>
              <Button variant="outline" onClick={() => setShowScheduleDialog(true)} className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Intro
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="packages" className="mb-10">
          <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto">
            <TabsTrigger 
              value="packages" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Packages & Pricing
            </TabsTrigger>
            <TabsTrigger 
              value="booking" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Book a Consultation
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              About
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="packages">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-4">Coaching Packages</h2>
                <p className="text-muted-foreground mb-6">
                  Our coaching packages are designed to provide flexible options for organizations of all sizes.
                  Whether you need coaching for individual team members or comprehensive team development, we have solutions to fit your needs.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {coach.packages.map((pkg) => (
                    <Card key={pkg.id} className={pkg.id === 2 ? "border-primary border-2" : ""}>
                      {pkg.id === 2 && (
                        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                          Most Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{pkg.name}</CardTitle>
                        <CardDescription>{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <span className="text-lg font-semibold flex items-center gap-2">
                            {pkg.type === 'team-member' ? (
                              <User className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <Users className="h-5 w-5 text-muted-foreground" />
                            )}
                            {pkg.type === 'team-member' ? 'Individual Coaching' : 'Team Coaching'}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-600 mt-1" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          variant={selectedPackage === pkg.name ? "default" : "outline"}
                          onClick={() => setSelectedPackage(pkg.name)}
                        >
                          {selectedPackage === pkg.name ? "Selected" : "Select Package"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Custom Enterprise Solutions</h3>
                <p className="text-muted-foreground mb-4">
                  For larger organizations or specialized needs, we offer custom coaching solutions tailored to your specific requirements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {coach.customSolutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FileCheck className="h-5 w-5 text-primary mt-0.5" />
                      <span>{solution}</span>
                    </div>
                  ))}
                </div>
                <Button>Request Custom Proposal</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="booking">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Schedule a Session</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Select a Date
                  </h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Available Time Slots
                    {date && <span className="ml-2 text-sm text-muted-foreground">
                      {format(date, 'EEEE, MMMM do')}
                    </span>}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTimeSlot === time ? "default" : "outline"}
                        className="justify-center"
                        onClick={() => setSelectedTimeSlot(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      disabled={!selectedTimeSlot} 
                      className="w-full"
                    >
                      Confirm Booking
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      {selectedTimeSlot 
                        ? `You're booking a 60-minute session at ${selectedTimeSlot}` 
                        : 'Select a time slot to continue'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">Background & Experience</h2>
                <p className="text-muted-foreground mb-4">
                  Dr. Sarah Johnson brings a wealth of experience in leadership development, having worked with 
                  executives at Fortune 500 companies as well as startup founders. Her coaching methodology is 
                  grounded in evidence-based practices and tailored to each client's unique challenges.
                </p>
                <p className="text-muted-foreground">
                  Prior to her coaching career, Sarah served as a senior executive in the technology sector, 
                  giving her firsthand understanding of leadership challenges in fast-paced environments.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                  {coach.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-muted-foreground">{edu.institution}, {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">Certifications</h2>
                <div className="space-y-4">
                  {coach.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-muted-foreground">{cert.issuer}, {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">Coaching Approach</h2>
                <p className="text-muted-foreground">
                  My coaching approach is collaborative and results-oriented. I believe in creating a 
                  safe, confidential space where clients can explore challenges, gain insights, and 
                  develop practical strategies for growth. Each coaching relationship begins with a 
                  thorough assessment of your current situation and clear goal-setting for our work together.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Evidence-based techniques</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Tailored development plans</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Regular progress assessments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Practical, actionable strategies</span>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Client Reviews</h2>
                  <p className="text-muted-foreground">
                    {coach.reviewCount} reviews, average {coach.rating} out of 5
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500" />
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-6">
                {coach.reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
              
              <Button variant="outline">
                Show All Reviews
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact {coach.name}</DialogTitle>
            <DialogDescription>
              Send a message to {coach.name} to discuss your coaching needs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={coach.profileImage} 
                  alt={coach.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{coach.name}</h3>
                <p className="text-sm text-muted-foreground">{coach.title}</p>
              </div>
            </div>
            
            <textarea 
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your message here..."
            />
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmitContact} className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Intro Session with {coach.name}</DialogTitle>
            <DialogDescription>
              Book a free 30-minute intro session to get to know {coach.name} and discuss your goals.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={coach.profileImage} 
                  alt={coach.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{coach.name}</h3>
                <p className="text-sm text-muted-foreground">{coach.title}</p>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Preferred Date & Time</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-4 border rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div className="text-sm font-medium">Select Date</div>
                </div>
                <div className="flex items-center gap-2 p-4 border rounded-lg">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <div className="text-sm font-medium">Select Time</div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleScheduleIntro} className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Coach Selection</DialogTitle>
            <DialogDescription>
              {coach.name} will be added to your coaching team.
              {coach.packages.length > 0 ? 
                " Please select a coaching package below." : 
                " This coach offers custom pricing based on your needs."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={coach.profileImage} 
                  alt={coach.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{coach.name}</h3>
                <p className="text-sm text-muted-foreground">{coach.title}</p>
              </div>
            </div>
            
            {coach.packages.length > 0 && (
              <div className="space-y-4">
                <Label>Select a Coaching Package</Label>
                <RadioGroup value={selectedPackage || ''} onValueChange={setSelectedPackage}>
                  {coach.packages.map((pkg) => (
                    <div key={pkg.id} className={`flex items-center space-x-2 rounded-md border p-3 ${pkg.id === 2 ? "bg-secondary/40" : ""}`}>
                      <RadioGroupItem value={pkg.name} id={pkg.id.toString()} />
                      <Label htmlFor={pkg.id.toString()} className="flex-1 cursor-pointer">
                        <div className="font-medium">
                          {pkg.name}
                          {pkg.id === 2 && <span className="text-xs text-primary ml-1">(Recommended)</span>}
                        </div>
                        <div className="text-sm text-muted-foreground">{pkg.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {coach.packages.length === 0 && (
              <div className="p-4 bg-secondary/30 rounded-md border">
                <p className="text-sm">
                  This coach offers custom pricing based on your specific needs and goals. 
                  After confirmation, they will contact you to discuss package options.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={() => {
                setShowConfirmDialog(false);
                setShowContactDialog(true);
              }} className="gap-2">
                <PhoneCall className="h-4 w-4" />
                Contact First
              </Button>
            </div>
            <Button type="button" onClick={handleConfirmSelection} className="gap-2">
              <Check className="h-4 w-4" />
              Confirm Coach
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default CoachProfile;
