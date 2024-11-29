import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { Coin } from '../../types';

interface MemeTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: Coin;
  }>;
}

export const MemeTooltip: React.FC<MemeTooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.[0]) return null;

  const data = payload[0].payload;
  const trendingUp = data.mentions > 1000;

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 
      max-w-[250px] animate-fadeIn backdrop-blur-sm bg-white/95"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
        <img
          src={data.thumbnail}
          alt={data.name}
          className="w-12 h-12 rounded-full object-cover shadow-sm 
            ring-2 ring-purple-100 transform hover:scale-110 transition-transform"
        />
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {data.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {data.symbol}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 rounded-lg 
          bg-gradient-to-r from-gray-50 to-gray-100 group hover:from-gray-100 hover:to-gray-200 
          transition-colors"
        >
          <span className="text-gray-600 text-sm">Mentions</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{data.mentions.toLocaleString()}</span>
            {trendingUp ? (
              <TrendingUp className="h-4 w-4 text-green-500 group-hover:animate-bounce" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 group-hover:animate-bounce" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg 
          bg-gradient-to-r from-purple-50 to-purple-100 group hover:from-purple-100 hover:to-purple-200 
          transition-colors"
        >
          <span className="text-purple-600 text-sm">Odds</span>
          <span className="font-medium text-purple-700">
            {data.odds.toFixed(2)}x
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg 
          bg-gradient-to-r from-green-50 to-green-100 group hover:from-green-100 hover:to-green-200 
          transition-colors"
        >
          <span className="text-green-600 text-sm">Potential Return</span>
          <div className="flex items-center space-x-1 text-green-700">
            <Sparkles className="h-4 w-4 group-hover:animate-spin" />
            <span className="font-medium">
              {data.potentialMultiplier.toFixed(2)}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};