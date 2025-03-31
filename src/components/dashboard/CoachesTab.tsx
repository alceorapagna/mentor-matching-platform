
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { coachesData } from "@/data/coachesData";
import CoachCategorySection from "@/components/coaches/CoachCategorySection";

const CoachesTab = () => {
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
              {reneuCoaches.length > 0 && (
                <CoachCategorySection
                  title="Your Reneu Coach"
                  description="Your dedicated Reneu coach is a certified professional guiding you through your overall renewal journey, encompassing all aspects of work, mind, and body."
                  badgeText="Holistic Support"
                  badgeClassName="bg-primary/10 border-primary/40"
                  coaches={reneuCoaches}
                  isSingleCoach={true}
                />
              )}

              {businessCoaches.length > 0 && (
                <CoachCategorySection
                  title="Your Professional Coaches"
                  description="These specialists provide focused support for your professional goals, career advancement, leadership development, and work-related challenges."
                  badgeText="Professional Goals"
                  badgeClassName="bg-amber-50 text-amber-700 border-amber-200"
                  coaches={businessCoaches}
                  allowAddMore={true}
                />
              )}

              {mindCoaches.length > 0 && (
                <CoachCategorySection
                  title="Your Mental Coaches"
                  description="These specialists focus on supporting your mental wellbeing, emotional resilience, stress management, and personal growth."
                  badgeText="Mental Wellbeing"
                  badgeClassName="bg-purple-50 text-purple-700 border-purple-200"
                  coaches={mindCoaches}
                  allowAddMore={true}
                />
              )}

              {bodyCoaches.length > 0 && (
                <CoachCategorySection
                  title="Your Physical Coaches"
                  description="These specialists focus on physical wellness, nutrition, fitness, energy management, and establishing healthy habits."
                  badgeText="Physical Wellness"
                  badgeClassName="bg-green-50 text-green-700 border-green-200"
                  coaches={bodyCoaches}
                  allowAddMore={true}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesTab;
