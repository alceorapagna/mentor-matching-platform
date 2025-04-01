
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Employee, EmployeeStatus } from './types';

interface EmployeeTableProps {
  employees: Employee[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterDepartment: string;
  setFilterDepartment: (department: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  departments: string[];
}

const EmployeeTable = ({
  employees,
  searchQuery,
  setSearchQuery,
  filterDepartment,
  setFilterDepartment,
  filterStatus,
  setFilterStatus,
  departments
}: EmployeeTableProps) => {
  
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
              {employees.length ? (
                employees.map((employee) => (
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
  );
};

export default EmployeeTable;
