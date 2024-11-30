import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface BetButtonProps {
  direction: 'up' | 'down';
  selected: boolean;
  odds: number;
  onClick: () => void;
  disabled?: boolean;
}

export const BetButton: React.FC<BetButtonProps> = ({
  direction,
  selected,
  odds,
  onClick,
  disabled = false
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full p-4 border-2 rounded-xl flex flex-col items-center gap-2
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${selected
          ? direction === 'up'
            ? 'border-green-500 bg-green-50 text-green-700'
            : 'border-red-500 bg-red-50 text-red-700'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      {/* Direction Icon */}
      <div className={`
        p-3 rounded-full
        ${direction === 'up' ? 'bg-green-100' : 'bg-red-100'}
        ${selected ? 'scale-110' : 'scale-100'}
        transition-transform duration-200
      `}>
        {direction === 'up' ? (
          <TrendingUp className="w-6 h-6" />
        ) : (
          <TrendingDown className="w-6 h-6" />
        )}
      </div>

      {/* Label */}
      <span className="font-medium text-lg">
        {direction === 'up' ? 'Going Up' : 'Going Down'}
      </span>

      {/* Odds */}
      <span className="text-sm opacity-75">
        {odds.toFixed(2)}x Multiplier
      </span>

      {/* Selection Indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white
            border-2 border-current flex items-center justify-center text-sm"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  );
}; 