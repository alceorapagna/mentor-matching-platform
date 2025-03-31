
interface DimensionProgressBarProps {
  name: string;
  current: number;
  desired: number;
}

const DimensionProgressBar = ({ name, current, desired }: DimensionProgressBarProps) => {
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
        <div className="flex mb-2 items-center justify-between">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${getColorForDimension(name)} h-2 rounded-full`}
              style={{ width: `${(current / 10) * 100}%` }}
            ></div>
          </div>
          <div
            className={`absolute h-4 w-4 rounded-full ${getColorForDimension(name)} border-2 border-white`}
            style={{ left: `${(desired / 10) * 100}%`, top: '0px' }}
          ></div>
        </div>
      </div>
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
