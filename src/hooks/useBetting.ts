import { useState } from 'react';
import { betService, BetData, PlacedBet } from '../services/betService';
import { Coin } from '../types';
import { GiphyError } from '../utils/errorHandling';

interface UseBettingProps {
  userId: string;
  userBalance: number;
}

export const useBetting = ({ userId, userBalance }: UseBettingProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPlacedBet, setLastPlacedBet] = useState<PlacedBet | null>(null);

  const placeBet = async (
    coin: Coin,
    amount: number,
    direction: 'up' | 'down'
  ) => {
    try {
      setLoading(true);
      setError(null);

      const placedBet = await betService.placeBet(
        userId,
        coin,
        amount,
        direction,
        userBalance
      );

      setLastPlacedBet(placedBet);
      return placedBet;
    } catch (err) {
      const errorMessage = err instanceof GiphyError ? err.message : 'Failed to place bet';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const calculatePotentialWinnings = (
    coin: Coin,
    amount: number,
    direction: 'up' | 'down'
  ): number => {
    const odds = betService.calculateOdds(coin, direction);
    return Number((amount * odds).toFixed(2));
  };

  return {
    placeBet,
    calculatePotentialWinnings,
    loading,
    error,
    lastPlacedBet
  };
}; 