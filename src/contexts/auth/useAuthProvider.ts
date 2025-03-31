
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { User, AuthContextType } from './types';
import { fetchUserProfile } from './utils';
import { login as loginUser, register as registerUser, logout as logoutUser, testAccess as testAccessUser } from './authFunctions';
import { updateCompassStatus as updateUserCompassStatus, updateCompassData as updateUserCompassData, resetCompassData as resetUserCompassData } from './compassUtils';

const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state and listen for changes
  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile data after a short delay to avoid deadlocks
          setTimeout(() => {
            fetchUserProfile(session.user.id, setUser, setIsLoading);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      
      if (session?.user) {
        fetchUserProfile(session.user.id, setUser, setIsLoading);
      } else {
        setIsLoading(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Wrapper functions to inject state into the extracted functions
  const login = async (email: string, password: string) => {
    return loginUser(email, password, navigate, setUser, setIsLoading);
  };

  const register = async (userData: any) => {
    return registerUser(userData, navigate, setUser, setIsLoading);
  };

  const logout = () => {
    return logoutUser(navigate);
  };

  const testAccess = (role: any) => {
    return testAccessUser(role, navigate, setUser);
  };

  const updateCompassStatus = async (completed: boolean) => {
    return updateUserCompassStatus(user, setUser, completed);
  };

  const updateCompassData = async (data: any) => {
    return updateUserCompassData(user, setUser, data);
  };

  const resetCompassData = async () => {
    return resetUserCompassData(user, setUser, setIsLoading, navigate);
  };

  return {
    user, 
    isAuthenticated: !!user, 
    isLoading,
    login, 
    register, 
    logout,
    testAccess,
    updateCompassStatus,
    updateCompassData,
    resetCompassData
  };
};

export default useAuthProvider;
