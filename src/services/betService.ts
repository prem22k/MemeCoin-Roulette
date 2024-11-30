import { GiphyError } from '../utils/errorHandling';
import { Coin } from '../types';
import { userService } from './userService';

export interface BetData {
  userId: string;
  memeId: string;
  amount: number;
  direction: 'up' | 'down';
  odds: number;
  timestamp: Date;
}

export interface PlacedBet extends BetData {
  id: string;
  status: 'pending' | 'won' | 'lost';
  potentialWinnings: number;
}

class BetService {
  private readonly STORAGE_KEY = 'placed_bets';
  private readonly MIN_BET = 100;
  private readonly MAX_BET = 1000000;

  private getBets(): PlacedBet[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveBets(bets: PlacedBet[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bets));
  }

  private validateBet(amount: number, userBalance: number): void {
    if (amount < this.MIN_BET) {
      throw new GiphyError(
        `Minimum bet amount is ${this.MIN_BET} points`,
        'VALIDATION_ERROR'
      );
    }

    if (amount > this.MAX_BET) {
      throw new GiphyError(
        `Maximum bet amount is ${this.MAX_BET.toLocaleString()} points`,
        'VALIDATION_ERROR'
      );
    }

    if (amount > userBalance) {
      throw new GiphyError(
        'Insufficient balance for this bet',
        'VALIDATION_ERROR'
      );
    }
  }

  async placeBet(
    userId: string,
    coin: Coin,
    amount: number,
    direction: 'up' | 'down',
    userBalance: number
  ): Promise<PlacedBet> {
    try {
      // Validate bet
      this.validateBet(amount, userBalance);

      // Deduct amount from balance
      userService.updateBalance(-amount);

      // Calculate odds and potential winnings
      const odds = this.calculateOdds(coin, direction);
      const potentialWinnings = amount * odds;

      // Create new bet
      const newBet: PlacedBet = {
        id: `bet-${Date.now()}`,
        userId,
        memeId: coin.id,
        amount,
        direction,
        odds,
        timestamp: new Date(),
        status: 'pending',
        potentialWinnings
      };

      // Save bet
      const bets = this.getBets();
      bets.push(newBet);
      this.saveBets(bets);

      // Simulate bet resolution after 30 seconds
      setTimeout(() => this.resolveBet(newBet.id), 30000);

      return newBet;
    } catch (error) {
      console.error('Error placing bet:', error);
      throw error;
    }
  }

  private async resolveBet(betId: string): Promise<void> {
    const bets = this.getBets();
    const betIndex = bets.findIndex(b => b.id === betId);
    
    if (betIndex === -1) return;

    const bet = bets[betIndex];
    const won = Math.random() > 0.5; // 50% chance of winning

    // Update bet status
    bet.status = won ? 'won' : 'lost';
    
    // Update user balance and stats
    if (won) {
      userService.updateBalance(bet.potentialWinnings);
    }
    userService.recordBet(won, bet.amount);

    // Save updated bets
    this.saveBets(bets);
  }

  calculateOdds(coin: Coin, direction: 'up' | 'down'): number {
    const baseOdds = coin.odds;
    const trendMultiplier = direction === coin.trend ? 0.9 : 1.1;
    const marketSentiment = (coin.mentions / 10000) * 0.1;
    
    return Number((baseOdds * trendMultiplier * (1 + marketSentiment)).toFixed(2));
  }

  async getUserBets(userId: string): Promise<PlacedBet[]> {
    const bets = this.getBets();
    return bets.filter(bet => bet.userId === userId);
  }
}

export const betService = new BetService(); 