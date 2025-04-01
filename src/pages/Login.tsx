
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/login/LoginForm';
import DemoAccounts from '@/components/auth/login/DemoAccounts';
import QuickAccess from '@/components/auth/login/QuickAccess';

const Login = () => {
  const { isAuthenticated, login, testAccess } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // Handle demo login
  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    await login(demoEmail, demoPassword);
  };

  // Handle quick access
  const handleQuickAccess = (option: any) => {
    // Call testAccess with the role
    testAccess(option.role);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8">
            Sign in to your Reneu account
          </p>
          
          <LoginForm />
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <DemoAccounts 
            onDemoLogin={handleDemoLogin} 
            isLoading={false} 
          />
          
          <QuickAccess 
            onQuickAccess={handleQuickAccess}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
