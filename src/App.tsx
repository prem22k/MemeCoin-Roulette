import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { TrendingMemes } from './pages/TrendingMemes';
import { BetPage } from './pages/BetPage';
import { About } from './pages/About';
import { Leaderboard } from './pages/Leaderboard';
import { WelcomePopup } from './components/WelcomePopup';

// Configure QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<TrendingMemes />} />
            <Route path="/bet/:id" element={<BetPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
        {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
      </Router>
    </QueryClientProvider>
  );
};

export default App;