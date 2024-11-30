import React from 'react';
import { Coins } from 'lucide-react';

interface BetAmountInputProps {
  value: string;
  onChange: (value: string) => void;
  maxAmount: number;
  disabled?: boolean;
}

export const BetAmountInput: React.FC<BetAmountInputProps> = ({
  value,
  onChange,
  maxAmount,
  disabled = false
}) => {
  const handleQuickAmount = (percentage: number) => {
    const amount = Math.floor(maxAmount * (percentage / 100));
    onChange(amount.toString());
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Bet Amount
      </label>
      
      <div className="relative">
        <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 
          text-gray-400 h-5 w-5" />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          min="1"
          max={maxAmount}
          className={`
            w-full pl-10 pr-20 py-2 border rounded-lg
            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
          placeholder="Enter amount"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 
          text-gray-500 text-sm">
          points
        </span>
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {[10, 25, 50, 100].map((percentage) => (
          <button
            key={percentage}
            onClick={() => handleQuickAmount(percentage)}
            disabled={disabled}
            className={`
              text-sm py-1 rounded
              transition-colors duration-200
              ${disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }
            `}
          >
            {percentage}%
          </button>
        ))}
      </div>

      {/* Balance Display */}
      <div className="text-sm text-gray-500 flex justify-between">
        <span>Available:</span>
        <span>{maxAmount.toLocaleString()} points</span>
      </div>
    </div>
  );
}; 