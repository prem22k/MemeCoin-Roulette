import React from 'react';
import { MemeGrid } from './MemeGrid';
import { useGiphyTrends } from '../../hooks/useGiphyTrends';

export const CompactTrendingMemes: React.FC = () => {
  const { memes, loading, error } = useGiphyTrends({
    refetchInterval: 30000
  });

  // Only show first 6 memes in compact view
  const compactMemes = memes.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <MemeGrid
        memes={compactMemes}
        loading={loading}
        className="p-4"
      />
    </div>
  );
}; 