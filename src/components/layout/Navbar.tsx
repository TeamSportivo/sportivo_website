import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, Home, Users, Calendar, Image, Handshake, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon?: LucideIcon;
}

interface NavDropdown extends NavItem {
  dropdown: true;
  items: { name: string; path: string; }[];
}

type NavLink = NavItem | NavDropdown;

const isNavDropdown = (link: NavLink): link is NavDropdown => {
  return 'dropdown' in link && link.dropdown === true;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Users },
    { name: 'Our Committee', path: '#', dropdown: true, items: [
      { name: 'Mentors', path: '/teams/mentors' },
      { name: 'Core Committee', path: '/teams/cc' },
      { name: 'Working Committee', path: '/teams/wc' },
      { name: 'Volunteers', path: '/teams/volunteers' },
    ]},
    { name: 'Fests', path: '#', dropdown: true, items: [
      { name: 'Vibgyor', path: '/vibgyor' },
      { name: 'Xaplotes', path: '/xaplotes' },
     
    ]},
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'Sponsors', path: '/sponsors', icon: Handshake },
    { name: 'Contact Us', path: '/contact', icon: Phone },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
          scrolled 
            ? "bg-white shadow-lg" 
            : "bg-white/95 backdrop-blur-md"
        )}
      >
        <div className="max-w-full mx-auto flex items-center justify-between px-6 py-4">
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <img src="/sportivo.gif" alt="Team Sportivo Logo" className="h-12 w-auto rounded-full object-contain" />
            <span className="font-display text-2xl font-bold text-primary tracking-tight group-hover:text-primary/80 transition-colors">
              Team Sportivo
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              !isNavDropdown(link) ? (
                <Link
                  key={index}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group",
                    location.pathname === link.path 
                      ? "text-primary font-semibold" 
                      : "text-gray-800 hover:text-primary"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-200",
                    "group-hover:scale-x-100",
                    location.pathname === link.path && "scale-x-100"
                  )} />
                </Link>
              ) : (
                <div key={index} className="relative group">
                  <button className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-gray-800 hover:text-primary flex items-center gap-1">
                    {link.name}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 top-full mt-1 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-1 rounded-lg bg-white overflow-hidden">
                      {link.items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors">
                      <span className="text-primary font-semibold text-lg">
                        {user.email?.[0].toUpperCase() || 'U'}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                        <p className="text-xs leading-none text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Join Us
                </Link>
              </>
            )}
            <img 
              src="/future-logo.jpg" 
              alt="Future Institute Logo" 
              className="h-12 w-auto object-contain ml-4 rounded-xl"
            />
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-800 hover:text-primary focus:outline-none p-2 rounded-md hover:bg-primary/5 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 lg:hidden transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Link 
            to="/" 
            className="font-display text-2xl font-bold text-primary tracking-tight"
          >
            Team Sportivo
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md hover:bg-primary/5 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link, index) => (
              !isNavDropdown(link) ? (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                    "hover:bg-primary/5 hover:text-primary active:bg-primary/10",
                    location.pathname === link.path 
                      ? "text-primary bg-primary/5" 
                      : "text-gray-800"
                  )}
                >
                  {link.icon && <link.icon className="h-5 w-5" />}
                  {link.name}
                </Link>
              ) : (
                <div key={index} className="flex flex-col">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <Users className="h-5 w-5" />
                    {link.name}
                    <ChevronDown className={cn(
                      "h-5 w-5 ml-auto transition-transform duration-200",
                      activeDropdown === link.name && "rotate-180"
                    )} />
                  </button>
                  <div className={cn(
                    "overflow-hidden transition-all duration-200",
                    activeDropdown === link.name ? "max-h-96" : "max-h-0"
                  )}>
                    <div className="pl-12 flex flex-col gap-1 py-2">
                      {link.items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary/5 hover:text-primary active:bg-primary/10 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            ))}
          </nav>
        </div>
        
        <div className="border-t p-4">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/5">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-primary/5">
                  <span className="text-primary font-semibold text-xl">
                    {user.email?.[0].toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full mt-3 px-4 py-3 rounded-lg text-base font-medium text-red-600 border border-red-200 hover:bg-red-50 active:bg-red-100 text-center transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 rounded-lg text-base font-medium text-primary border border-primary/30 hover:bg-primary/5 active:bg-primary/10 text-center transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full mt-3 px-4 py-3 rounded-lg text-base font-medium bg-primary text-white hover:bg-primary/90 active:bg-primary/80 text-center transition-colors"
              >
                Join Us
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
