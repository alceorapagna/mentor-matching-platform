
export type EmployeeStatus = 'active' | 'pending' | 'invited';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  level: string;
  activity: {
    lastLogin: string;
    sessionsCompleted: number;
    sessionDuration: number;
    engagementScore: number;
    impactScore: number;
  };
  status: EmployeeStatus;
  joinDate: string;
}

export interface ChartDataItem {
  name: string;
  score: number;
}
