
import { CompassData } from "@/contexts/auth/types";

interface CompassContentProps {
  compassData?: CompassData;
}

const CompassContent = ({ compassData }: CompassContentProps) => {
  if (!compassData) {
    return (
      <div className="p-6 pt-0 text-center">
        <p className="text-muted-foreground">Compass data not available</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-0">
      <div className="space-y-4">
        {/* Purpose Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Purpose</h4>
          <p className="text-sm text-muted-foreground italic">"{compassData.purpose}"</p>
        </div>
        
        {/* Values Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Values</h4>
          <div className="flex flex-wrap gap-2">
            {compassData.coreValues.map((value, index) => (
              <span 
                key={index} 
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompassContent;
