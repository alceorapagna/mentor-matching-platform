
import { CompassData } from "@/contexts/auth/types";
import CompassVisualization from "./CompassVisualization";
import CompassRadarChart from "./CompassRadarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Tabs defaultValue="values">
        <TabsList className="mb-4">
          <TabsTrigger value="values">Values & Purpose</TabsTrigger>
          <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="values">
          <CompassVisualization compassData={compassData} />
        </TabsContent>
        
        <TabsContent value="dimensions">
          <CompassRadarChart compassData={compassData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompassContent;
