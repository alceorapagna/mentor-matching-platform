
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Briefcase, Brain, Dumbbell } from 'lucide-react';

interface MobileNavLinksProps {
  closeMenu: () => void;
}

const MobileNavLinks = ({ closeMenu }: MobileNavLinksProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  return (
    <>
      <div>
        <button 
          className="flex items-center justify-between w-full py-2"
          onClick={() => toggleCategory('framework')}
        >
          <span>Reneu Framework</span>
          <ChevronDown className={`h-4 w-4 transform transition-transform ${
            expandedCategory === 'framework' ? 'rotate-180' : ''
          }`} />
        </button>
        {expandedCategory === 'framework' && (
          <div className="pl-4 space-y-2 mt-2 mb-2 border-l-2 border-muted animate-slide-down">
            <Link to="/framework/work" className="flex items-center py-2" onClick={closeMenu}>
              <Briefcase className="h-4 w-4 mr-2" />
              Work
            </Link>
            <Link to="/framework/mind" className="flex items-center py-2" onClick={closeMenu}>
              <Brain className="h-4 w-4 mr-2" />
              Mind
            </Link>
            <Link to="/framework/body" className="flex items-center py-2" onClick={closeMenu}>
              <Dumbbell className="h-4 w-4 mr-2" />
              Body
            </Link>
          </div>
        )}
      </div>
      <Link to="/how-it-works" className="py-2 block" onClick={closeMenu}>
        How It Works
      </Link>
      <Link to="/for-coaches" className="py-2 block" onClick={closeMenu}>
        For Coaches
      </Link>
      <Link to="/pricing" className="py-2 block" onClick={closeMenu}>
        Pricing
      </Link>
    </>
  );
};

export default MobileNavLinks;
