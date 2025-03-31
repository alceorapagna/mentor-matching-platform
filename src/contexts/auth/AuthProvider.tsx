
import { createContext, useContext, ReactNode } from 'react';
import { AuthContextType } from './types';
import useAuthProvider from './useAuthProvider';

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  testAccess: () => {},
  updateCompassStatus: async () => {},
  updateCompassData: async () => {},
  resetCompassData: async () => {},
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
