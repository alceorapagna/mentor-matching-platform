
import { CompassData } from "@/contexts/auth/types";

interface CompassPurposeSectionProps {
  purpose: string;
}

const CompassPurposeSection = ({ purpose }: CompassPurposeSectionProps) => {
  return (
    <div className="w-full md:w-1/3 space-y-2">
      <h4 className="text-sm font-medium">Purpose</h4>
      <div className="bg-muted/30 p-3 rounded-md">
        <p className="text-sm text-muted-foreground italic">"{purpose}"</p>
      </div>
    </div>
  );
};

export default CompassPurposeSection;
