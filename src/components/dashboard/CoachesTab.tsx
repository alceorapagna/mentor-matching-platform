
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { coachesData } from "@/data/coachesData";
import { useAuth } from "@/contexts/AuthContext";
import CoachCategoryDisplay from "./coaches/CoachCategoryDisplay";
import { useEffect, useState } from "react";

const CoachesTab = () => {
  const { user } = useAuth();
  const [renderCounter, setRenderCounter] = useState(0);
  
  // Force re-render when the component mounts to ensure we have the latest data
  useEffect(() => {
    // Set a small timeout to ensure any state updates have completed
    const timer = setTimeout(() => {
      setRenderCounter(prev => prev + 1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get the coach status from the user object - check both camelCase and lowercase versions
  // Force conversion to boolean to avoid issues with null/undefined/falsiness
  const hasReneuCoach = Boolean(user?.hasreneucoach || user?.hasReneuCoach);
  const hasBusinessCoach = Boolean(user?.hasbusinesscoach || user?.hasBusinessCoach);
  const hasMindCoach = Boolean(user?.hasmindcoach || user?.hasMindCoach);
  const hasBodyCoach = Boolean(user?.hasbodycoach || user?.hasBodyCoach);
  
  // Log all coach flags for debugging
  useEffect(() => {
    console.log("==== COACHES TAB RENDER ====");
    console.log("Coach flags in CoachesTab:", { 
      userObject: user, 
      hasReneuCoach, 
      hasBusinessCoach, 
      hasMindCoach, 
      hasBodyCoach,
      // Add detailed logging for each flag
      raw_user: user,
      renderCount: renderCounter,
      hasReneuCoachRaw: user?.hasreneucoach,
      hasReneuCoachCamel: user?.hasReneuCoach,
      hasBusinessCoachRaw: user?.hasbusinesscoach,
      hasBusinessCoachCamel: user?.hasBusinessCoach,
      hasMindCoachRaw: user?.hasmindcoach,
      hasMindCoachCamel: user?.hasMindCoach,
      hasBodyCoachRaw: user?.hasbodycoach,
      hasBodyCoachCamel: user?.hasBodyCoach
    });
  }, [user, hasReneuCoach, hasBusinessCoach, hasMindCoach, hasBodyCoach, renderCounter]);
  
  // For testing purposes, display the coach flags directly
  useEffect(() => {
    console.log("COACH FLAGS STATE:", {
      reneu: hasReneuCoach,
      business: hasBusinessCoach,
      mind: hasMindCoach,
      body: hasBodyCoach
    });
  }, [hasReneuCoach, hasBusinessCoach, hasMindCoach, hasBodyCoach]);
  
  // For demo purposes only - get the first coach of each category
  // In a real app, we'd fetch the exact coaches by ID from the database
  const reneuCoaches = hasReneuCoach ? coachesData.filter(coach => coach.category === 'reneu').slice(0, 1) : [];
  const businessCoaches = hasBusinessCoach ? coachesData.filter(coach => coach.category === 'business').slice(0, 1) : [];
  const mindCoaches = hasMindCoach ? coachesData.filter(coach => coach.category === 'mind').slice(0, 1) : [];
  const bodyCoaches = hasBodyCoach ? coachesData.filter(coach => coach.category === 'body').slice(0, 1) : [];
  
  // Log filtered coaches
  useEffect(() => {
    console.log("Filtered coaches for display:", {
      reneuCoaches,
      businessCoaches,
      mindCoaches,
      bodyCoaches,
      bodyCoachFlag: hasBodyCoach,
      userBodyCoachFlag: user?.hasbodycoach,
      userBodyCoachFlagCamel: user?.hasBodyCoach
    });
  }, [reneuCoaches, businessCoaches, mindCoaches, bodyCoaches, hasBodyCoach, user]);

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            My Coaches
          </CardTitle>
          <CardDescription>Your personal coaching team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="mb-16 text-center">
              <h2 className="text-2xl font-bold mb-2">Your Coaching Team</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Meet your personal coaches dedicated to supporting your wellness journey across all dimensions.
              </p>
            </div>
            
            <div className="space-y-20">
              {/* Reneu Coach Section */}
              <CoachCategoryDisplay
                title="Your Reneu Coach"
                badgeText="Holistic Support"
                badgeClassName="bg-primary/10 border-primary/40"
                description="Your dedicated Reneu coach is a certified professional guiding you through your overall renewal journey, encompassing all aspects of work, mind, and body."
                coaches={reneuCoaches}
                hasCoach={hasReneuCoach}
                category="reneu"
                findCoachTitle="Find Your Reneu Coach"
                findCoachDescription="Connect with a dedicated coach to guide your renewal journey"
                singleCoachOnly={true}
              />
              
              {/* Business Coaches Section */}
              <CoachCategoryDisplay
                title="Your Professional Coach"
                badgeText="Professional Goals"
                badgeClassName="bg-amber-50 text-amber-700 border-amber-200"
                description="Your professional coach provides focused support for your professional goals, career advancement, leadership development, and work-related challenges."
                coaches={businessCoaches}
                hasCoach={hasBusinessCoach}
                category="business"
                allowMultiple={true}
                findCoachTitle="Find Professional Coach"
                findCoachDescription="Connect with a specialist who can support your professional growth"
              />
              
              {/* Mind Coaches Section */}
              <CoachCategoryDisplay
                title="Your Mental Coach"
                badgeText="Mental Wellbeing"
                badgeClassName="bg-purple-50 text-purple-700 border-purple-200"
                description="Your mental coach focuses on supporting your mental wellbeing, emotional resilience, stress management, and personal growth."
                coaches={mindCoaches}
                hasCoach={hasMindCoach}
                category="mind"
                allowMultiple={true}
                findCoachTitle="Find Mental Coach"
                findCoachDescription="Connect with a specialist focused on your mental wellbeing"
              />
              
              {/* Body Coaches Section */}
              <CoachCategoryDisplay
                title="Your Physical Coach"
                badgeText="Physical Wellness"
                badgeClassName="bg-green-50 text-green-700 border-green-200"
                description="Your physical coach focuses on physical wellness, nutrition, fitness, energy management, and establishing healthy habits."
                coaches={bodyCoaches}
                hasCoach={hasBodyCoach}
                category="body"
                allowMultiple={true}
                findCoachTitle="Find Physical Coach"
                findCoachDescription="Connect with a specialist focused on your physical wellness"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesTab;
