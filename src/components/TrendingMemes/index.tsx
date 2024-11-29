import React from 'react';
import { MemeGrid } from './MemeGrid';
import { useGiphyTrends } from '../../hooks/useGiphyTrends';
import { Coin } from '../../types';
import { GiphyError } from '../../utils/errorHandling';

interface TrendingMemesProps {
  onBetClick?: (meme: Coin) => void;
  className?: string;
}

export const TrendingMemes: React.FC<TrendingMemesProps> = ({
  onBetClick,
  className = ''
}) => {
  const { 
    memes, 
    loading, 
    error, 
    refreshMemes 
  } = useGiphyTrends({
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg text-red-600">
        {error instanceof GiphyError ? error.message : 'Failed to load memes'}
      </div>
    );
  }

  return (
    <MemeGrid
      memes={memes}
      loading={loading}
      onBetClick={onBetClick}
      onRefresh={refreshMemes}
      className={className}
    />
  );
};

// Re-export components for convenience
export { MemeCard } from './MemeCard';
export { MemeGrid } from './MemeGrid';
export { EmptyState } from './EmptyState'; 