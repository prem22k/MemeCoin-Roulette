import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Coins } from 'lucide-react';
import { Coin } from '../../types';
import { useBetting } from '../../hooks/useBetting';
import { buttonStyles } from '../../styles/buttons';

interface BetFormProps {
  coin: Coin;
  userBalance: number;
  userId: string;
  onBetPlaced?: () => void;
}

export const BetForm: React.FC<BetFormProps> = ({
  coin,
  userBalance,
  userId,
  onBetPlaced
}) => {
  const [amount, setAmount] = useState<string>('100');
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  const {
    placeBet,
    calculatePotentialWinnings,
    loading,
    error
  } = useBetting({ userId, userBalance });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!direction || !amount) return;

    try {
      await placeBet(coin, Number(amount), direction);
      onBetPlaced?.();
    } catch (err) {
      // Error is handled by the hook
      console.error('Failed to place bet:', err);
    }
  };

  const potentialWinnings = direction && amount
    ? calculatePotentialWinnings(coin, Number(amount), direction)
    : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Direction Selection */}
      <div className="grid grid-cols-2 gap-4">
        {['up', 'down'].map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => setDirection(dir as 'up' | 'down')}
            className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2
              ${direction === dir 
                ? dir === 'up'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-200 hover:bg-gray-50'
              }`}
          >
            {dir === 'up' ? (
              <TrendingUp className="h-6 w-6" />
            ) : (
              <TrendingDown className="h-6 w-6" />
            )}
            <span className="font-medium">
              {dir === 'up' ? 'Going Up' : 'Going Down'}
            </span>
          </button>
        ))}
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Bet Amount
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            min="1"
            max={userBalance}
          />
          <span className="absolute right-4 top-2 text-gray-500">
            points
          </span>
        </div>
      </div>

      {/* Potential Winnings */}
      {direction && amount && (
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-600">Potential Winnings</p>
          <p className="text-2xl font-bold text-purple-700">
            {potentialWinnings.toLocaleString()} points
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!direction || loading || !amount}
        className={`${buttonStyles.primary} w-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Coins className="animate-spin h-5 w-5 mr-2" />
            Placing Bet...
          </span>
        ) : (
          'Place Bet'
        )}
      </button>
    </form>
  );
}; 