import { useState, useCallback } from 'react';
import { Coin, BetData, BetDirection } from '../types';
import { placeBet } from '../services/api';
import { useBetHistory } from './useBetHistory';

interface BetResult {
  success: boolean;
  message: string;
  betId?: string;
}

export const useBetting = () => {
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const [lastBetResult, setLastBetResult] = useState<BetResult | null>(null);
  const { addBet } = useBetHistory();

  const calculatePotentialWinnings = useCallback((amount: number, odds: number) => {
    return amount * odds;
  }, []);

  const validateBet = useCallback((amount: number, userBalance: number) => {
    if (amount <= 0) {
      throw new Error('Bet amount must be greater than 0');
    }
    if (amount > userBalance) {
      throw new Error('Insufficient balance');
    }
    if (amount > 1000000) {
      throw new Error('Maximum bet amount is 1,000,000 points');
    }
  }, []);

  const placeMemeBet = async (
    coin: Coin,
    amount: number,
    direction: BetDirection,
    userBalance: number
  ) => {
    try {
      setIsPlacingBet(true);
      setLastBetResult(null);

      // Validate bet
      validateBet(amount, userBalance);

      // Calculate odds based on direction
      const adjustedOdds = direction === 'up' ? 
        coin.odds * 1.1 : // 10% better odds for up
        coin.odds * 0.9;  // 10% worse odds for down

      const betData: BetData = {
        coinId: coin.id,
        amount,
        direction,
        odds: adjustedOdds
      };

      // Place bet
      const response = await placeBet(betData);

      // Add to history
      await addBet(coin, betData);

      const result: BetResult = {
        success: true,
        message: `Successfully placed ${amount} point bet on ${coin.name} going ${direction}!`,
        betId: response.betId
      };

      setLastBetResult(result);
      return result;

    } catch (error) {
      const errorResult: BetResult = {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to place bet'
      };
      setLastBetResult(errorResult);
      throw error;
    } finally {
      setIsPlacingBet(false);
    }
  };

  return {
    placeMemeBet,
    isPlacingBet,
    lastBetResult,
    calculatePotentialWinnings
  };
}; 