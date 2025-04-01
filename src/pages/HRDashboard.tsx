
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import DashboardHeader from '../components/hr-dashboard/DashboardHeader';
import OverviewCards from '../components/hr-dashboard/OverviewCards';
import EngagementCharts from '../components/hr-dashboard/EngagementCharts';
import EmployeeTable from '../components/hr-dashboard/EmployeeTable';
import { employeesData, departmentData, levelData, activitySummary } from '../components/hr-dashboard/mockData';

const HRDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter the employees based on search query and filters
  const filteredEmployees = employeesData.filter(employee => {
    const matchesSearch = 
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get unique departments for filter dropdown
  const departments = Array.from(new Set(employeesData.map(emp => emp.department)));

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 md:px-8">
        <DashboardHeader />
        
        {/* Overview Cards */}
        <OverviewCards 
          totalSessions={activitySummary.totalSessions}
          avgEngagement={activitySummary.avgEngagement}
          avgImpact={activitySummary.avgImpact}
        />

        {/* Charts Section */}
        <EngagementCharts 
          departmentData={departmentData}
          levelData={levelData}
        />

        {/* Employee Table */}
        <EmployeeTable 
          employees={filteredEmployees}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterDepartment={filterDepartment}
          setFilterDepartment={setFilterDepartment}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          departments={departments}
        />
      </div>
    </MainLayout>
  );
};

export default HRDashboard;
