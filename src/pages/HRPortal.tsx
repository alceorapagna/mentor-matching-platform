
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import PortalHeader from '@/components/hr-portal/PortalHeader';
import EmployeeStats from '@/components/hr-portal/EmployeeStats';
import QuickActions from '@/components/hr-portal/QuickActions';
import AddEmployeeForm from '@/components/hr-portal/AddEmployeeForm';
import EmployeeDirectory from '@/components/hr-portal/EmployeeDirectory';
import { Employee } from '@/components/hr-portal/types';
import { toast } from 'sonner';

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
  
  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
  };
  
  const handleBulkUpload = (newEmployees: Employee[]) => {
    setEmployees([...employees, ...newEmployees]);
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
  
  const handleAddTabClick = () => {
    document.getElementById('add-tab')?.click();
  };
  
  const handleBulkTabClick = () => {
    document.getElementById('bulk-tab')?.click();
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 md:px-8">
        <PortalHeader onGenerateLinks={handleGenerateLinks} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <EmployeeStats employees={employees} />
          <QuickActions 
            onAddEmployeeClick={handleAddTabClick} 
            onBulkUploadClick={handleBulkTabClick} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AddEmployeeForm 
            onAddEmployee={handleAddEmployee}
            onBulkUpload={handleBulkUpload}
          />
          <EmployeeDirectory 
            employees={employees} 
            onRemoveEmployee={handleRemoveEmployee} 
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default HRPortal;
