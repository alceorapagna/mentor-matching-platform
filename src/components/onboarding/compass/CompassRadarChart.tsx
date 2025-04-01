
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, Tooltip } from "recharts";
import { CompassData } from "@/contexts/auth/types";

interface CompassRadarChartProps {
  compassData: CompassData;
}

const CompassRadarChart = ({ compassData }: CompassRadarChartProps) => {
  // Transform the dimension data for the radar chart
  const chartData = [
    {
      subject: "Work",
      current: compassData.dimensions.work.current,
      desired: compassData.dimensions.work.desired,
      fullMark: 10
    },
    {
      subject: "Mind",
      current: compassData.dimensions.mind.current,
      desired: compassData.dimensions.mind.desired,
      fullMark: 10
    },
    {
      subject: "Body",
      current: compassData.dimensions.body.current,
      desired: compassData.dimensions.body.desired,
      fullMark: 10
    }
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--foreground)' }} />
          <Radar
            name="Current State"
            dataKey="current"
            stroke="var(--muted-foreground)"
            fill="var(--muted)"
            fillOpacity={0.5}
          />
          <Radar
            name="Desired State"
            dataKey="desired"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.3}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompassRadarChart;
