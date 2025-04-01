
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Employee } from './types';

interface EmployeeDirectoryProps {
  employees: Employee[];
  onRemoveEmployee: (id: string) => void;
}

const EmployeeDirectory = ({ employees, onRemoveEmployee }: EmployeeDirectoryProps) => {
  const handleCopyLink = (accessLink: string) => {
    navigator.clipboard.writeText(accessLink);
    toast.success('Access link copied to clipboard');
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Employee Directory</CardTitle>
        <CardDescription>
          Manage employee access and view invitation status
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.length ? (
                employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.firstName} {employee.lastName}
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.inviteStatus === 'accepted' ? 'bg-green-100 text-green-800' : 
                        employee.inviteStatus === 'sent' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {employee.inviteStatus === 'accepted' ? 'Active' : 
                         employee.inviteStatus === 'sent' ? 'Invited' : 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {employee.accessLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyLink(employee.accessLink!)}
                          >
                            Copy Link
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveEmployee(employee.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No employees added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDirectory;
