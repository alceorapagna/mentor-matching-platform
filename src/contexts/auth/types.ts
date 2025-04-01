
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

// Define user types
export type UserRole = 'client' | 'coach' | 'admin' | 'hr';

// Compass data type
export interface CompassData {
  purpose: string;
  coreValues: string[];
  dimensions: {
    work: { current: number; desired: number; notes: string };
    mind: { current: number; desired: number; notes: string };
    body: { current: number; desired: number; notes: string };
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  compassCompleted?: boolean;
  compassData?: CompassData;
  // Coach relationships
  hasReneuCoach?: boolean;
  hasBusinessCoach?: boolean;
  hasMindCoach?: boolean;
  hasBodyCoach?: boolean;
  // HR assigned coaching flags
  isHRManaged?: boolean;
  hrAssignedCoachTypes?: string[];
}

// Registration data type
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  specialization?: string;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  testAccess: (role: UserRole) => void;
  updateCompassStatus: (completed: boolean) => Promise<void>;
  updateCompassData: (data: CompassData) => Promise<void>;
  resetCompassData: () => Promise<void>;
  updateUserCoach: (coachType: string) => Promise<void>;
}
