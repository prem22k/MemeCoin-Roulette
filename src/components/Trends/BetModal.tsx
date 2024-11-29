import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Coins, X } from 'lucide-react';
import { Coin, BetData } from '../../types';
import { buttonStyles } from '../../styles/buttons';
import { useBetting } from '../../hooks/useBetting';
import confetti from 'canvas-confetti';

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  coin: Coin;
  userBalance?: number;
  onPlaceBet?: (betData: BetData) => Promise<void>;
}

export const BetModal: React.FC<BetModalProps> = ({
  isOpen,
  onClose,
  coin,
  userBalance = 10000,
  onPlaceBet
}) => {
  const [amount, setAmount] = useState<string>('100');
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const { placeMemeBet, isPlacingBet, lastBetResult, calculatePotentialWinnings } = useBetting();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setAmount('100');
      setDirection(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!direction) {
      return;
    }

    try {
      if (onPlaceBet) {
        await onPlaceBet({
          coinId: coin.id,
          amount: Number(amount),
          direction,
          odds: direction === 'up' ? coin.odds * 1.1 : coin.odds * 0.9
        });
      } else {
        const result = await placeMemeBet(coin, Number(amount), direction, userBalance);
        
        if (result.success) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          setTimeout(onClose, 2000);
        }
      }
    } catch (error) {
      console.error('Bet placement failed:', error);
    }
  };

  const potentialWinnings = calculatePotentialWinnings(
    Number(amount) || 0,
    direction === 'up' ? coin.odds * 1.1 : coin.odds * 0.9
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4
      animate-fadeIn backdrop-blur-sm"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden
        scale-in"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
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
          <div className="grid grid-cols-2 gap-4 stagger-children">
            {['up', 'down'].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => setDirection(dir as 'up' | 'down')}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2
                  transform transition-all duration-300 hover:scale-105
                  ${direction === dir 
                    ? dir === 'up'
                      ? 'border-green-500 bg-green-50 text-green-700 pulse-glow'
                      : 'border-red-500 bg-red-50 text-red-700 pulse-glow'
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
                <span className="text-sm opacity-75">
                  {(dir === 'up' ? coin.odds * 1.1 : coin.odds * 0.9).toFixed(2)}x
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
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600">Potential Winnings</p>
            <p className="text-2xl font-bold text-purple-700">
              {potentialWinnings.toLocaleString()} points
            </p>
          </div>

          {/* Error/Success Messages */}
          {lastBetResult && (
            <div className={`p-4 rounded-lg slide-in-right ${
              lastBetResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              <p className="flex items-center gap-2">
                {lastBetResult.success ? '🎉' : '⚠️'} {lastBetResult.message}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!direction || isPlacingBet || !amount}
            className={`${buttonStyles.primary} w-full transform transition-all duration-300
              hover:scale-[1.02] active:scale-[0.98] ${
              isPlacingBet ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isPlacingBet ? (
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