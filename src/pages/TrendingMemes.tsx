import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { TrendingMemes as TrendingMemesComponent } from '../components/TrendingMemes';
import { BetModal } from '../components/Trends/BetModal';
import { Coin } from '../types';
import { ErrorBoundary } from '../components/ErrorBoundary';
import giphyLogo from '../assets/giphy/PoweredBy_200px-White_HorizText.png';

export const TrendingMemes: React.FC = () => {
  const [selectedMeme, setSelectedMeme] = useState<Coin | null>(null);

  const handleBetClick = (meme: Coin) => {
    setSelectedMeme(meme);
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            Trending Memes
          </h1>
        </div>

        {/* Content */}
        <div className="relative min-h-[400px]">
          <TrendingMemesComponent
            onBetClick={handleBetClick}
            className="animate-fadeIn"
          />
          
          {/* GIPHY Attribution - positioned on the right */}
          <div className="absolute right-0 bottom-0 -mb-6">
            <img 
              src={giphyLogo}
              alt="Powered by GIPHY"
              className="h-5 object-contain"
            />
          </div>
        </div>

        {/* Bet Modal */}
        {selectedMeme && (
          <BetModal
            isOpen={true}
            onClose={() => setSelectedMeme(null)}
            coin={selectedMeme}
            userBalance={10000}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};