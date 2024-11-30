import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Coins, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Coin } from '../../types';
import { betService, BetData } from '../../services/betService';
import { GiphyError } from '../../utils/errorHandling';
import { buttonStyles } from '../../styles/buttons';

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  coin: Coin;
  userBalance: number;
  userId?: string;
  onBetPlaced?: (bet: BetData) => void;
}

export const BetModal: React.FC<BetModalProps> = ({
  isOpen,
  onClose,
  coin,
  userBalance,
  userId = 'anonymous',
  onBetPlaced
}) => {
  const [amount, setAmount] = useState<string>('100');
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!direction || !amount) {
      setError('Please select a direction and enter an amount');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Validate amount
      const betAmount = Number(amount);
      if (isNaN(betAmount) || betAmount <= 0) {
        throw new GiphyError('Please enter a valid bet amount', 'VALIDATION_ERROR');
      }

      if (betAmount > userBalance) {
        throw new GiphyError('Insufficient balance for this bet', 'VALIDATION_ERROR');
      }

      // Create bet data
      const betData: BetData = {
        userId,
        memeId: coin.id,
        amount: betAmount,
        direction,
        odds: betService.calculateOdds(coin, direction),
        timestamp: new Date()
      };

      await betService.placeBet(
        userId,
        coin,
        betAmount,
        direction,
        userBalance
      );

      // Show success message
      const successMessage = `Successfully placed ${betAmount.toLocaleString()} point bet on ${coin.name} going ${direction}!`;
      setSuccess(successMessage);
      onBetPlaced?.(betData);

      // Close modal after delay
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 2000);

    } catch (err) {
      let errorMessage = 'Failed to place bet';
      
      if (err instanceof GiphyError) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('Bet placement error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const potentialWinnings = direction && amount
    ? Number(amount) * betService.calculateOdds(coin, direction)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">Place Your Bet</h2>
          <p className="text-white/80 mt-1">
            Balance: {userBalance.toLocaleString()} points
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Direction Selection */}
          <div className="grid grid-cols-2 gap-4">
            {['up', 'down'].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => {
                  setDirection(dir as 'up' | 'down');
                  setError(null); // Clear error on selection
                }}
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
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null); // Clear error on input
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                min="1"
                max={userBalance}
                placeholder="Enter amount"
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
            <div className="p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 rounded-lg flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p>{success}</p>
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
      </div>
    </div>
  );
};