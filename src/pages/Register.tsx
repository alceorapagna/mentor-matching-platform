
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth, RegisterData } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('client');
  const { register, isAuthenticated, isLoading } = useAuth();
  
  // Client form state
  const [clientData, setClientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    termsAccepted: false
  });
  
  // Coach form state
  const [coachData, setCoachData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    specialization: '',
    termsAccepted: false
  });

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientData.termsAccepted) {
      toast.error('You must accept the terms to create an account');
      return;
    }
    
    const userData: RegisterData = {
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      email: clientData.email,
      password: clientData.password,
      role: 'client'
    };
    
    await register(userData);
  };
  
  const handleCoachSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!coachData.termsAccepted) {
      toast.error('You must accept the terms to create an account');
      return;
    }
    
    if (!coachData.specialization) {
      toast.error('Please select your specialization');
      return;
    }
    
    const userData: RegisterData = {
      firstName: coachData.firstName,
      lastName: coachData.lastName,
      email: coachData.email,
      password: coachData.password,
      role: 'coach',
      specialization: coachData.specialization
    };
    
    await register(userData);
  };
  
  const updateClientData = (field: string, value: string | boolean) => {
    setClientData(prev => ({ ...prev, [field]: value }));
  };
  
  const updateCoachData = (field: string, value: string | boolean) => {
    setCoachData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
          <p className="text-muted-foreground text-center mb-8">
            Join Reneu to connect with expert coaches and accelerate your growth
          </p>
          
          <Tabs defaultValue="client" value={userType} onValueChange={setUserType} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client">Client Account</TabsTrigger>
              <TabsTrigger value="coach">Coach Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="client">
              <Card>
                <form onSubmit={handleClientSubmit}>
                  <CardHeader>
                    <CardTitle>Client Registration</CardTitle>
                    <CardDescription>
                      Create an account to find and connect with coaches
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John"
                          value={clientData.firstName}
                          onChange={(e) => updateClientData('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe"
                          value={clientData.lastName}
                          onChange={(e) => updateClientData('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john.doe@example.com"
                        value={clientData.email}
                        onChange={(e) => updateClientData('email', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password"
                        value={clientData.password}
                        onChange={(e) => updateClientData('password', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={clientData.termsAccepted}
                        onCheckedChange={(checked) => updateClientData('termsAccepted', checked === true)}
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading || !clientData.termsAccepted}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="coach">
              <Card>
                <form onSubmit={handleCoachSubmit}>
                  <CardHeader>
                    <CardTitle>Coach Application</CardTitle>
                    <CardDescription>
                      Apply to join our network of professional coaches
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="coachFirstName">First Name</Label>
                        <Input 
                          id="coachFirstName" 
                          placeholder="Jane"
                          value={coachData.firstName}
                          onChange={(e) => updateCoachData('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coachLastName">Last Name</Label>
                        <Input 
                          id="coachLastName" 
                          placeholder="Smith"
                          value={coachData.lastName}
                          onChange={(e) => updateCoachData('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="coachEmail">Email</Label>
                      <Input 
                        id="coachEmail" 
                        type="email" 
                        placeholder="jane.smith@example.com"
                        value={coachData.email}
                        onChange={(e) => updateCoachData('email', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="coachPassword">Password</Label>
                      <Input 
                        id="coachPassword" 
                        type="password"
                        value={coachData.password}
                        onChange={(e) => updateCoachData('password', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Primary Specialization</Label>
                      <Select 
                        value={coachData.specialization} 
                        onValueChange={(value) => updateCoachData('specialization', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business Coaching</SelectItem>
                          <SelectItem value="life">Life Coaching</SelectItem>
                          <SelectItem value="career">Career Development</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                          <SelectItem value="sports">Sports Performance</SelectItem>
                          <SelectItem value="nutrition">Nutrition</SelectItem>
                          <SelectItem value="mental">Mental Wellness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="coachTerms" 
                        checked={coachData.termsAccepted}
                        onCheckedChange={(checked) => updateCoachData('termsAccepted', checked === true)}
                        required
                      />
                      <label
                        htmlFor="coachTerms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>,{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>, and{" "}
                        <Link to="/coach-terms" className="text-primary hover:underline">
                          Coach Guidelines
                        </Link>
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading || !coachData.termsAccepted}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
