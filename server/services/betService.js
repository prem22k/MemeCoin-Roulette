import { Bet, betStore } from '../models/bet.js';
import { ApiError } from '../utils/errorUtils.js';

export class BetService {
  validateBetAmount(amount) {
    if (amount < 1) {
      throw new ApiError(400, 'Bet amount must be at least 1');
    }
    if (amount > 1000000) {
      throw new ApiError(400, 'Bet amount cannot exceed 1,000,000');
    }
  }

  validateDirection(direction) {
    if (!['up', 'down'].includes(direction)) {
      throw new ApiError(400, 'Invalid bet direction');
    }
  }

  createBet(userId, betData) {
    this.validateBetAmount(betData.amount);
    this.validateDirection(betData.direction);

    const bet = new Bet(
      userId,
      betData.coinId,
      betData.amount,
      betData.direction,
      betData.odds
    );

    return betStore.create(bet);
  }

  getUserBets(userId) {
    return betStore.getByUserId(userId);
  }

  getBet(betId) {
    const bet = betStore.getById(betId);
    if (!bet) {
      throw new ApiError(404, 'Bet not found');
    }
    return bet;
  }

  getRecentBets(limit = 10) {
    return betStore.getAll().slice(0, limit);
  }
}

export const betService = new BetService();