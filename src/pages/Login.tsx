
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isAuthenticated, isLoading, testAccess } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await login(email, password);
  };

  const demoAccounts = [
    { label: 'Client Demo', email: 'client@example.com', password: 'password123' },
    { label: 'Coach Demo', email: 'coach@example.com', password: 'password123' },
    { label: 'Admin Demo', email: 'admin@example.com', password: 'password123' },
    { label: 'HR Demo', email: 'hr@example.com', password: 'password123' },
  ];

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    await login(demoEmail, demoPassword);
  };

  // Updated quick access options with direct navigation for coaching session
  const quickAccessOptions = [
    { label: 'Client Dashboard', role: 'client', path: '/dashboard' },
    { label: 'Coach Dashboard', role: 'coach', path: '/coach-dashboard' },
    { label: 'Admin Dashboard', role: 'admin', path: '/admin' },
    { label: 'HR Dashboard', role: 'hr', path: '/hr-dashboard' },
    { label: 'Coaching Session', role: 'client', path: '/session/test-session-1', directNav: true },
    { label: 'Reneu Compass', role: 'client', path: '/reneu-compass' },
  ];

  // Updated handler for quick access that supports direct navigation
  const handleQuickAccess = (option: any) => {
    if (option.directNav) {
      // For session page, first grant access then navigate
      testAccess(option.role as any);
      setTimeout(() => navigate(option.path), 100);
    } else {
      // For other pages, just use testAccess which does its own navigation
      testAccess(option.role as any);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8">
            Sign in to your Reneu account
          </p>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Log In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full mb-4" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </Button>
                
                <div className="relative w-full flex items-center justify-center text-xs uppercase text-muted-foreground my-2">
                  <div className="border-t border-border flex-grow mr-3"></div>
                  <span>Or continue with</span>
                  <div className="border-t border-border flex-grow ml-3"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button variant="outline">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8 border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Demo Accounts</h3>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account) => (
                <Button
                  key={account.email}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleDemoLogin(account.email, account.password)}
                  disabled={isLoading}
                >
                  {account.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click any button above to instantly log in with a demo account
            </p>
          </div>
          
          <div className="mt-8 border rounded-lg border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-medium text-amber-700">Quick Access (For Testing)</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickAccessOptions.map((option) => (
                <Button
                  key={option.path}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-amber-100 border-amber-200 text-amber-800 hover:bg-amber-200"
                  onClick={() => handleQuickAccess(option)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-amber-600 mt-2">
              Bypass login and directly access protected pages for testing
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
