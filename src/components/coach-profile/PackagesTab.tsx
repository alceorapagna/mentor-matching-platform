
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, FileCheck, Users, User } from "lucide-react";
import { Coach } from "./types";

interface PackagesTabProps {
  coach: Coach;
  selectedPackage: string | null;
  setSelectedPackage: (pkg: string) => void;
}

const PackagesTab = ({ coach, selectedPackage, setSelectedPackage }: PackagesTabProps) => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">Coaching Packages</h2>
        <p className="text-muted-foreground mb-6">
          Our coaching packages are designed to provide flexible options for organizations of all sizes.
          Whether you need coaching for individual team members or comprehensive team development, we have solutions to fit your needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coach.packages.map((pkg) => (
            <Card key={pkg.id} className={pkg.id === 2 ? "border-primary border-2" : ""}>
              {pkg.id === 2 && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-lg font-semibold flex items-center gap-2">
                    {pkg.type === 'team-member' ? (
                      <User className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Users className="h-5 w-5 text-muted-foreground" />
                    )}
                    {pkg.type === 'team-member' ? 'Individual Coaching' : 'Team Coaching'}
                  </span>
                </div>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={selectedPackage === pkg.name ? "default" : "outline"}
                  onClick={() => setSelectedPackage(pkg.name)}
                >
                  {selectedPackage === pkg.name ? "Selected" : "Select Package"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Custom Enterprise Solutions</h3>
        <p className="text-muted-foreground mb-4">
          For larger organizations or specialized needs, we offer custom coaching solutions tailored to your specific requirements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {coach.customSolutions?.map((solution, index) => (
            <div key={index} className="flex items-start gap-2">
              <FileCheck className="h-5 w-5 text-primary mt-0.5" />
              <span>{solution}</span>
            </div>
          ))}
        </div>
        <Button>Request Custom Proposal</Button>
      </div>
    </div>
  );
};

export default PackagesTab;
