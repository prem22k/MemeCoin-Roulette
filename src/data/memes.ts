import { Coin } from '../types';

export interface Meme extends Coin {
  recentBets: {
    up: number;
    down: number;
  };
  volatility: number;
  momentum: number;
  minBet: number;
  maxBet: number;
}

// Cache using localStorage instead of idb-keyval
const CACHE_KEY = 'memes_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to save memes to localStorage
export const cacheMemes = async (memes: Meme[]): Promise<void> => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: memes,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Failed to cache memes:', error);
  }
};

// Function to get cached memes
export const getCachedMemes = async (): Promise<Meme[] | null> => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return null;

    const { data, timestamp } = JSON.parse(cache);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    return isExpired ? null : data;
  } catch (error) {
    console.error('Failed to get cached memes:', error);
    return null;
  }
};

// Mock memes data
export const mockMemes: Meme[] = [
  {
    id: 'doge-1',
    name: 'Doge To The Moon',
    symbol: 'DOGE',
    thumbnail: 'https://media.giphy.com/media/HWJKLzRBMn4QkE19WR/giphy.gif',
    price: 420.69,
    mentions: 69420,
    odds: 1.5,
    potentialMultiplier: 2.5,
    trend: 'up',
    volume24h: 1000000,
    marketCap: 10000000,
    lastUpdated: new Date(),
    recentBets: {
      up: 75,
      down: 25
    },
    volatility: 0.2,
    momentum: 0.7,
    minBet: 100,
    maxBet: 10000
  },
  {
    id: 'pepe-1',
    name: 'Rare Pepe',
    symbol: 'PEPE',
    thumbnail: 'https://media.giphy.com/media/3oKIPa2TdahY8LAAxy/giphy.gif',
    price: 69.42,
    mentions: 42069,
    odds: 2.0,
    potentialMultiplier: 3.0,
    trend: 'down',
    volume24h: 500000,
    marketCap: 5000000,
    lastUpdated: new Date(),
    recentBets: {
      up: 40,
      down: 60
    },
    volatility: 0.3,
    momentum: -0.4,
    minBet: 50,
    maxBet: 5000
  }
];

// Pagination helper
export const paginateMemes = (
  memes: Meme[],
  page: number = 1,
  pageSize: number = 10
): { data: Meme[]; totalPages: number } => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    data: memes.slice(start, end),
    totalPages: Math.ceil(memes.length / pageSize)
  };
};