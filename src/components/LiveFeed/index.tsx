import React, { useEffect, useState, useRef } from 'react';
import { giphyService } from '../../services/giphyService';
import { GiphyError } from '../../utils/errorHandling';
import { LoadingSpinner } from '../TrendingMemes/LoadingSpinner';
import { AlertCircle, Activity } from 'lucide-react';
import { debugLogger } from '../../utils/debugUtils';
import { Bet } from '../../types';

// Mock recent bets data
const generateMockBets = (memeData: any[]): Bet[] => {
  return memeData.slice(0, 5).map((meme, index) => ({
    id: `bet-${index}`,
    userId: `user-${index}`,
    username: `Trader${index + 1}`,
    userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
    coinSymbol: meme.title.slice(0, 4).toUpperCase(),
    amount: Math.floor(Math.random() * 1000) + 100,
    prediction: Math.random() > 0.5 ? 'up' : 'down',
    timestamp: new Date(Date.now() - Math.random() * 3600000)
  }));
};

export const LiveFeed: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAndGenerateBets = async () => {
      try {
        setLoading(true);
        const memes = await giphyService.getTrendingMemes();
        debugLogger.logGiphyResponse(memes);
        
        const mockBets = generateMockBets(memes);
        setBets(mockBets);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof GiphyError 
          ? err.message 
          : 'Failed to fetch activity feed';
        
        debugLogger.logError(err, 'LiveFeed Component');
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGenerateBets();

    // Simulate new bets coming in
    const interval = setInterval(() => {
      setBets(prevBets => {
        const newBet: Bet = {
          id: `bet-${Date.now()}`,
          userId: `user-${Math.floor(Math.random() * 100)}`,
          username: `Trader${Math.floor(Math.random() * 100)}`,
          userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
          coinSymbol: ['DOGE', 'PEPE', 'SHIB', 'WOJAK', 'MOON'][Math.floor(Math.random() * 5)],
          amount: Math.floor(Math.random() * 1000) + 100,
          prediction: Math.random() > 0.5 ? 'up' : 'down',
          timestamp: new Date()
        };

        // Keep only the last 10 bets
        return [newBet, ...prevBets.slice(0, 9)];
      });
    }, 5000); // Add new bet every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to latest bet
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [bets]);

  if (loading) {
    return (
      <div className="h-[450px] bg-white rounded-xl shadow-lg p-4 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[450px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-red-500">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-[450px] bg-white rounded-xl shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Live Activity</h3>
        </div>
        <span className="text-sm text-gray-500">
          {bets.length} recent bets
        </span>
      </div>

      {/* Content */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overscroll-contain scroll-smooth"
      >
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {bets.map((bet) => (
            <div
              key={bet.id}
              className="bg-gray-50 rounded-lg p-3 flex items-center gap-3
                animate-fadeIn hover:bg-gray-100 transition-colors"
            >
              <img
                src={bet.userAvatar}
                alt={bet.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {bet.username}
                </p>
                <p className="text-xs text-gray-500">
                  placed a {bet.amount.toLocaleString()} point bet on ${bet.coinSymbol}
                </p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                bet.prediction === 'up' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {bet.prediction === 'up' ? '▲ Up' : '▼ Down'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};