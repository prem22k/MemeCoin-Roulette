import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, TrendingUp, Sparkles, Menu, X, Trophy, Info } from 'lucide-react';
import { Container } from './Container';
import { zIndexLevels } from '../../styles/z-index';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Coins },
    { path: '/trending', label: 'Trending Memes', icon: TrendingUp },
    { path: '/bet', label: 'Place Bets', icon: Sparkles },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/about', label: 'About', icon: Info }
  ];

  return (
    <header 
      className={`
        sticky top-0 
        bg-gradient-to-r from-purple-600 to-blue-600 
        transition-all duration-300
        ${isScrolled ? 'shadow-lg' : ''}
      `}
      style={{ zIndex: zIndexLevels.header }}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-white 
              hover:opacity-90 transition-opacity group"
          >
            <div className="p-2 rounded-lg bg-white/10 shadow-inner 
              group-hover:bg-white/20 transition-colors">
              <Coins className="h-8 w-8" />
            </div>
            <span className="hidden sm:block">MemeCoin Roulette</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  px-4 py-2 rounded-lg
                  flex items-center space-x-2
                  hover:bg-white/10 hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-white/20
                  transform transition-all duration-200
                  ${isActive(path) 
                    ? 'bg-white/20 text-white font-medium shadow-lg' 
                    : 'text-white/80'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div 
          className={`
            md:hidden absolute left-0 right-0 
            bg-gradient-to-r from-purple-600 to-blue-600
            shadow-lg transform transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
          `}
          style={{ zIndex: zIndexLevels.mobileNav }}
        >
          <Container>
            <div className="py-2 space-y-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-lg flex items-center space-x-2
                    hover:bg-white/10 w-full transition-colors
                    ${isActive(path) 
                      ? 'bg-white/20 text-white font-medium' 
                      : 'text-white/80'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </Container>
        </div>
      </Container>
    </header>
  );
};