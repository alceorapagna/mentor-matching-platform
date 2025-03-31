
import { Target } from "lucide-react";
import { CompassData } from "@/contexts/auth/types";
import DimensionProgressBar from "./DimensionProgressBar";

interface JourneyVisualizationProps {
  dimensions: CompassData['dimensions'];
}

const JourneyVisualization = ({ dimensions }: JourneyVisualizationProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Target className="h-4 w-4 text-primary mr-2" />
        <h4 className="text-sm font-medium">The goals and journey</h4>
      </div>
      
      <div className="flex justify-center mb-4">
        <img 
          src="/lovable-uploads/2911f207-6d2a-4c23-8508-f23a8dfaf292.png" 
          alt="Journey Compass" 
          className="w-full max-w-[350px] mx-auto opacity-75" 
        />
      </div>
      
      <div className="space-y-4">
        <DimensionProgressBar 
          name="Work" 
          current={dimensions.work.current} 
          desired={dimensions.work.desired} 
          notes={dimensions.work.notes}
        />
        
        <DimensionProgressBar 
          name="Mind" 
          current={dimensions.mind.current} 
          desired={dimensions.mind.desired} 
          notes={dimensions.mind.notes}
        />
        
        <DimensionProgressBar 
          name="Body" 
          current={dimensions.body.current} 
          desired={dimensions.body.desired} 
          notes={dimensions.body.notes}
        />
      </div>
    </div>
  );
};

export default JourneyVisualization;
