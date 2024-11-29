import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { getOdds, placeBet } from '../services/api';
import { Coin, BetData } from '../types';
import { LoadingSpinner } from '../components/TrendingMemes/LoadingSpinner';
import { NotificationToast } from '../components/NotificationToast';
import { BetModal } from '../components/Trends/BetModal';
import { buttonStyles } from '../styles/buttons';
import { spacing } from '../styles/spacing';

// MemeCard Component
const MemeCard: React.FC<{
  meme: Coin;
  onBetClick: (meme: Coin) => void;
}> = ({ meme, onBetClick }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg 
      hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]
      border border-gray-100 hover:border-purple-200 group"
    >
      <div className="p-6 space-y-4">
        {/* Meme Header */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={meme.thumbnail}
              alt={meme.name}
              className="w-16 h-16 rounded-full object-cover shadow-sm 
                group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white shadow-sm">
              <div className="p-1 rounded-full bg-purple-100">
                <Sparkles className="h-3 w-3 text-purple-600" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{meme.name}</h3>
            <p className="text-sm text-gray-500">{meme.symbol}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 rounded-lg 
            bg-gray-50 group-hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-600">Current Mentions</span>
            <span className="font-medium">{meme.mentions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg 
            bg-purple-50 group-hover:bg-purple-100 transition-colors"
          >
            <span className="text-purple-600">Odds</span>
            <span className="font-medium text-purple-700">{meme.odds.toFixed(2)}x</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg 
            bg-green-50 group-hover:bg-green-100 transition-colors"
          >
            <span className="text-green-600">Potential Return</span>
            <span className="font-medium text-green-700">
              {meme.potentialMultiplier.toFixed(2)}x
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onBetClick(meme)}
          className={`
            ${buttonStyles.primary}
            w-full group relative overflow-hidden
            flex items-center justify-center space-x-2
          `}
        >
          <span className="relative z-10 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
            Place Bet
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 
            opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
};

// Main BetPage Component
export const BetPage: React.FC = () => {
  const [memes, setMemes] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeme, setSelectedMeme] = useState<Coin | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMemes = async () => {
    try {
      setIsRefreshing(true);
      const data = await getOdds();
      setMemes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load trending memes');
      console.error('Error fetching memes:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMemes();
    const interval = setInterval(fetchMemes, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleBetSubmit = async (betData: BetData) => {
    try {
      await placeBet(betData);
      setNotification({
        type: 'success',
        message: `Successfully placed bet of ${betData.amount} points!`
      });
      await fetchMemes();
      setSelectedMeme(null);
    } catch (err) {
      setNotification({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to place bet'
      });
      throw err;
    }
  };

  if (loading) {
    return (
      <div className={spacing.section}>
        <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className={`${spacing.section} space-y-8`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-600 to-blue-600"
        >
          Place Your Bets
        </h1>
        <button
          onClick={fetchMemes}
          disabled={isRefreshing}
          className={`
            ${buttonStyles.secondary}
            inline-flex items-center space-x-2
          `}
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Odds</span>
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <MemeCard
              key={meme.id}
              meme={meme}
              onBetClick={() => setSelectedMeme(meme)}
            />
          ))}
        </div>
      )}

      {selectedMeme && (
        <BetModal
          isOpen={true}
          onClose={() => setSelectedMeme(null)}
          coin={selectedMeme}
          onPlaceBet={handleBetSubmit}
        />
      )}

      {notification && (
        <NotificationToast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};