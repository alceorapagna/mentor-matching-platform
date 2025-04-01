
import { Link } from 'react-router-dom';
import { ChevronDown, Briefcase, Brain, Dumbbell } from 'lucide-react';

const NavLinks = () => (
  <>
    <div className="relative group">
      <button className="flex items-center space-x-1 hover:text-primary transition-colors">
        <span>Reneu Framework</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="absolute left-0 mt-2 w-48 p-2 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
        <Link to="/framework/work" className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors">
          <Briefcase className="h-4 w-4 mr-2" />
          Work
        </Link>
        <Link to="/framework/mind" className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors">
          <Brain className="h-4 w-4 mr-2" />
          Mind
        </Link>
        <Link to="/framework/body" className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors">
          <Dumbbell className="h-4 w-4 mr-2" />
          Body
        </Link>
      </div>
    </div>
    <Link to="/how-it-works" className="hover:text-primary transition-colors">
      How It Works
    </Link>
    <Link to="/for-coaches" className="hover:text-primary transition-colors">
      For Coaches
    </Link>
    <Link to="/pricing" className="hover:text-primary transition-colors">
      Pricing
    </Link>
  </>
);

export default NavLinks;
