import React from 'react';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Bet } from '../../types';

interface BetCardProps {
  bet: Bet;
}

export const BetCard: React.FC<BetCardProps> = ({ bet }) => {
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  return (
    <div className={`
      bg-gradient-to-br from-white to-gray-50
      rounded-lg p-4 
      shadow-sm hover:shadow-md
      hover:-translate-y-1
      transform transition-all duration-300 ease-in-out
      cursor-pointer
      border border-gray-100 hover:border-gray-200
      group
    `}>
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={bet.userAvatar}
            alt={bet.username}
            className="w-10 h-10 rounded-full object-cover shadow-sm 
              group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white shadow-sm">
            {bet.prediction === 'up' ? (
              <div className="flex items-center p-1 rounded-full bg-green-100">
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
            ) : (
              <div className="flex items-center p-1 rounded-full bg-red-100">
                <TrendingDown className="h-3 w-3 text-red-500" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 truncate hover:text-purple-600 transition-colors">
              {bet.username}
            </span>
            <span className="text-xs text-gray-500 flex items-center space-x-2">
              <span>{timeAgo(bet.timestamp)}</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </div>

          {/* Bet Details */}
          <div className="mt-1 text-sm">
            <span className="text-gray-600">
              Bet <span className="font-medium text-gray-900">{formatAmount(bet.amount)}</span> on{' '}
              <span className="font-medium text-gray-900">{bet.coinSymbol}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};