
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './auth/types';
import { useAuthProvider } from './auth/useAuthProvider';

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Re-export types from the auth types module
export type { User, UserRole, CompassData, RegisterData, AuthContextType } from './auth/types';
