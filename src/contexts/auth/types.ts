
// User roles
export type UserRole = 'client' | 'coach' | 'admin' | 'hr';

// Compass data structure
export interface CompassData {
  purpose: string;
  coreValues: string[];
  dimensions: {
    work: {
      current: number;
      desired: number;
      notes: string;
    };
    mind: {
      current: number;
      desired: number;
      notes: string;
    };
    body: {
      current: number;
      desired: number;
      notes: string;
    };
  };
}

// User data structure
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  compassCompleted: boolean;
  compassData?: CompassData;
  hasReneuCoach?: boolean;
  hasBusinessCoach?: boolean;
  hasMindCoach?: boolean;
  hasBodyCoach?: boolean;
}

// Data for registration
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
  specialization?: string;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  testAccess: (requiredRole: UserRole) => Promise<void>;
  updateCompassStatus: (completed: boolean) => Promise<void>;
  updateCompassData: (data: CompassData) => Promise<void>;
  resetCompassData: () => Promise<void>;
  updateUserCoach: (coachType: string) => Promise<boolean | void>;
}
