
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // If still loading authentication state, you might want to show a loading spinner
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If roles are specified, check if user has permission
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate page based on role
    switch (user.role) {
      case 'client':
        return <Navigate to="/dashboard" replace />;
      case 'coach':
        return <Navigate to="/coach-dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'hr':
        return <Navigate to="/hr-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }
  
  // If authenticated and authorized, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
