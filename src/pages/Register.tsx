
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import MainLayout from '@/components/layout/MainLayout';

const Register = () => {
  const [userType, setUserType] = useState('client');

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
          <p className="text-muted-foreground text-center mb-8">
            Join MentorMatch to connect with expert coaches and accelerate your growth
          </p>
          
          <Tabs defaultValue="client" onValueChange={setUserType} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client">Client Account</TabsTrigger>
              <TabsTrigger value="coach">Coach Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="client">
              <Card>
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
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
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
                  <Button className="w-full">Create Account</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="coach">
              <Card>
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
                      <Input id="coachFirstName" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coachLastName">Last Name</Label>
                      <Input id="coachLastName" placeholder="Smith" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coachEmail">Email</Label>
                    <Input id="coachEmail" type="email" placeholder="jane.smith@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coachPassword">Password</Label>
                    <Input id="coachPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Primary Specialization</Label>
                    <select
                      id="specialization"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a specialization</option>
                      <option value="business">Business Coaching</option>
                      <option value="life">Life Coaching</option>
                      <option value="career">Career Development</option>
                      <option value="leadership">Leadership</option>
                      <option value="sports">Sports Performance</option>
                      <option value="nutrition">Nutrition</option>
                      <option value="mental">Mental Wellness</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="coachTerms" />
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
                  <Button className="w-full">Submit Application</Button>
                </CardFooter>
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
