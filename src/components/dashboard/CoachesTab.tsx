
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search } from "lucide-react";
import { coachesData } from "@/data/coachesData";
import CoachCategorySection from "@/components/coaches/CoachCategorySection";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const CoachesTab = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // We'll assume the user has no coaches initially
  // In a real app, this would come from the user's profile in the database
  const hasReneuCoach = user?.hasReneuCoach || false;
  const hasBusinessCoach = user?.hasBusinessCoach || false;
  const hasMindCoach = user?.hasMindCoach || false;
  const hasBodyCoach = user?.hasBodyCoach || false;
  
  // Filter coaches by category
  const reneuCoaches = coachesData.filter(coach => coach.category === 'reneu');
  const businessCoaches = coachesData.filter(coach => coach.category === 'business');
  const mindCoaches = coachesData.filter(coach => coach.category === 'mind');
  const bodyCoaches = coachesData.filter(coach => coach.category === 'body');

  const handleFindCoach = (category: string) => {
    navigate(`/coaches?category=${category}`);
  };

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
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold">Your Reneu Coach</h2>
                  <div className="bg-primary/10 border-primary/40 text-xs font-medium rounded-full px-2.5 py-0.5 border">
                    Holistic Support
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Your dedicated Reneu coach is a certified professional guiding you through your overall renewal journey, encompassing all aspects of work, mind, and body.
                </p>
                
                {hasReneuCoach ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reneuCoaches.slice(0, 1).map((coach) => (
                      <CoachCategorySection
                        key={coach.id}
                        title=""
                        description=""
                        badgeText=""
                        badgeClassName=""
                        coaches={[coach]}
                        isSingleCoach={true}
                        showSessionInfo={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10">
                    <div className="text-center space-y-4">
                      <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">Find Your Reneu Coach</h3>
                      <p className="text-sm text-muted-foreground">Connect with a dedicated coach to guide your renewal journey</p>
                      <Button onClick={() => handleFindCoach('reneu')}>
                        Find Your Coach
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Business Coaches Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold">Your Professional Coaches</h2>
                  <div className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium rounded-full px-2.5 py-0.5 border">
                    Professional Goals
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  These specialists provide focused support for your professional goals, career advancement, leadership development, and work-related challenges.
                </p>
                
                {hasBusinessCoach ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessCoaches.map((coach) => (
                      <CoachCategorySection
                        key={coach.id}
                        title=""
                        description=""
                        badgeText=""
                        badgeClassName=""
                        coaches={[coach]}
                        showSessionInfo={true}
                      />
                    ))}
                    {/* Add More Business Coaches Button */}
                    <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10 h-full">
                      <div className="text-center space-y-4">
                        <Button variant="outline" onClick={() => handleFindCoach('business')}>
                          Add More Coaches
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10">
                    <div className="text-center space-y-4">
                      <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">Find Professional Coaches</h3>
                      <p className="text-sm text-muted-foreground">Connect with specialists who can support your professional growth</p>
                      <Button onClick={() => handleFindCoach('business')}>
                        Find Your Coach
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mind Coaches Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold">Your Mental Coaches</h2>
                  <div className="bg-purple-50 text-purple-700 border-purple-200 text-xs font-medium rounded-full px-2.5 py-0.5 border">
                    Mental Wellbeing
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  These specialists focus on supporting your mental wellbeing, emotional resilience, stress management, and personal growth.
                </p>
                
                {hasMindCoach ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mindCoaches.map((coach) => (
                      <CoachCategorySection
                        key={coach.id}
                        title=""
                        description=""
                        badgeText=""
                        badgeClassName=""
                        coaches={[coach]}
                        showSessionInfo={true}
                      />
                    ))}
                    {/* Add More Mind Coaches Button */}
                    <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10 h-full">
                      <div className="text-center space-y-4">
                        <Button variant="outline" onClick={() => handleFindCoach('mind')}>
                          Add More Coaches
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10">
                    <div className="text-center space-y-4">
                      <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">Find Mental Coaches</h3>
                      <p className="text-sm text-muted-foreground">Connect with specialists focused on your mental wellbeing</p>
                      <Button onClick={() => handleFindCoach('mind')}>
                        Find Your Coach
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Body Coaches Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold">Your Physical Coaches</h2>
                  <div className="bg-green-50 text-green-700 border-green-200 text-xs font-medium rounded-full px-2.5 py-0.5 border">
                    Physical Wellness
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  These specialists focus on physical wellness, nutrition, fitness, energy management, and establishing healthy habits.
                </p>
                
                {hasBodyCoach ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bodyCoaches.map((coach) => (
                      <CoachCategorySection
                        key={coach.id}
                        title=""
                        description=""
                        badgeText=""
                        badgeClassName=""
                        coaches={[coach]}
                        showSessionInfo={true}
                      />
                    ))}
                    {/* Add More Body Coaches Button */}
                    <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10 h-full">
                      <div className="text-center space-y-4">
                        <Button variant="outline" onClick={() => handleFindCoach('body')}>
                          Add More Coaches
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-border rounded-xl flex flex-col items-center justify-center p-10">
                    <div className="text-center space-y-4">
                      <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">Find Physical Coaches</h3>
                      <p className="text-sm text-muted-foreground">Connect with specialists focused on your physical wellness</p>
                      <Button onClick={() => handleFindCoach('body')}>
                        Find Your Coach
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachesTab;
