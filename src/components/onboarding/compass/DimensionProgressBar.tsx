
import { Progress } from "@/components/ui/progress";

interface DimensionProgressBarProps {
  name: string;
  current: number;
  desired: number;
  notes?: string;
}

const DimensionProgressBar = ({ name, current, desired, notes }: DimensionProgressBarProps) => {
  // Calculate the percentage for the progress bar (current value out of 10)
  const currentPercentage = (current / 10) * 100;
  
  // Get the appropriate color based on dimension name
  const colorClass = getColorForDimension(name);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium">{name}</span>
        <div className="flex items-center space-x-1">
          <span className="text-xs">{current}</span>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs font-medium">{desired}</span>
        </div>
      </div>
      <div className="relative pt-1">
        <Progress 
          value={currentPercentage} 
          className="h-2" 
          indicatorColor={colorClass}
        />
        <div
          className={`absolute h-4 w-4 rounded-full ${colorClass} border-2 border-white`}
          style={{ 
            left: `${(desired / 10) * 100}%`, 
            top: '0px',
            transform: 'translateX(-50%)' 
          }}
        ></div>
      </div>
      {notes && (
        <p className="text-xs text-muted-foreground mt-1 italic">
          "{notes}"
        </p>
      )}
    </div>
  );
};

// Helper function to determine the color based on dimension name
const getColorForDimension = (name: string): string => {
  switch (name.toLowerCase()) {
    case 'work':
      return 'bg-amber-500';
    case 'mind':
      return 'bg-purple-500';
    case 'body':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
};

export default DimensionProgressBar;
