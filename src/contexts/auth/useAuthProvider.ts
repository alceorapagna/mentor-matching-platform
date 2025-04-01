
import { useAuthentication } from './hooks/useAuthentication';
import { useAuthActions } from './hooks/useAuthActions';
import { useCompassActions } from './hooks/useCompassActions';
import { useCoachActions } from './hooks/useCoachActions';
import { AuthContextType, User } from './types';

export const useAuthProvider = (): AuthContextType => {
  // Load authentication state and basic utilities
  const { 
    user, 
    setUser, 
    isLoading, 
    setIsLoading, 
    navigate, 
    toast 
  } = useAuthentication();

  // Load authentication actions
  const { 
    login, 
    register, 
    logout, 
    testAccess 
  } = useAuthActions({ 
    user, 
    setUser, 
    setIsLoading, 
    navigate, 
    toast 
  });

  // Load compass-related actions
  const { 
    updateCompassStatus, 
    updateCompassData, 
    resetCompassData 
  } = useCompassActions(
    user, 
    setUser 
  );

  // Load coach-related actions
  const { 
    updateUserCoach 
  } = useCoachActions(
    user, 
    setUser 
  );

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
    resetCompassData,
    updateUserCoach
  };
};
