
import { CompassData } from "@/contexts/auth/types";
import CompassVisualization from "./CompassVisualization";

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
      <CompassVisualization compassData={compassData} />
    </div>
  );
};

export default CompassContent;
