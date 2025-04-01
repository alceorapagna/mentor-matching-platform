
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { coachesData } from "@/data/coachesData";
import { useAuth } from "@/contexts/AuthContext";
import CoachCategoryDisplay from "./coaches/CoachCategoryDisplay";

const CoachesTab = () => {
  const { user } = useAuth();
  
  // Get the coach status from the user object
  const hasReneuCoach = user?.hasReneuCoach || false;
  const hasBusinessCoach = user?.hasBusinessCoach || false;
  const hasMindCoach = user?.hasMindCoach || false;
  const hasBodyCoach = user?.hasBodyCoach || false;
  
  // Filter coaches by category
  const reneuCoaches = coachesData.filter(coach => coach.category === 'reneu');
  const businessCoaches = coachesData.filter(coach => coach.category === 'business');
  const mindCoaches = coachesData.filter(coach => coach.category === 'mind');
  const bodyCoaches = coachesData.filter(coach => coach.category === 'body');

  return (
    <div className="space-y-6">
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
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Your Coaching Team</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Meet your personal coaches dedicated to supporting your wellness journey across all dimensions.
              </p>
            </div>
            
            <div className="space-y-12">
              {/* Reneu Coach Section */}
              <CoachCategoryDisplay
                title="Your Reneu Coach"
                badgeText="Holistic Support"
                badgeClassName="bg-primary/10 border-primary/40"
                description="Your dedicated Reneu coach is a certified professional guiding you through your overall renewal journey, encompassing all aspects of work, mind, and body."
                coaches={reneuCoaches.slice(0, 1)}
                hasCoach={hasReneuCoach}
                category="reneu"
                findCoachTitle="Find Your Reneu Coach"
                findCoachDescription="Connect with a dedicated coach to guide your renewal journey"
              />
              
              {/* Business Coaches Section */}
              <CoachCategoryDisplay
                title="Your Professional Coaches"
                badgeText="Professional Goals"
                badgeClassName="bg-amber-50 text-amber-700 border-amber-200"
                description="These specialists provide focused support for your professional goals, career advancement, leadership development, and work-related challenges."
                coaches={businessCoaches}
                hasCoach={hasBusinessCoach}
                category="business"
                allowMultiple={true}
                findCoachTitle="Find Professional Coaches"
                findCoachDescription="Connect with specialists who can support your professional growth"
              />
              
              {/* Mind Coaches Section */}
              <CoachCategoryDisplay
                title="Your Mental Coaches"
                badgeText="Mental Wellbeing"
                badgeClassName="bg-purple-50 text-purple-700 border-purple-200"
                description="These specialists focus on supporting your mental wellbeing, emotional resilience, stress management, and personal growth."
                coaches={mindCoaches}
                hasCoach={hasMindCoach}
                category="mind"
                allowMultiple={true}
                findCoachTitle="Find Mental Coaches"
                findCoachDescription="Connect with specialists focused on your mental wellbeing"
              />
              
              {/* Body Coaches Section */}
              <CoachCategoryDisplay
                title="Your Physical Coaches"
                badgeText="Physical Wellness"
                badgeClassName="bg-green-50 text-green-700 border-green-200"
                description="These specialists focus on physical wellness, nutrition, fitness, energy management, and establishing healthy habits."
                coaches={bodyCoaches}
                hasCoach={hasBodyCoach}
                category="body"
                allowMultiple={true}
                findCoachTitle="Find Physical Coaches"
                findCoachDescription="Connect with specialists focused on your physical wellness"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesTab;
