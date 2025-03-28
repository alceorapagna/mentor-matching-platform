import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Clock, FileText, Filter, MessageSquare, Search, Users, TrendingUp } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type EmployeeStatus = 'active' | 'pending' | 'invited';

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  level: string; // Added level field
  activity: {
    lastLogin: string;
    sessionsCompleted: number;
    sessionDuration: number;
    engagementScore: number;
    impactScore: number;
  };
  status: EmployeeStatus;
  joinDate: string;
};

const HRDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Dummy data for employees with additional level field
  const employees: Employee[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      department: 'Marketing',
      level: 'Manager',
      status: 'active',
      joinDate: '2023-05-15',
      activity: {
        lastLogin: '2023-09-28 14:30',
        sessionsCompleted: 12,
        sessionDuration: 45,
        engagementScore: 85,
        impactScore: 78
      }
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      department: 'Finance',
      level: 'Top Manager',
      status: 'active',
      joinDate: '2023-06-12',
      activity: {
        lastLogin: '2023-09-27 09:15',
        sessionsCompleted: 8,
        sessionDuration: 30,
        engagementScore: 72,
        impactScore: 65
      }
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@company.com',
      department: 'Operations',
      level: 'Emerging Talent',
      status: 'invited',
      joinDate: '2023-07-20',
      activity: {
        lastLogin: '2023-09-25 11:45',
        sessionsCompleted: 4,
        sessionDuration: 60,
        engagementScore: 63,
        impactScore: 58
      }
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Williams',
      email: 'emily.williams@company.com',
      department: 'HR',
      level: 'Other Employee',
      status: 'active',
      joinDate: '2023-04-10',
      activity: {
        lastLogin: '2023-09-28 16:20',
        sessionsCompleted: 15,
        sessionDuration: 55,
        engagementScore: 92,
        impactScore: 88
      }
    },
    {
      id: '5',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@company.com',
      department: 'IT',
      level: 'Emerging Talent',
      status: 'pending',
      joinDate: '2023-08-05',
      activity: {
        lastLogin: 'Never',
        sessionsCompleted: 0,
        sessionDuration: 0,
        engagementScore: 0,
        impactScore: 0
      }
    }
  ];

  // Department-wise engagement data for chart
  const departmentData = [
    { name: 'Marketing', score: 85 },
    { name: 'Finance', score: 72 },
    { name: 'Operations', score: 63 },
    { name: 'HR', score: 92 },
    { name: 'IT', score: 45 }
  ];

  // New level-wise engagement data for chart
  const levelData = [
    { name: 'Top Managers', score: 82 },
    { name: 'Managers', score: 76 },
    { name: 'Emerging Talent', score: 65 },
    { name: 'Other Employees', score: 58 }
  ];

  // Activity summary data - updated to include average impact
  const activitySummary = {
    totalSessions: 39,
    avgEngagement: 78,
    avgImpact: 67 // New metric for average impact (goal achievement percentage)
  };

  // Filter the employees based on search query and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get unique departments for filter dropdown
  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  // Get status badge styling based on status
  const getStatusBadge = (status: EmployeeStatus) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'invited':
        return <Badge className="bg-blue-500">Invited</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 md:px-8">
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

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-reneu-500 mr-2" />
                <div className="text-2xl font-bold">{activitySummary.totalSessions}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Across all employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-reneu-500 mr-2" />
                <div className="text-2xl font-bold">{activitySummary.avgEngagement}%</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Based on participation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-reneu-500 mr-2" />
                <div className="text-2xl font-bold">{activitySummary.avgImpact}%</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Goal achievement progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Charts Section */}
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

          {/* New Level Engagement Chart */}
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

        {/* Employee Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Employee Activity</CardTitle>
                <CardDescription>
                  Monitor engagement and session activity
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={filterDepartment}
                  onValueChange={setFilterDepartment}
                >
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-full sm:w-[120px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="invited">Invited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Activity</TableHead>
                    <TableHead className="text-right">Engagement</TableHead>
                    <TableHead className="text-right">Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length ? (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          <div>
                            {employee.firstName} {employee.lastName}
                            <div className="text-xs text-muted-foreground">{employee.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {getStatusBadge(employee.status)}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {employee.activity.lastLogin === 'Never' ? 
                            <span className="text-muted-foreground">Never logged in</span> : 
                            employee.activity.lastLogin}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="w-10 text-right mr-2">{employee.activity.engagementScore}%</div>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  employee.activity.engagementScore > 80 ? 'bg-green-500' : 
                                  employee.activity.engagementScore > 60 ? 'bg-blue-500' : 
                                  employee.activity.engagementScore > 30 ? 'bg-amber-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ width: `${employee.activity.engagementScore}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="w-10 text-right mr-2">{employee.activity.impactScore}%</div>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  employee.activity.impactScore > 80 ? 'bg-green-500' : 
                                  employee.activity.impactScore > 60 ? 'bg-blue-500' : 
                                  employee.activity.impactScore > 30 ? 'bg-amber-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ width: `${employee.activity.impactScore}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No employees found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HRDashboard;
