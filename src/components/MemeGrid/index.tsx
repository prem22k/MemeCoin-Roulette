import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, Info } from 'lucide-react';
import { Coin } from '../../types';
import { LoadingCard } from '../Trends/LoadingCard';

interface MemeGridProps {
  memes: Coin[];
  onMemeClick?: (meme: Coin) => void;
  onBetClick?: (meme: Coin) => void;
  loading?: boolean;
  className?: string;
}

export const MemeGrid: React.FC<MemeGridProps> = ({
  memes,
  onMemeClick,
  onBetClick,
  loading = false,
  className = ''
}) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (memeId: string) => {
    setLoadedImages(prev => new Set([...prev, memeId]));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${className}`}>
      {memes.map((meme) => (
        <div
          key={meme.id}
          className="group relative bg-white rounded-xl shadow-lg overflow-hidden
            transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
            hover:-translate-y-1 cursor-pointer"
          onClick={() => onMemeClick?.(meme)}
        >
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            {/* Loading Placeholder */}
            <div className={`absolute inset-0 bg-gray-100 flex items-center justify-center
              transition-opacity duration-300 ${loadedImages.has(meme.id) ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
            </div>

            {/* Image */}
            <img
              src={meme.thumbnail}
              alt={meme.name}
              className={`w-full h-full object-cover transition-all duration-500
                ${loadedImages.has(meme.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                group-hover:scale-110`}
              onLoad={() => handleImageLoad(meme.id)}
              loading="lazy"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Trend Badge */}
            <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full
              backdrop-blur-md transition-transform duration-300
              group-hover:scale-110 flex items-center gap-1.5
              ${meme.trend === 'up' 
                ? 'bg-green-500/80 text-white' 
                : 'bg-red-500/80 text-white'}`}
            >
              {meme.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {meme.potentialMultiplier.toFixed(1)}x
              </span>
            </div>

            {/* Info Overlay on Hover */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full
              group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-3 text-white">
                <Info className="w-4 h-4" />
                <div className="text-sm">
                  <span className="font-medium">{meme.mentions.toLocaleString()}</span>
                  <span className="opacity-80"> mentions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title and Symbol */}
            <div>
              <h3 className="font-medium text-gray-900 line-clamp-2
                group-hover:text-purple-600 transition-colors duration-300">
                {meme.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                ${meme.symbol}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span>${meme.price.toFixed(2)}</span>
              </div>

              {/* Bet Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBetClick?.(meme);
                }}
                className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm
                  font-medium hover:bg-purple-200 transition-colors duration-200
                  active:scale-95 transform"
              >
                Place Bet
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 