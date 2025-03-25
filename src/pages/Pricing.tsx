
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for you and start your journey to personal and professional growth with MentorMatch.
          </p>
        </div>
        
        {/* Billing toggle */}
        <div className="flex justify-center mb-16">
          <ToggleGroup type="single" value={billingPeriod} onValueChange={(value) => value && setBillingPeriod(value)}>
            <ToggleGroupItem value="monthly" aria-label="Monthly billing">
              Monthly
            </ToggleGroupItem>
            <ToggleGroupItem value="annual" aria-label="Annual billing">
              Annual <span className="text-xs ml-2 bg-primary/20 text-primary px-2 py-0.5 rounded-full">20% off</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Basic Plan */}
          <div className="border rounded-xl p-6 hover:shadow-md transition-all">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Basic</h2>
              <p className="text-muted-foreground mt-2">Get started with coaching</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">${billingPeriod === 'monthly' ? '29' : '23'}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-sm text-muted-foreground mt-1">Billed as ${23 * 12} annually</p>
              )}
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Access to 5 coaching sessions/month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Session length: 30 minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Browse all coach profiles</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Basic progress tracking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Email support</span>
              </li>
            </ul>
            
            <Link to="/register">
              <Button variant="outline" className="w-full group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {/* Pro Plan */}
          <div className="border border-primary rounded-xl p-6 shadow-md relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-primary rounded-t-xl"></div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded text-xs font-bold">
              MOST POPULAR
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Pro</h2>
              <p className="text-muted-foreground mt-2">For committed personal growth</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">${billingPeriod === 'monthly' ? '79' : '63'}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-sm text-muted-foreground mt-1">Billed as ${63 * 12} annually</p>
              )}
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Access to 10 coaching sessions/month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Session length: 45 minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Priority booking with coaches</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Advanced progress tracking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Chat messaging with coaches</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Personalized action plans</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
            </ul>
            
            <Link to="/register">
              <Button className="w-full group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {/* Enterprise Plan */}
          <div className="border rounded-xl p-6 hover:shadow-md transition-all">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Enterprise</h2>
              <p className="text-muted-foreground mt-2">For teams and organizations</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Contact us for pricing</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Unlimited coaching sessions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Session length: 60 minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Dedicated coach assignment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Group coaching sessions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Team progress analytics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Custom reporting</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>API access</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Dedicated account manager</span>
              </li>
            </ul>
            
            <Link to="/contact">
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Feature comparison */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Compare Features</h2>
          
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 font-medium">Basic</th>
                  <th className="text-center py-4 px-4 font-medium">Pro</th>
                  <th className="text-center py-4 px-4 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4">Monthly sessions</td>
                  <td className="text-center py-4 px-4">5</td>
                  <td className="text-center py-4 px-4">10</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Session duration</td>
                  <td className="text-center py-4 px-4">30 min</td>
                  <td className="text-center py-4 px-4">45 min</td>
                  <td className="text-center py-4 px-4">60 min</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      Coach specializations
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">The types of coaching specializations available in each plan</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">Limited</td>
                  <td className="text-center py-4 px-4">All</td>
                  <td className="text-center py-4 px-4">All + Exclusive</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Chat messaging</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Progress tracking</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4">Advanced</td>
                  <td className="text-center py-4 px-4">Advanced + Analytics</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Resource library</td>
                  <td className="text-center py-4 px-4">Limited</td>
                  <td className="text-center py-4 px-4">Full</td>
                  <td className="text-center py-4 px-4">Full + Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Group sessions</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">API access</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">Support</td>
                  <td className="text-center py-4 px-4">Email</td>
                  <td className="text-center py-4 px-4">Priority</td>
                  <td className="text-center py-4 px-4">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Can I change plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be prorated for the remainder of your billing cycle.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Is there a contract or commitment?</h3>
              <p className="text-muted-foreground">
                No long-term contracts. All plans are subscription-based and can be canceled at any time. Annual plans are paid upfront for the full year.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are securely processed.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Can I get a refund if I'm not satisfied?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee for new subscribers. If you're not satisfied with our service, contact support within 14 days of your initial purchase.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Do you offer discounts for students or non-profits?</h3>
              <p className="text-muted-foreground">
                Yes, we offer special pricing for students, educators, and non-profit organizations. Contact our support team for more information.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-medium">What if I need more sessions than my plan allows?</h3>
              <p className="text-muted-foreground">
                You can purchase additional coaching sessions as needed without changing your plan, or upgrade to a higher tier for more regular sessions.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary/10 rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Coaching Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Choose the plan that works best for you and start your personal and professional development today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
