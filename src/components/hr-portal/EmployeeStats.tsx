
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Employee } from './types';

interface EmployeeStatsProps {
  employees: Employee[];
}

const EmployeeStats = ({ employees }: EmployeeStatsProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-reneu-500" />
          Employee Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-reneu-50 rounded-lg">
            <p className="text-2xl font-bold text-reneu-700">{employees.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <p className="text-2xl font-bold text-amber-700">
              {employees.filter(e => e.inviteStatus === 'pending' || e.inviteStatus === 'sent').length}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">
              {employees.filter(e => e.inviteStatus === 'accepted').length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeStats;
