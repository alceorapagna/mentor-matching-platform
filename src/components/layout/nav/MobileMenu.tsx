
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import MobileNavLinks from './MobileNavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isAuthenticated, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg animate-fade-in">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex flex-col space-y-4">
          <MobileNavLinks closeMenu={onClose} />
          <div className="flex flex-col space-y-3 pt-4 border-t">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <Link to="/dashboard" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-start">
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/hr-portal" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    HR Portal
                  </Button>
                </Link>
                <Link to="/login" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={onClose}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
