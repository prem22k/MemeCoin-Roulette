import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft, 
  Clock,
  DollarSign
} from 'lucide-react';
import { giphyService } from '../services/giphyService';
import { LoadingCard } from '../components/Trends/LoadingCard';
import { BetModal } from '../components/Trends/BetModal';
import { TrendChart } from '../components/Charts/TrendChart';
import { buttonStyles } from '../styles/buttons';
import { Coin } from '../types';
import { GiphyError } from '../utils/errorHandling';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const BetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meme, setMeme] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBetModal, setShowBetModal] = useState(false);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  useEffect(() => {
    const fetchMemeDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await giphyService.getTrendingMemes();
        const foundMeme = data.find(m => m.id === id);

        if (!foundMeme) {
          setError('Meme not found');
          return;
        }

        // Convert to Coin format
        const coinMeme: Coin = {
          id: foundMeme.id,
          name: foundMeme.title,
          symbol: foundMeme.title.slice(0, 4).toUpperCase(),
          thumbnail: foundMeme.images.fixed_height.url,
          price: Math.random() * 100,
          mentions: Math.floor(Math.random() * 1000),
          odds: 1 + Math.random(),
          potentialMultiplier: 1 + Math.random() * 2,
          trend: Math.random() > 0.5 ? 'up' : 'down',
          volume24h: Math.floor(Math.random() * 1000000),
          marketCap: Math.floor(Math.random() * 10000000),
          lastUpdated: new Date()
        };

        setMeme(coinMeme);
        setError(null);
      } catch (err) {
        setError(err instanceof GiphyError ? err.message : 'Failed to load meme details');
      } finally {
        setLoading(false);
      }
    };

    fetchMemeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingCard />
      </div>
    );
  }

  if (error || !meme) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          <p>{error || 'Meme not found'}</p>
          <button
            onClick={() => navigate('/trending')}
            className={`${buttonStyles.secondary} mt-4`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Trending
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/trending')}
          className={`${buttonStyles.secondary} mb-6`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Trending
        </button>

        {/* Meme Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={meme.thumbnail}
                alt={meme.name}
                className="w-full aspect-video object-cover"
              />
              <div className="p-4">
                <h1 className="text-2xl font-bold">{meme.name}</h1>
                <p className="text-gray-500">${meme.symbol}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <p className="text-gray-500 text-sm">Current Price</p>
                <p className="text-xl font-bold">${meme.price.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <p className="text-gray-500 text-sm">24h Volume</p>
                <p className="text-xl font-bold">
                  {meme.volume24h.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Trading Info */}
          <div className="space-y-4">
            {/* Trend Info */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Trend Analysis</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium
                  ${meme.trend === 'up' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'}`}
                >
                  {meme.trend === 'up' ? (
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Bullish
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      Bearish
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Potential Return</p>
                  <p className="text-xl font-bold">
                    {meme.potentialMultiplier.toFixed(2)}x
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Mentions</p>
                  <p className="text-xl font-bold">
                    {meme.mentions.toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowBetModal(true)}
                className={`${buttonStyles.primary} w-full`}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Place Bet
              </button>
            </div>

            {/* Time Range Selector */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="flex gap-2">
                {(['1h', '24h', '7d', '30d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium
                      ${timeRange === range 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <Clock className="w-4 h-4 mb-1 mx-auto" />
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <TrendChart
                data={[]} // Add mock data or integrate with real data
                timeRange={timeRange}
                metrics={['price', 'mentions']}
                height={300}
                coin={meme}
              />
            </div>
          </div>
        </div>

        {/* Bet Modal */}
        {showBetModal && (
          <BetModal
            isOpen={true}
            onClose={() => setShowBetModal(false)}
            coin={meme}
            userBalance={10000}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};