
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorColor?: string;
    showValue?: boolean;
    valueFormat?: (value: number) => string;
  }
>(({ className, value, indicatorColor, showValue = false, valueFormat, ...props }, ref) => {
  const formattedValue = React.useMemo(() => {
    if (typeof value !== 'number') return '';
    return valueFormat ? valueFormat(value) : `${Math.round(value)}%`;
  }, [value, valueFormat]);

  return (
    <div className={showValue ? "flex items-center gap-2" : ""}>
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all",
            indicatorColor || "bg-primary"
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      {showValue && value !== undefined && (
        <span className="text-sm font-medium">{formattedValue}</span>
      )}
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
