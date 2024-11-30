import { GiphyError } from '../utils/errorHandling';
import { Meme } from '../data/memes';

export interface BetValidationRules {
  minBet: number;
  maxBet: number;
  maxBetsPerUser: number;
  maxTotalBets: number;
  cooldownPeriod: number; // in milliseconds
}

const DEFAULT_RULES: BetValidationRules = {
  minBet: 100,
  maxBet: 10000,
  maxBetsPerUser: 3,
  maxTotalBets: 100,
  cooldownPeriod: 5 * 60 * 1000 // 5 minutes
};

export class BetValidator {
  private rules: BetValidationRules;
  private lastBetTimestamps: Map<string, number> = new Map();
  private userBetCounts: Map<string, number> = new Map();

  constructor(rules: Partial<BetValidationRules> = {}) {
    this.rules = { ...DEFAULT_RULES, ...rules };
  }

  validateBetAmount(amount: number, userBalance: number, meme: Meme): void {
    const minBet = meme.minBet || this.rules.minBet;
    const maxBet = meme.maxBet || this.rules.maxBet;

    if (amount < minBet) {
      throw new GiphyError(
        `Minimum bet amount is ${minBet.toLocaleString()} points`,
        'VALIDATION_ERROR'
      );
    }

    if (amount > maxBet) {
      throw new GiphyError(
        `Maximum bet amount is ${maxBet.toLocaleString()} points`,
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

  validateBetDirection(direction: 'up' | 'down' | null): void {
    if (!direction) {
      throw new GiphyError(
        'Please select a trend direction for your bet',
        'VALIDATION_ERROR'
      );
    }
  }

  validateUserBetCount(userId: string): void {
    const userBets = this.userBetCounts.get(userId) || 0;
    if (userBets >= this.rules.maxBetsPerUser) {
      throw new GiphyError(
        `Maximum of ${this.rules.maxBetsPerUser} active bets allowed per user`,
        'VALIDATION_ERROR'
      );
    }
  }

  validateCooldown(userId: string): void {
    const lastBetTime = this.lastBetTimestamps.get(userId) || 0;
    const timeSinceLastBet = Date.now() - lastBetTime;

    if (timeSinceLastBet < this.rules.cooldownPeriod) {
      const waitTime = Math.ceil((this.rules.cooldownPeriod - timeSinceLastBet) / 1000);
      throw new GiphyError(
        `Please wait ${waitTime} seconds before placing another bet`,
        'VALIDATION_ERROR'
      );
    }
  }

  validateMemeBetLimit(meme: Meme): void {
    if (meme.activeBets && meme.activeBets >= this.rules.maxTotalBets) {
      throw new GiphyError(
        'This meme has reached its maximum number of active bets',
        'VALIDATION_ERROR'
      );
    }
  }

  recordBet(userId: string): void {
    this.lastBetTimestamps.set(userId, Date.now());
    this.userBetCounts.set(userId, (this.userBetCounts.get(userId) || 0) + 1);
  }

  clearBet(userId: string): void {
    const currentBets = this.userBetCounts.get(userId) || 0;
    if (currentBets > 0) {
      this.userBetCounts.set(userId, currentBets - 1);
    }
  }
}

export const betValidator = new BetValidator(); 