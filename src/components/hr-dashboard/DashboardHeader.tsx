
import React from 'react';
import { FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-reneu-500">HR Dashboard</h1>
        <p className="text-muted-foreground mt-2">Monitor employee engagement and activity</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="gap-2">
          <FileText size={16} />
          Export Report
        </Button>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Manage Employees
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
