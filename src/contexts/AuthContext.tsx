
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, User, CompassData, RegisterData } from "./auth/types";
import { loginWithEmail, registerWithEmail, logoutUser } from "./auth/authFunctions";
import { updateUserCompassStatus, updateUserCompassData, resetUserCompassData } from "./auth/compassUtils";

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
  updateUserCoach: async () => {},
});

// This is a hook that components can use to access the auth context
export const useAuth = () => useContext(AuthContext);

// The provider component that wraps your app and makes auth object available
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      // For demo purposes, we'll check localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await loginWithEmail(email, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // If user hasn't completed compass, redirect to onboarding
      if (userData.role === 'client' && !userData.compassCompleted) {
        navigate('/reneu-compass');
      } else {
        // Redirect based on role
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
            navigate('/');
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const newUser = await registerWithEmail(userData);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      // Redirect to compass if client, otherwise to appropriate dashboard
      if (newUser.role === 'client') {
        navigate('/reneu-compass');
      } else {
        switch (newUser.role) {
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
            navigate('/');
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
    localStorage.removeItem("user");
    navigate('/login');
  };
  
  // Test function for protected routes
  const testAccess = (role: string) => {
    console.log(`Access test for role: ${role}`);
  };
  
  // Update compass completion status
  const updateCompassStatus = async (completed: boolean) => {
    if (!user) return;
    
    try {
      await updateUserCompassStatus(user.id, completed);
      
      // Update local user state
      const updatedUser = {
        ...user,
        compassCompleted: completed
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating compass status:", error);
      throw error;
    }
  };
  
  // Update compass data
  const updateCompassData = async (data: CompassData) => {
    if (!user) return;
    
    try {
      await updateUserCompassData(user.id, data);
      
      // Update local user state
      const updatedUser = {
        ...user,
        compassData: data,
        compassCompleted: true
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating compass data:", error);
      throw error;
    }
  };
  
  // Reset compass data (for testing/demo purposes)
  const resetCompassData = async () => {
    if (!user) return;
    
    try {
      await resetUserCompassData(user.id);
      
      // Update local user state
      const updatedUser = {
        ...user,
        compassData: undefined,
        compassCompleted: false
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error resetting compass data:", error);
      throw error;
    }
  };
  
  // Update user's coach status
  const updateUserCoach = async (coachType: string) => {
    if (!user) return;
    
    try {
      // Map coach type to the corresponding user property
      const coachTypeMapping: { [key: string]: string } = {
        'reneu': 'hasReneuCoach',
        'business': 'hasBusinessCoach',
        'mind': 'hasMindCoach',
        'body': 'hasBodyCoach'
      };
      
      const coachTypeKey = coachTypeMapping[coachType];
      
      if (!coachTypeKey) {
        throw new Error("Invalid coach type");
      }
      
      // Create an updated user object with the coach flag set to true
      const updatedUser = {
        ...user,
        [coachTypeKey]: true
      };
      
      // In a real app, this would include a database update
      // await updateUserCoachStatus(user.id, coachType, true);
      
      // Update local user state
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating user coach:", error);
      throw error;
    }
  };

  // Make the context object with all the methods and state
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    testAccess,
    updateCompassStatus,
    updateCompassData,
    resetCompassData,
    updateUserCoach
  };

  // Provide the context values to all child components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
