import React from 'react';
import { MemeCard } from './MemeCard';
import { LoadingCard } from '../Trends/LoadingCard';
import { EmptyState } from './EmptyState';
import { Coin } from '../../types';

interface MemeGridProps {
  memes: Coin[];
  loading?: boolean;
  onBetClick?: (meme: Coin) => void;
  onRefresh?: () => void;
  className?: string;
}

export const MemeGrid: React.FC<MemeGridProps> = ({
  memes,
  loading = false,
  onBetClick,
  onRefresh,
  className = ''
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );
  }

  if (!memes.length && onRefresh) {
    return <EmptyState onRefresh={onRefresh} />;
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 
      sm:gap-6 ${className}`}
    >
      {memes.map((meme) => (
        <MemeCard
          key={meme.id}
          meme={meme}
          onBetClick={onBetClick}
        />
      ))}
    </div>
  );
}; 