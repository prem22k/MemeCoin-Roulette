import React from 'react';
import { Sparkles } from 'lucide-react';
import { Coin } from '../../types';
import { buttonStyles } from '../../styles/buttons';

interface TrendCardProps {
  trend: Coin;
  onBetClick: (trend: Coin) => void;
}

export const TrendCard: React.FC<TrendCardProps> = ({ trend, onBetClick }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md 
      hover:shadow-lg transition-all duration-300 group"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <img
            src={trend.thumbnail}
            alt={trend.name}
            className="w-16 h-16 rounded-full object-cover shadow-sm 
              group-hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{trend.name}</h3>
            <p className="text-sm text-gray-500">{trend.symbol}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Current Mentions</span>
            <span className="font-medium">{trend.mentions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Odds</span>
            <span className="font-medium text-purple-600">{trend.odds.toFixed(2)}x</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Potential Return</span>
            <span className="font-medium text-green-600">
              {trend.potentialMultiplier.toFixed(2)}x
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onBetClick(trend)}
          className={`
            ${buttonStyles.primary}
            w-full flex items-center justify-center space-x-2
            group-hover:scale-105
          `}
        >
          <Sparkles className="h-5 w-5" />
          <span>Place Bet</span>
        </button>
      </div>
    </div>
  );
};