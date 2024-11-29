import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from './Container';
import { LoadingSpinner } from '../TrendingMemes/LoadingSpinner';

export const Layout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Handle page transitions
  useEffect(() => {
    setIsLoading(true);
    setIsVisible(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="flex-1 w-full relative">
        {/* Page Transition Wrapper */}
        <div
          className={`
            transform transition-all duration-500 ease-in-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="py-4 sm:py-6 md:py-8">
              <Container>
                <Outlet />
              </Container>
            </div>
          )}
        </div>

        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 
            bg-gradient-to-bl from-purple-100/30 via-blue-50/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 
            bg-gradient-to-tr from-blue-100/30 via-purple-50/20 to-transparent" />
          <div className="absolute inset-1/4 bg-gradient-to-br 
            from-purple-50/10 via-transparent to-blue-50/10 blur-3xl" />
        </div>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-white rounded-full shadow-lg 
            hover:shadow-xl transition-all duration-300 hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </div>
  );
};