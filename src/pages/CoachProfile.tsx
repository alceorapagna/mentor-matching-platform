
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Star, Calendar as CalendarIcon, Clock, Video, MapPin, GraduationCap, Award, Briefcase, BookOpen, Languages, Check, MessageCircle, User } from 'lucide-react';

const CoachProfile = () => {
  const { id } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Mock coach data
  const coach = {
    id: id,
    name: 'Dr. Sarah Johnson',
    title: 'Executive Coach & Leadership Specialist',
    bio: 'With over 15 years of experience in executive coaching, I help professionals unlock their leadership potential and achieve both personal and organizational goals. My approach combines neuroscience, behavioral psychology, and practical business strategies.',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 150,
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
        name: 'Single Session', 
        description: 'One-time 60-minute coaching session',
        price: 150,
        type: 'one-time'
      },
      { 
        id: 2, 
        name: 'Monthly Package', 
        description: '4 sessions per month, plus email support between sessions',
        price: 520,
        discountedFrom: 600,
        type: 'recurring'
      },
      { 
        id: 3, 
        name: 'Quarterly Intensive', 
        description: '12 sessions over 3 months, personalized development plan, unlimited messaging support',
        price: 1450,
        discountedFrom: 1800,
        type: 'recurring'
      }
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

  // Mock available time slots
  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Coach Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Profile Image */}
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
          
          {/* Profile Info */}
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
              <Button className="hover-scale">Book a Session</Button>
              <Button variant="outline"><MessageCircle className="mr-2 h-4 w-4" />Contact</Button>
              <Button variant="outline"><User className="mr-2 h-4 w-4" />View Full Profile</Button>
            </div>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="booking" className="mb-10">
          <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto">
            <TabsTrigger 
              value="booking" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Book a Session
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              About
            </TabsTrigger>
            <TabsTrigger 
              value="packages" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Packages & Pricing
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          
          {/* Booking Tab Content */}
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
          
          {/* About Tab Content */}
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
          
          {/* Packages & Pricing Tab Content */}
          <TabsContent value="packages">
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
                      <span className="text-3xl font-bold">${pkg.price}</span>
                      {pkg.type === 'recurring' && <span className="text-muted-foreground"> /month</span>}
                      {pkg.discountedFrom && (
                        <span className="text-muted-foreground line-through ml-2">
                          ${pkg.discountedFrom}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {pkg.id === 1 && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>60-minute video session</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Session recording available</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Follow-up resources</span>
                          </li>
                        </>
                      )}
                      {pkg.id === 2 && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>4 sessions per month (60 min each)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Email support between sessions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Customized exercises and resources</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Monthly progress assessment</span>
                          </li>
                        </>
                      )}
                      {pkg.id === 3 && (
                        <>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>12 sessions over 3 months</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Comprehensive development plan</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Unlimited messaging support</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Personalized resource library</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>Weekly progress tracking</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Select Package</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Corporate Packages</h3>
              <p className="text-muted-foreground mb-4">
                Special packages are available for organizations looking to provide coaching for multiple team members.
                Custom programs can be designed to address specific organizational challenges.
              </p>
              <Button variant="outline">Contact for Corporate Rates</Button>
            </div>
          </TabsContent>
          
          {/* Reviews Tab Content */}
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
    </MainLayout>
  );
};

export default CoachProfile;
