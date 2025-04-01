
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Employee } from './types';

interface AddEmployeeFormProps {
  onAddEmployee: (employee: Employee) => void;
  onBulkUpload: (employees: Employee[]) => void;
}

const AddEmployeeForm = ({ onAddEmployee, onBulkUpload }: AddEmployeeFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [bulkData, setBulkData] = useState('');

  const handleAddEmployee = () => {
    if (!firstName || !lastName || !email || !department) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const newEmployee: Employee = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      department,
      inviteStatus: 'pending'
    };
    
    onAddEmployee(newEmployee);
    setFirstName('');
    setLastName('');
    setEmail('');
    setDepartment('');
    toast.success('Employee added successfully');
  };
  
  const handleBulkUpload = () => {
    if (!bulkData) {
      toast.error('Please enter employee data');
      return;
    }
    
    try {
      const rows = bulkData.trim().split('\n');
      const newEmployees: Employee[] = [];
      
      rows.forEach(row => {
        const [firstName, lastName, email, department] = row.split(',').map(item => item.trim());
        
        if (firstName && lastName && email) {
          newEmployees.push({
            id: Date.now() + Math.random().toString(),
            firstName,
            lastName,
            email,
            department: department || 'Not specified',
            inviteStatus: 'pending'
          });
        }
      });
      
      if (newEmployees.length) {
        onBulkUpload(newEmployees);
        setBulkData('');
        toast.success(`${newEmployees.length} employees added successfully`);
      } else {
        toast.error('No valid employee data found');
      }
    } catch (error) {
      toast.error('Error processing data. Please check format');
    }
  };

  return (
    <Card className="lg:col-span-1">
      <Tabs defaultValue="add">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Add Employees</CardTitle>
            <TabsList>
              <TabsTrigger value="add" id="add-tab">Single</TabsTrigger>
              <TabsTrigger value="bulk" id="bulk-tab">Bulk</TabsTrigger>
            </TabsList>
          </div>
          <CardDescription>
            Add employees to give them access to the Reneu platform
          </CardDescription>
        </CardHeader>
        
        <TabsContent value="add">
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input 
                placeholder="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input 
                type="email" 
                placeholder="email@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Department</label>
              <Input 
                placeholder="Department" 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddEmployee} className="w-full">
              Add Employee
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="bulk">
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Bulk Upload (CSV format)
              </label>
              <p className="text-xs text-muted-foreground mb-2">
                Enter one employee per line: FirstName, LastName, Email, Department
              </p>
              <Textarea 
                placeholder="John, Doe, john.doe@company.com, Marketing"
                className="h-36"
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleBulkUpload} className="w-full">
              Upload Employees
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AddEmployeeForm;
