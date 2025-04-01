
import { Employee, ChartDataItem } from './types';

// Dummy data for employees
export const employeesData: Employee[] = [
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
export const departmentData: ChartDataItem[] = [
  { name: 'Marketing', score: 85 },
  { name: 'Finance', score: 72 },
  { name: 'Operations', score: 63 },
  { name: 'HR', score: 92 },
  { name: 'IT', score: 45 }
];

// Level-wise engagement data for chart
export const levelData: ChartDataItem[] = [
  { name: 'Top Managers', score: 82 },
  { name: 'Managers', score: 76 },
  { name: 'Emerging Talent', score: 65 },
  { name: 'Other Employees', score: 58 }
];

// Activity summary data
export const activitySummary = {
  totalSessions: 39,
  avgEngagement: 78,
  avgImpact: 67
};
