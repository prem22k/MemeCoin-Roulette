import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  Home, 
  Trophy,
  Info,
  Menu,
  X,
  Rocket,
  Coins
} from 'lucide-react';

interface NavLink {
  path: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks: NavLink[] = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/trending', label: 'Trending', icon: TrendingUp },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/about', label: 'About', icon: Info }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md' 
          : 'bg-white'
        }
      `}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <Coins className="h-8 w-8 text-purple-600 transition-transform 
                  duration-300 group-hover:scale-110" />
                <Rocket className="h-4 w-4 text-purple-400 absolute -top-1 -right-1 
                  transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 
                to-blue-600 bg-clip-text text-transparent">
                MemeCoin Roulette
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive(link.path)
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100
                  transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 bg-white border-t border-gray-100">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive(link.path)
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}; 