
import { CompassDimension } from '@/components/compass/types';

export type UserRole = 'client' | 'coach' | 'admin' | 'hr';

export interface CompassData {
  purpose: string;
  coreValues: string[];
  dimensions: {
    work: CompassDimension;
    mind: CompassDimension;
    body: CompassDimension;
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
  
  // Coach flags - both camelCase and database format for compatibility
  hasReneuCoach?: boolean;
  hasBusinessCoach?: boolean;
  hasMindCoach?: boolean;
  hasBodyCoach?: boolean;
  
  // Database format
  hasreneucoach?: boolean;
  hasbusinesscoach?: boolean;
  hasmindcoach?: boolean;
  hasbodycoach?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (data: RegisterData) => Promise<User | null>;
  logout: () => Promise<void>;
  testAccess: () => Promise<boolean>;
  updateCompassStatus: (completed: boolean) => Promise<void>;
  updateCompassData: (data: CompassData) => Promise<void>;
  resetCompassData: () => Promise<void>;
  updateUserCoach: (coachType: string) => Promise<boolean>;
}
