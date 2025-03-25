import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Briefcase, Brain, Dumbbell, Users } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gradient">Reneu</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-4">
              <Link to="/hr-portal">
                <Button variant="outline" className="hover-transition">
                  <Users className="mr-2 h-4 w-4" />
                  HR Portal
                </Button>
              </Link>
              <Link to="/session/123">
                <Button variant="outline" className="hover-transition">
                  Test Session
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="hover-transition">
                  Test Dashboard
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
            </div>
          </nav>

          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavLinks closeMenu={() => setIsMenuOpen(false)} />
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <Link to="/hr-portal" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    HR Portal
                  </Button>
                </Link>
                <Link to="/session/123" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    Test Session
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    Test Dashboard
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

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
    <Link to="/coaches" className="hover:text-primary transition-colors">
      Find Coaches
    </Link>
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

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
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
      <Link to="/coaches" className="py-2 block" onClick={closeMenu}>
        Find Coaches
      </Link>
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

export default Navbar;
