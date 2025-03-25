import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Upload, UserPlus, Users, X, BarChart } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  inviteStatus: 'pending' | 'sent' | 'accepted';
  accessLink?: string;
};

const HRPortal = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      department: 'Marketing',
      inviteStatus: 'accepted',
      accessLink: 'https://reneu.com/access/jd123456'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      department: 'Finance',
      inviteStatus: 'sent',
      accessLink: 'https://reneu.com/access/js789012'
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@company.com',
      department: 'Operations',
      inviteStatus: 'pending'
    }
  ]);
  
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
    
    setEmployees([...employees, newEmployee]);
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
        setEmployees([...employees, ...newEmployees]);
        setBulkData('');
        toast.success(`${newEmployees.length} employees added successfully`);
      } else {
        toast.error('No valid employee data found');
      }
    } catch (error) {
      toast.error('Error processing data. Please check format');
    }
  };
  
  const handleGenerateLinks = () => {
    const updatedEmployees = employees.map(emp => {
      if (emp.inviteStatus === 'pending') {
        return {
          ...emp,
          inviteStatus: 'sent' as const,
          accessLink: `https://reneu.com/access/${emp.firstName.toLowerCase().charAt(0)}${emp.lastName.toLowerCase()}${Math.floor(Math.random() * 1000000)}`
        };
      }
      return emp;
    });
    
    setEmployees(updatedEmployees);
    toast.success('Access links generated and invitations sent');
  };
  
  const handleRemoveEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast.success('Employee removed');
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-reneu-500">HR Portal</h1>
            <p className="text-muted-foreground mt-2">Manage employee access to Reneu Coaching Platform</p>
          </div>
          <div className="flex gap-3">
            <Link to="/hr-dashboard">
              <Button variant="outline" className="gap-2">
                <BarChart size={16} />
                View Dashboard
              </Button>
            </Link>
            <Button onClick={handleGenerateLinks} className="gap-2">
              <UserPlus size={16} />
              Generate Links & Send Invites
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Add employees or generate access links</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button variant="outline" className="h-20 w-36 flex flex-col gap-1" onClick={() => document.getElementById('add-tab')?.click()}>
                <PlusCircle className="h-5 w-5 text-reneu-500" />
                <span>Add Employee</span>
              </Button>
              <Button variant="outline" className="h-20 w-36 flex flex-col gap-1" onClick={() => document.getElementById('bulk-tab')?.click()}>
                <Upload className="h-5 w-5 text-reneu-500" />
                <span>Bulk Upload</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                                  onClick={() => {
                                    navigator.clipboard.writeText(employee.accessLink!);
                                    toast.success('Access link copied to clipboard');
                                  }}
                                >
                                  Copy Link
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveEmployee(employee.id)}
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
        </div>
      </div>
    </MainLayout>
  );
};

export default HRPortal;
