
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortalHeaderProps {
  onGenerateLinks: () => void;
}

const PortalHeader = ({ onGenerateLinks }: PortalHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-reneu-500">HR Portal</h1>
        <p className="text-muted-foreground mt-2">Manage employee access to Reneu Coaching Platform</p>
      </div>
      <div className="flex gap-3">
        <Link to="/hr-dashboard">
          <Button variant="outline" className="gap-2">
            <BarChart size={16} />
            View Dashboard
          </Button>
        </Link>
        <Button onClick={onGenerateLinks} className="gap-2">
          <UserPlus size={16} />
          Generate Links & Send Invites
        </Button>
      </div>
    </div>
  );
};

export default PortalHeader;
