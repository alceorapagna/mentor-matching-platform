
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Settings, LayoutDashboard, UserCog, Building, RefreshCcw } from 'lucide-react';

const UserMenu = () => {
  const { user, logout, resetCompassData } = useAuth();
  
  if (!user) return null;
  
  // Generate initials for the avatar fallback
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  
  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'coach':
        return '/coach-dashboard';
      case 'hr':
        return '/hr-dashboard';
      default:
        return '/dashboard';
    }
  };
  
  const handleResetOnboarding = () => {
    if (confirm('Are you sure you want to reset your onboarding data? This will clear your Reneu Compass assessment.')) {
      resetCompassData();
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar className="h-9 w-9 border-2 border-primary/10">
          <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={getDashboardLink()} className="flex items-center cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        
        {/* Role-specific menu items */}
        {user.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link to="/admin/users" className="flex items-center cursor-pointer">
              <UserCog className="mr-2 h-4 w-4" />
              Manage Users
            </Link>
          </DropdownMenuItem>
        )}
        
        {user.role === 'hr' && (
          <DropdownMenuItem asChild>
            <Link to="/hr-portal" className="flex items-center cursor-pointer">
              <Building className="mr-2 h-4 w-4" />
              HR Portal
            </Link>
          </DropdownMenuItem>
        )}
        
        {/* Reset onboarding option (for testing purposes) */}
        {user.role === 'client' && (
          <DropdownMenuItem onClick={handleResetOnboarding} className="flex items-center cursor-pointer">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset Onboarding
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
