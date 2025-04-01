
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartDataItem {
  name: string;
  score: number;
}

interface EngagementChartsProps {
  departmentData: ChartDataItem[];
  levelData: ChartDataItem[];
}

const EngagementCharts = ({ departmentData, levelData }: EngagementChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Department Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Department Engagement</CardTitle>
          <CardDescription>
            Average engagement score by department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Engagement Score']}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {departmentData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.score > 80 ? '#10b981' : entry.score > 60 ? '#3b82f6' : '#f59e0b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Level Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement by Level</CardTitle>
          <CardDescription>
            Average engagement score by employee level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={levelData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Engagement Score']}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {levelData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.score > 80 ? '#8B5CF6' : entry.score > 60 ? '#9b87f5' : '#D6BCFA'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementCharts;
