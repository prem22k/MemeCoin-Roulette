import { Coin, BetData, BetDirection, UserBet } from '../types';

// Mock data for testing
export const mockCoin: Coin = {
  id: 'test-coin-1',
  name: 'Test Coin',
  symbol: 'TEST',
  thumbnail: 'https://example.com/test.jpg',
  price: 100,
  mentions: 1000,
  odds: 1.5,
  potentialMultiplier: 2,
  trend: 'up',
  volume24h: 1000000,
  marketCap: 10000000,
  lastUpdated: new Date()
};

export const mockBetData: BetData = {
  coinId: mockCoin.id,
  amount: 100,
  direction: 'up' as BetDirection,
  odds: mockCoin.odds
};

// Test helper functions
export const createMockBet = (overrides = {}): UserBet => ({
  id: 'test-bet-1',
  userId: 'user-1',
  coinId: mockCoin.id,
  coinSymbol: mockCoin.symbol,
  coinThumbnail: mockCoin.thumbnail,
  amount: 100,
  direction: 'up',
  odds: 1.5,
  status: 'pending',
  timestamp: new Date(),
  potentialReturn: 150,
  ...overrides
}); 