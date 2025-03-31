
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Brain, Heart, Check } from "lucide-react";

interface CompassIntroductionProps {
  onNext: () => void;
}

const CompassIntroduction = ({ onNext }: CompassIntroductionProps) => {
  return (
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
        <Button onClick={onNext} className="w-full sm:w-auto ml-auto">
          Begin Your Assessment
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompassIntroduction;
