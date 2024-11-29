export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  price_btc: number;
  thumb: string;
  score: number;
}

export interface OddsData {
  id: string;
  name: string;
  symbol: string;
  mentions: number;
  odds: number;
  thumbnail: string;
  potentialMultiplier: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}