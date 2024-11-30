import React from 'react';
import { useGiphyTrends } from '../hooks/useGiphyTrends';
import { ErrorMessage } from './TrendingMemes/ErrorMessage';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Coin } from '../types';
import giphyLogo from '../assets/giphy/PoweredBy_200px-White_HorizText.png';

export const TrendingGifs: React.FC = () => {
  const { memes, loading, error, refreshMemes } = useGiphyTrends({
    timeRange: '24h'
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error instanceof Error ? error.message : 'Failed to load trends'} 
        onRetry={refreshMemes}
      />
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {memes.map((meme: Coin) => (
          <div
            key={meme.id}
            className="relative aspect-square rounded-lg overflow-hidden 
              bg-gray-100 hover:shadow-lg transition-shadow"
          >
            <img
              src={meme.thumbnail}
              alt={meme.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute right-0 bottom-0 -mb-6">
        <img 
          src={giphyLogo}
          alt="Powered by GIPHY"
          className="h-4 object-contain"
        />
      </div>
    </div>
  );
};































