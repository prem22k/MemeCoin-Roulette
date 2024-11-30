import React from 'react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { useRealtimeOdds } from '../../hooks/useRealtimeOdds';
import { Meme } from '../../data/memes';

interface OddsDisplayProps {
  meme: Meme;
  direction: 'up' | 'down' | null;
  amount: number;
}

export const OddsDisplay: React.FC<OddsDisplayProps> = ({
  meme,
  direction,
  amount
}) => {
  const { oddsData, loading } = useRealtimeOdds(meme, direction);

  if (!direction || !oddsData) return null;

  const potentialWinnings = amount * (oddsData.odds || 0);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
      {/* Current Odds */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Current Odds</span>
        <div className={`flex items-center gap-1 font-medium
          ${oddsData.trend === 'increasing' ? 'text-green-600' : 'text-red-600'}`}
        >
          {oddsData.trend === 'increasing' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {oddsData.odds.toFixed(2)}x
        </div>
      </div>

      {/* Potential Winnings */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Potential Win</span>
        <span className="font-medium text-purple-600">
          {potentialWinnings.toLocaleString()} points
        </span>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        <span>
          Updated {new Date(oddsData.lastUpdated).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}; 