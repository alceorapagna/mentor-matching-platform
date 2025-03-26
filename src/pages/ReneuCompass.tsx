
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Compass, 
  ArrowRight, 
  Check, 
  User, 
  Activity, 
  Brain, 
  Briefcase,
  Heart
} from "lucide-react";

const ReneuCompass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [compassProgress, setCompassProgress] = useState(0);
  const [selectedStep, setSelectedStep] = useState("purpose");
  
  // Mock data for the assessment
  const [assessmentData, setAssessmentData] = useState({
    purpose: "",
    coreValues: [],
    dimensions: {
      work: { current: 5, desired: 8 },
      mind: { current: 4, desired: 7 },
      body: { current: 3, desired: 8 }
    }
  });

  const totalSteps = 4;
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setCompassProgress((step / totalSteps) * 100);
    } else {
      // Complete the onboarding process
      toast({
        title: "Reneu Compass Completed",
        description: "Your renewal journey has been mapped. You'll be redirected to schedule your discovery session.",
        duration: 5000,
      });
      
      // Redirect to dashboard or next step
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Reneu Compass</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Map your purpose, values, and wellbeing across Work, Mind, and Body dimensions to create your personalized renewal journey.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-1">
            <span>Getting Started</span>
            <span>Journey Ready</span>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2" />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-xs text-muted-foreground">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
        </div>

        {/* Step 1: Introduction */}
        {step === 1 && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to Your Renewal Journey</CardTitle>
              <CardDescription>
                The Reneu Compass is the starting point of your renewal journey. This tool helps you and your coach map your current state and desired future across three critical dimensions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                      <Briefcase className="h-5 w-5 text-amber-600" />
                    </div>
                    <CardTitle className="text-lg">Work</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Your professional purpose, career satisfaction, and work-life harmony.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Mind</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Your mental clarity, emotional wellbeing, and psychological resilience.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <Heart className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Body</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Your physical health, energy levels, and daily wellness habits.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">What to expect:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Complete this initial assessment before your discovery session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Meet with a Reneu coach for your discovery session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Together, refine your renewal journey goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Get matched with specialized coaches to support your journey</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNextStep} className="w-full sm:w-auto ml-auto">
                Begin Your Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Purpose & Values */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Purpose & Core Values</CardTitle>
              <CardDescription>
                Let's start by exploring what drives you and the values that guide your decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Purpose Statement</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Describe what gives your life meaning. This doesn't have to be perfect - you'll refine this with your coach.
                  </p>
                  <textarea 
                    className="w-full min-h-[120px] p-3 rounded-md border" 
                    placeholder="I believe my purpose is to..."
                    value={assessmentData.purpose}
                    onChange={(e) => setAssessmentData({...assessmentData, purpose: e.target.value})}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Core Values</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Select 3-5 values that are most important to you.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {["Authenticity", "Balance", "Compassion", "Courage", "Creativity", "Growth", "Family", 
                    "Freedom", "Health", "Honesty", "Impact", "Joy", "Learning", "Security", "Connection"].map((value) => (
                      <Button
                        key={value}
                        variant={assessmentData.coreValues.includes(value) ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => {
                          const newValues = [...assessmentData.coreValues];
                          if (newValues.includes(value)) {
                            setAssessmentData({
                              ...assessmentData, 
                              coreValues: newValues.filter(v => v !== value)
                            });
                          } else if (newValues.length < 5) {
                            setAssessmentData({
                              ...assessmentData, 
                              coreValues: [...newValues, value]
                            });
                          }
                        }}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Current Assessment */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Current State</CardTitle>
              <CardDescription>
                Rate your current level of satisfaction in each dimension from 1 (very dissatisfied) to 10 (completely satisfied).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedStep} onValueChange={setSelectedStep}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="work">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Work
                  </TabsTrigger>
                  <TabsTrigger value="mind">
                    <Brain className="h-4 w-4 mr-2" />
                    Mind
                  </TabsTrigger>
                  <TabsTrigger value="body">
                    <Activity className="h-4 w-4 mr-2" />
                    Body
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="work" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Professional Fulfillment</h3>
                    <p className="text-muted-foreground text-sm">How satisfied are you with your current work, career path, and professional growth?</p>
                    <div className="pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs">Very Dissatisfied</span>
                        <span className="text-xs">Very Satisfied</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">1</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={assessmentData.dimensions.work.current}
                          onChange={(e) => {
                            setAssessmentData({
                              ...assessmentData,
                              dimensions: {
                                ...assessmentData.dimensions,
                                work: {
                                  ...assessmentData.dimensions.work,
                                  current: parseInt(e.target.value)
                                }
                              }
                            });
                          }}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">10</span>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-lg font-bold">{assessmentData.dimensions.work.current}</span>
                      </div>
                    </div>
                  </div>
                  
                  <textarea 
                    className="w-full min-h-[100px] p-3 rounded-md border mt-4" 
                    placeholder="What specifically about your work would you like to change or improve?"
                  />
                </TabsContent>
                
                <TabsContent value="mind" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Mental Wellbeing</h3>
                    <p className="text-muted-foreground text-sm">How would you rate your current mental clarity, emotional balance, and stress levels?</p>
                    <div className="pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs">Very Dissatisfied</span>
                        <span className="text-xs">Very Satisfied</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">1</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={assessmentData.dimensions.mind.current}
                          onChange={(e) => {
                            setAssessmentData({
                              ...assessmentData,
                              dimensions: {
                                ...assessmentData.dimensions,
                                mind: {
                                  ...assessmentData.dimensions.mind,
                                  current: parseInt(e.target.value)
                                }
                              }
                            });
                          }}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">10</span>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-lg font-bold">{assessmentData.dimensions.mind.current}</span>
                      </div>
                    </div>
                  </div>
                  
                  <textarea 
                    className="w-full min-h-[100px] p-3 rounded-md border mt-4" 
                    placeholder="What aspects of your mental wellbeing would you like to focus on improving?"
                  />
                </TabsContent>
                
                <TabsContent value="body" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Physical Health</h3>
                    <p className="text-muted-foreground text-sm">How would you rate your current physical health, energy levels, and wellness habits?</p>
                    <div className="pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs">Very Dissatisfied</span>
                        <span className="text-xs">Very Satisfied</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">1</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={assessmentData.dimensions.body.current}
                          onChange={(e) => {
                            setAssessmentData({
                              ...assessmentData,
                              dimensions: {
                                ...assessmentData.dimensions,
                                body: {
                                  ...assessmentData.dimensions.body,
                                  current: parseInt(e.target.value)
                                }
                              }
                            });
                          }}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">10</span>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-lg font-bold">{assessmentData.dimensions.body.current}</span>
                      </div>
                    </div>
                  </div>
                  
                  <textarea 
                    className="w-full min-h-[100px] p-3 rounded-md border mt-4" 
                    placeholder="What aspects of your physical health would you like to prioritize?"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Future State & Discovery Session */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Desired Future State</CardTitle>
              <CardDescription>
                Let's map where you'd like to be in each dimension and schedule your discovery session.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-amber-600 mr-2" />
                        <h3 className="font-medium">Work</h3>
                      </div>
                      <div className="text-2xl font-bold">
                        {assessmentData.dimensions.work.current} → {assessmentData.dimensions.work.desired}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={assessmentData.dimensions.work.desired}
                      onChange={(e) => {
                        setAssessmentData({
                          ...assessmentData,
                          dimensions: {
                            ...assessmentData.dimensions,
                            work: {
                              ...assessmentData.dimensions.work,
                              desired: parseInt(e.target.value)
                            }
                          }
                        });
                      }}
                      className="w-full mb-4"
                    />
                    <p className="text-muted-foreground text-sm">
                      You'll refine your work goals with your coach during the discovery session.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Brain className="h-5 w-5 text-purple-600 mr-2" />
                        <h3 className="font-medium">Mind</h3>
                      </div>
                      <div className="text-2xl font-bold">
                        {assessmentData.dimensions.mind.current} → {assessmentData.dimensions.mind.desired}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={assessmentData.dimensions.mind.desired}
                      onChange={(e) => {
                        setAssessmentData({
                          ...assessmentData,
                          dimensions: {
                            ...assessmentData.dimensions,
                            mind: {
                              ...assessmentData.dimensions.mind,
                              desired: parseInt(e.target.value)
                            }
                          }
                        });
                      }}
                      className="w-full mb-4"
                    />
                    <p className="text-muted-foreground text-sm">
                      Your mental wellbeing goals will be explored further in your discovery session.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-green-600 mr-2" />
                        <h3 className="font-medium">Body</h3>
                      </div>
                      <div className="text-2xl font-bold">
                        {assessmentData.dimensions.body.current} → {assessmentData.dimensions.body.desired}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={assessmentData.dimensions.body.desired}
                      onChange={(e) => {
                        setAssessmentData({
                          ...assessmentData,
                          dimensions: {
                            ...assessmentData.dimensions,
                            body: {
                              ...assessmentData.dimensions.body,
                              desired: parseInt(e.target.value)
                            }
                          }
                        });
                      }}
                      className="w-full mb-4"
                    />
                    <p className="text-muted-foreground text-sm">
                      Your physical health goals will be defined further in your discovery session.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Schedule Your Discovery Session</h3>
                <p className="text-muted-foreground mb-4">
                  Your next step is to meet with a Reneu coach for a 90-minute discovery session where you'll discuss your assessment and refine your renewal journey plan.
                </p>
                
                <Card className="bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Discovery Session with a Reneu Coach</h4>
                        <p className="text-sm text-muted-foreground">90 minutes • Virtual Meeting</p>
                        <p className="text-sm mt-2">
                          This is where your renewal journey truly begins. You'll explore your assessment results and create a personalized plan forward.
                        </p>
                      </div>
                      <Button className="md:self-start">
                        Schedule Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Complete Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default ReneuCompass;
