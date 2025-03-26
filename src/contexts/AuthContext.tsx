
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user types
export type UserRole = 'client' | 'coach' | 'admin' | 'hr';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
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

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Mock user data - in a real app, this would come from an API/database
const MOCK_USERS = [
  {
    id: '1',
    email: 'client@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'client' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  {
    id: '2',
    email: 'coach@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'coach' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: 'password123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as UserRole,
  },
  {
    id: '4',
    email: 'hr@example.com',
    password: 'password123',
    firstName: 'HR',
    lastName: 'Manager',
    role: 'hr' as UserRole,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check if the user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('reneu_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('reneu_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // Mock login for demo purposes
      const mockUser = MOCK_USERS.find(u => u.email === email);
      
      if (!mockUser || mockUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Extract user data (excluding password)
      const { password: _, ...userData } = mockUser;
      
      // Store user in state and localStorage
      setUser(userData);
      localStorage.setItem('reneu_user', JSON.stringify(userData));
      
      toast.success('Logged in successfully');
      
      // Redirect based on user role
      switch (userData.role) {
        case 'client':
          navigate('/dashboard');
          break;
        case 'coach':
          navigate('/coach-dashboard');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'hr':
          navigate('/hr-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      // In a real app, this would be an API call to create a user
      // For now, just simulate a successful registration
      
      // Create a new user object (excluding password for the state)
      const newUser: User = {
        id: `user_${Date.now()}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`,
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem('reneu_user', JSON.stringify(newUser));
      
      toast.success('Account created successfully');
      
      // Redirect based on user role
      if (userData.role === 'client') {
        navigate('/dashboard');
      } else if (userData.role === 'coach') {
        toast.info('Your coach application is under review');
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('reneu_user');
    toast.info('Logged out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
