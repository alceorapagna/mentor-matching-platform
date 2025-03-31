
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompassData } from "@/contexts/auth/types";
import CompassVisualization from "./CompassVisualization";
import JourneyVisualization from "./JourneyVisualization";

interface CompassContentProps {
  compassData?: CompassData;
}

const CompassContent = ({ compassData }: CompassContentProps) => {
  if (!compassData) {
    return (
      <CardContent>
        <p className="text-center py-6 text-muted-foreground">
          Assessment completed. No detailed data available.
        </p>
      </CardContent>
    );
  }
  
  return (
    <CardContent className="pt-2">
      <div className="space-y-6">
        {/* Compass Visualization with Custom Image */}
        <CompassVisualization compassData={compassData} />
        
        <Separator />
        
        {/* Journey Visualization with Custom Image */}
        <JourneyVisualization dimensions={compassData.dimensions} />
      </div>
    </CardContent>
  );
};

export default CompassContent;
