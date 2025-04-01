
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface QuickAccessOption {
  label: string;
  role: string;
  path: string;
  directNav?: boolean;
}

interface QuickAccessProps {
  onQuickAccess: (option: QuickAccessOption) => void;
}

const QuickAccess = ({ onQuickAccess }: QuickAccessProps) => {
  const quickAccessOptions: QuickAccessOption[] = [
    { label: 'Client Dashboard', role: 'client', path: '/dashboard' },
    { label: 'Coach Dashboard', role: 'coach', path: '/coach-dashboard' },
    { label: 'Admin Dashboard', role: 'admin', path: '/admin' },
    { label: 'HR Dashboard', role: 'hr', path: '/hr-dashboard' },
    { label: 'Coaching Session', role: 'client', path: '/session/test-session-1', directNav: true },
    { label: 'Reneu Compass', role: 'client', path: '/reneu-compass' },
  ];

  return (
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
            onClick={() => onQuickAccess(option)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <p className="text-xs text-amber-600 mt-2">
        Bypass login and directly access protected pages for testing
      </p>
    </div>
  );
};

export default QuickAccess;
