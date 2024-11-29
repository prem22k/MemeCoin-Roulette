import React from 'react';
import { useGiphyTrends } from '../hooks/useGiphyTrends';
import { LoadingSpinner } from './TrendingMemes/LoadingSpinner';
import { ErrorMessage } from './TrendingMemes/ErrorMessage';
import { RefreshCw } from 'lucide-react';
import { buttonStyles } from '../styles/buttons';

export const TrendingGifs: React.FC = () => {
  const { trends, loading, error, isRefreshing, refreshTrends } = useGiphyTrends({
    limit: 10,
    rating: 'g',
    autoRefresh: true,
    refreshInterval: 60000
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshTrends} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Trending GIFs
        </h2>
        <button
          onClick={refreshTrends}
          disabled={isRefreshing}
          className={buttonStyles.icon}
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trends.map((gif) => (
          <div 
            key={gif.id}
            className="relative group aspect-square overflow-hidden rounded-lg 
              shadow-md hover:shadow-xl transition-all duration-300
              transform hover:scale-105"
          >
            <img
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 flex items-end"
            >
              <div className="p-2 text-white text-sm truncate w-full bg-black/50">
                {gif.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 