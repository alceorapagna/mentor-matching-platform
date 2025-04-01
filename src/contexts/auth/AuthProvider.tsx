
import { createContext, useContext, ReactNode } from 'react';
import { AuthContextType, User } from './types';
import { useAuthProvider } from './useAuthProvider';

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => null,
  register: async () => null,
  logout: async () => Promise.resolve(),
  testAccess: async () => Promise.resolve(false),
  updateCompassStatus: async () => {},
  updateCompassData: async () => {},
  resetCompassData: async () => {},
  updateUserCoach: async () => false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
