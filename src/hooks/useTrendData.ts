import { useState, useEffect } from 'react';
import { Coin } from '../types';

interface TrendDataPoint {
  timestamp: Date;
  price: number;
  mentions: number;
  volume: number;
}

export const useTrendData = (coin: Coin, timeRange: '1h' | '24h' | '7d' | '30d') => {
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateHistoricalData = () => {
      const now = new Date();
      const data: TrendDataPoint[] = [];
      let points: number;
      let interval: number;

      switch (timeRange) {
        case '1h':
          points = 60;
          interval = 60 * 1000; // 1 minute
          break;
        case '24h':
          points = 24;
          interval = 60 * 60 * 1000; // 1 hour
          break;
        case '7d':
          points = 7;
          interval = 24 * 60 * 60 * 1000; // 1 day
          break;
        case '30d':
          points = 30;
          interval = 24 * 60 * 60 * 1000; // 1 day
          break;
        default:
          points = 24;
          interval = 60 * 60 * 1000;
      }

      for (let i = points - 1; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - (i * interval));
        const variance = Math.random() * 0.2 - 0.1; // ±10% variance

        data.push({
          timestamp,
          price: coin.price * (1 + variance),
          mentions: Math.floor(coin.mentions * (1 + variance)),
          volume: coin.volume24h * (1 + variance)
        });
      }

      setTrendData(data);
      setLoading(false);
    };

    generateHistoricalData();
  }, [coin, timeRange]);

  return {
    trendData,
    loading
  };
}; 