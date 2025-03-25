
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-gradient">MentorMatch</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connecting professionals with expert coaches to develop skills, achieve goals, and reach their full potential.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" label="Twitter" />
              <SocialLink href="#" label="LinkedIn" />
              <SocialLink href="#" label="Instagram" />
              <SocialLink href="#" label="Facebook" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">For Clients</h3>
            <ul className="space-y-3">
              <FooterLink href="/coaches">Find a Coach</FooterLink>
              <FooterLink href="/how-it-works">How It Works</FooterLink>
              <FooterLink href="/pricing">Pricing Plans</FooterLink>
              <FooterLink href="/resources">Resources</FooterLink>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">For Coaches</h3>
            <ul className="space-y-3">
              <FooterLink href="/for-coaches">Become a Coach</FooterLink>
              <FooterLink href="/coach-resources">Coach Resources</FooterLink>
              <FooterLink href="/coach-pricing">Pricing & Payments</FooterLink>
              <FooterLink href="/coach-faq">Coach FAQ</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} MentorMatch. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap justify-center space-x-6">
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <Link 
      to={href} 
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, label }: { href: string, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
    aria-label={label}
  >
    <span className="sr-only">{label}</span>
    {/* Icon would go here */}
  </a>
);

export default Footer;
