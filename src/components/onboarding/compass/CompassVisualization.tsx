
import CompassPurposeSection from "./CompassPurposeSection";
import CompassValuesSection from "./CompassValuesSection";
import { CompassData } from "@/contexts/auth/types";

interface CompassVisualizationProps {
  compassData: CompassData;
}

const CompassVisualization = ({ compassData }: CompassVisualizationProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      {/* Purpose Column - Left */}
      <CompassPurposeSection purpose={compassData.purpose} />
      
      {/* Compass Image - Center */}
      <div className="flex-shrink-0">
        <img 
          src="/lovable-uploads/893c28cc-1f46-4edd-84ef-f383a76b0ab1.png" 
          alt="Reneu Compass" 
          className="w-[216px] opacity-80" 
        />
      </div>
      
      {/* Values Column - Right */}
      <CompassValuesSection coreValues={compassData.coreValues} />
    </div>
  );
};

export default CompassVisualization;
