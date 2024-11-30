import { useState } from 'react';
import { betValidator } from '../services/betValidation';
import { Meme } from '../data/memes';
import { GiphyError } from '../utils/errorHandling';

interface UseBetValidationProps {
  userId: string;
  userBalance: number;
  meme: Meme;
}

export const useBetValidation = ({
  userId,
  userBalance,
  meme
}: UseBetValidationProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  const validateBet = (amount: number, direction: 'up' | 'down' | null): boolean => {
    try {
      const newErrors: string[] = [];

      // Run all validations
      try {
        betValidator.validateBetDirection(direction);
      } catch (err) {
        if (err instanceof GiphyError) {
          newErrors.push(err.message);
        }
      }

      try {
        betValidator.validateBetAmount(amount, userBalance, meme);
      } catch (err) {
        if (err instanceof GiphyError) {
          newErrors.push(err.message);
        }
      }

      try {
        betValidator.validateUserBetCount(userId);
      } catch (err) {
        if (err instanceof GiphyError) {
          newErrors.push(err.message);
        }
      }

      try {
        betValidator.validateCooldown(userId);
      } catch (err) {
        if (err instanceof GiphyError) {
          newErrors.push(err.message);
        }
      }

      try {
        betValidator.validateMemeBetLimit(meme);
      } catch (err) {
        if (err instanceof GiphyError) {
          newErrors.push(err.message);
        }
      }

      setErrors(newErrors);
      return newErrors.length === 0;

    } catch (error) {
      setErrors(['An unexpected error occurred']);
      return false;
    }
  };

  const recordBet = () => {
    betValidator.recordBet(userId);
  };

  const clearBet = () => {
    betValidator.clearBet(userId);
  };

  return {
    validateBet,
    recordBet,
    clearBet,
    errors
  };
}; 