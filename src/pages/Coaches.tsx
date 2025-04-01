
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SearchAndFilter from '@/components/coaches/SearchAndFilter';
import { CoachesHeader } from '@/components/coaches/CoachesHeader';
import { CoachesContent } from '@/components/coaches/CoachesContent';
import { CoachPagination } from '@/components/coaches/CoachPagination';
import { NoCoachesFound } from '@/components/coaches/NoCoachesFound';
import { coachesData } from '@/data/coachesData';
import { Coach } from '@/types/coach';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Calendar, CalendarClock, Check, MessageCircle, PhoneCall } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Coaches = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const itemsPerPage = 6;
  
  const hasCompletedCompass = user?.compassCompleted || false;
  
  const getFilteredCoaches = () => {
    return coachesData.filter(coach => {
      const matchesSearch = 
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || coach.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredCoaches = getFilteredCoaches();
  const totalPages = Math.ceil(filteredCoaches.length / itemsPerPage);
  
  const getPaginatedCoaches = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCoaches.slice(startIndex, endIndex);
  };

  const getReneuCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'reneu');
  const getBusinessCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'business');
  const getMindCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'mind');
  const getBodyCoaches = () => getPaginatedCoaches().filter(coach => coach.category === 'body');
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleContactCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setShowContactDialog(true);
  };
  
  const handleScheduleSession = (coach: Coach) => {
    setSelectedCoach(coach);
    setShowScheduleDialog(true);
  };
  
  const handleConfirmCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setSelectedPackage('');
    setShowConfirmDialog(true);
  };
  
  const handleSubmitContact = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedCoach?.name}. They will contact you shortly.`,
    });
    setShowContactDialog(false);
  };
  
  const handleScheduleIntro = () => {
    toast({
      title: "Session Scheduled",
      description: `Your intro session with ${selectedCoach?.name} has been scheduled. Check your email for details.`,
    });
    setShowScheduleDialog(false);
  };
  
  const handleConfirmSelection = () => {
    if (!selectedPackage && selectedCoach?.pricingModel === 'packages') {
      toast({
        title: "Please select a package",
        description: "You need to select a coaching package to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Coach Added to Your Team",
      description: `${selectedCoach?.name} is now part of your coaching team. You can view them in your dashboard.`,
    });
    
    // In a real app, this would update the user's profile with the selected coach
    
    setShowConfirmDialog(false);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <CoachesHeader />
        
        <SearchAndFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        {filteredCoaches.length > 0 ? (
          <>
            <CoachesContent 
              getReneuCoaches={getReneuCoaches}
              getBusinessCoaches={getBusinessCoaches}
              getMindCoaches={getMindCoaches}
              getBodyCoaches={getBodyCoaches}
              selectedCategory={selectedCategory}
              onContactCoach={handleContactCoach}
              onScheduleSession={handleScheduleSession}
              onConfirmCoach={handleConfirmCoach}
              hasCompletedCompass={hasCompletedCompass}
            />
            
            {totalPages > 1 && (
              <CoachPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <NoCoachesFound 
            setSearchTerm={setSearchTerm}
            setSelectedCategory={setSelectedCategory}
            setPriceRange={setPriceRange}
          />
        )}
      </div>
      
      {/* Contact Coach Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact {selectedCoach?.name}</DialogTitle>
            <DialogDescription>
              Send a message to {selectedCoach?.name} to discuss your coaching needs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={selectedCoach?.imageSrc} 
                  alt={selectedCoach?.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{selectedCoach?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedCoach?.title}</p>
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
      
      {/* Schedule Intro Session Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Intro Session with {selectedCoach?.name}</DialogTitle>
            <DialogDescription>
              Book a free 30-minute intro session to get to know {selectedCoach?.name} and discuss your goals.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={selectedCoach?.imageSrc} 
                  alt={selectedCoach?.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{selectedCoach?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedCoach?.title}</p>
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
      
      {/* Confirm Coach Selection Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Coach Selection</DialogTitle>
            <DialogDescription>
              {selectedCoach?.name} will be added to your coaching team.
              {selectedCoach?.pricingModel === 'packages' ? 
                " Please select a coaching package below." : 
                " This coach offers custom pricing based on your needs."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={selectedCoach?.imageSrc} 
                  alt={selectedCoach?.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{selectedCoach?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedCoach?.title}</p>
                
                {selectedCoach?.category === 'reneu' && (
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Reneu Coach
                  </span>
                )}
                {selectedCoach?.category === 'business' && (
                  <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    Business Coach
                  </span>
                )}
                {selectedCoach?.category === 'mind' && (
                  <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                    Mind Coach
                  </span>
                )}
                {selectedCoach?.category === 'body' && (
                  <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    Body Coach
                  </span>
                )}
              </div>
            </div>
            
            {selectedCoach?.pricingModel === 'packages' && selectedCoach?.packages && (
              <div className="space-y-4">
                <Label>Select a Coaching Package</Label>
                <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                  {selectedCoach.packages.basic && (
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="basic" id="basic" />
                      <Label htmlFor="basic" className="flex-1 cursor-pointer">
                        <div className="font-medium">Basic</div>
                        <div className="text-sm text-muted-foreground">{selectedCoach.packages.basic}</div>
                      </Label>
                    </div>
                  )}
                  
                  {selectedCoach.packages.standard && (
                    <div className="flex items-center space-x-2 rounded-md border p-3 bg-secondary/40">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="font-medium">Standard <span className="text-xs text-primary">(Recommended)</span></div>
                        <div className="text-sm text-muted-foreground">{selectedCoach.packages.standard}</div>
                      </Label>
                    </div>
                  )}
                  
                  {selectedCoach.packages.premium && (
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium" className="flex-1 cursor-pointer">
                        <div className="font-medium">Premium</div>
                        <div className="text-sm text-muted-foreground">{selectedCoach.packages.premium}</div>
                      </Label>
                    </div>
                  )}
                </RadioGroup>
              </div>
            )}
            
            {selectedCoach?.pricingModel === 'custom' && (
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
                handleContactCoach(selectedCoach!);
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

export default Coaches;
