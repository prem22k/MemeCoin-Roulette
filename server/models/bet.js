import { v4 as uuidv4 } from 'uuid';

export class Bet {
  constructor(userId, coinId, amount, direction, odds) {
    this.id = uuidv4();
    this.userId = userId;
    this.coinId = coinId;
    this.amount = amount;
    this.direction = direction;
    this.odds = odds;
    this.timestamp = new Date();
    this.status = 'pending'; // pending, won, lost
  }
}

// In-memory storage
export class BetStore {
  constructor() {
    this.bets = new Map();
  }

  create(bet) {
    this.bets.set(bet.id, bet);
    return bet;
  }

  getById(id) {
    return this.bets.get(id);
  }

  getByUserId(userId) {
    return Array.from(this.bets.values())
      .filter(bet => bet.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  update(id, updates) {
    const bet = this.bets.get(id);
    if (!bet) return null;
    
    Object.assign(bet, updates);
    return bet;
  }

  delete(id) {
    return this.bets.delete(id);
  }

  getAll() {
    return Array.from(this.bets.values())
      .sort((a, b) => b.timestamp - a.timestamp);
  }
}

export const betStore = new BetStore();