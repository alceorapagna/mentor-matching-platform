
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '../UserMenu';
import NavLinks from './NavLinks';

const DesktopNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLinks />
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <>
            <Link to="/hr-portal">
              <Button variant="outline" className="hover-transition">
                <Users className="mr-2 h-4 w-4" />
                HR Portal
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="hover-transition">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="premium-button">Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
