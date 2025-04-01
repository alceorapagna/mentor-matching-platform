
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface DemoAccountsProps {
  onDemoLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const DemoAccounts = ({ onDemoLogin, isLoading }: DemoAccountsProps) => {
  const demoAccounts = [
    { label: 'Client Demo', email: 'client@example.com', password: 'password123' },
    { label: 'Coach Demo', email: 'coach@example.com', password: 'password123' },
    { label: 'Admin Demo', email: 'admin@example.com', password: 'password123' },
    { label: 'HR Demo', email: 'hr@example.com', password: 'password123' },
  ];

  return (
    <div className="mt-8 border rounded-lg p-4">
      <h3 className="text-sm font-medium mb-2">Demo Accounts</h3>
      <div className="grid grid-cols-2 gap-2">
        {demoAccounts.map((account) => (
          <Button
            key={account.email}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onDemoLogin(account.email, account.password)}
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
  );
};

export default DemoAccounts;
