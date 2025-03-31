
interface CompassValuesSectionProps {
  coreValues: string[];
}

const CompassValuesSection = ({ coreValues }: CompassValuesSectionProps) => {
  return (
    <div className="w-full md:w-1/3 space-y-2">
      <h4 className="text-sm font-medium">Core Values</h4>
      <div className="bg-muted/30 p-3 rounded-md flex flex-col gap-2">
        {coreValues.map((value, index) => (
          <div key={index} className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompassValuesSection;
