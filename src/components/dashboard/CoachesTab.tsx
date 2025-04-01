
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { coachesData } from "@/data/coachesData";
import { useAuth } from "@/contexts/AuthContext";
import CoachCategoryDisplay from "./coaches/CoachCategoryDisplay";
import { useEffect } from "react";

const CoachesTab = () => {
  const { user } = useAuth();
  
  // Get the coach status from the user object - check both camelCase and lowercase versions
  // Use Boolean() to ensure we get true/false values rather than undefined/null
  const hasReneuCoach = Boolean(user?.hasreneucoach || user?.hasReneuCoach);
  const hasBusinessCoach = Boolean(user?.hasbusinesscoach || user?.hasBusinessCoach);
  const hasMindCoach = Boolean(user?.hasmindcoach || user?.hasMindCoach);
  const hasBodyCoach = Boolean(user?.hasbodycoach || user?.hasBodyCoach);
  
  // Log all coach flags for debugging
  useEffect(() => {
    console.log("Coach flags in CoachesTab:", { 
      userObject: user, 
      hasReneuCoach, 
      hasBusinessCoach, 
      hasMindCoach, 
      hasBodyCoach,
      rawBodyFlag: user?.hasbodycoach,
      rawBodyFlagCamel: user?.hasBodyCoach,
      rawBodyFlagTypeCheck: typeof user?.hasbodycoach,
      rawBodyFlagCamelTypeCheck: typeof user?.hasBodyCoach
    });
    
    // Deep debug for body coach flag specifically
    if (user) {
      console.log("Body coach deep debug:", {
        "user?.hasBodyCoach": user.hasBodyCoach,
        "Boolean(user?.hasBodyCoach)": Boolean(user.hasBodyCoach),
        "user?.hasbodycoach": user.hasbodycoach,
        "Boolean(user?.hasbodycoach)": Boolean(user.hasbodycoach),
        "user?.hasBodyCoach === true": user.hasBodyCoach === true,
        "user?.hasbodycoach === true": user.hasbodycoach === true
      });
    }
  }, [user, hasReneuCoach, hasBusinessCoach, hasMindCoach, hasBodyCoach]);
  
  // Filter coaches by category - for all categories, only get the first coach
  const reneuCoaches = hasReneuCoach ? coachesData.filter(coach => coach.category === 'reneu').slice(0, 1) : [];
  const businessCoaches = hasBusinessCoach ? coachesData.filter(coach => coach.category === 'business').slice(0, 1) : [];
  const mindCoaches = hasMindCoach ? coachesData.filter(coach => coach.category === 'mind').slice(0, 1) : [];
  const bodyCoaches = hasBodyCoach ? coachesData.filter(coach => coach.category === 'body').slice(0, 1) : [];
  
  // Log filtered coaches
  useEffect(() => {
    console.log("Filtered coaches:", {
      reneuCoaches,
      businessCoaches,
      mindCoaches,
      bodyCoaches,
      bodyCoachFlag: hasBodyCoach
    });
  }, [reneuCoaches, businessCoaches, mindCoaches, bodyCoaches, hasBodyCoach]);

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
                allowMultiple={false}
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
                allowMultiple={false}
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
                allowMultiple={false}
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
