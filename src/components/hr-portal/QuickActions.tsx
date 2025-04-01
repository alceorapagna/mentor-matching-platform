
import React from 'react';
import { PlusCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickActionsProps {
  onAddEmployeeClick: () => void;
  onBulkUploadClick: () => void;
}

const QuickActions = ({ onAddEmployeeClick, onBulkUploadClick }: QuickActionsProps) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Add employees or generate access links</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Button variant="outline" className="h-20 w-36 flex flex-col gap-1" onClick={onAddEmployeeClick}>
          <PlusCircle className="h-5 w-5 text-reneu-500" />
          <span>Add Employee</span>
        </Button>
        <Button variant="outline" className="h-20 w-36 flex flex-col gap-1" onClick={onBulkUploadClick}>
          <Upload className="h-5 w-5 text-reneu-500" />
          <span>Bulk Upload</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
