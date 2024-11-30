import { useState, useEffect } from 'react';
import { Meme, getRealtimeOdds } from '../data/memes';

interface OddsData {
  odds: number;
  lastUpdated: Date;
  trend: string;
}

export const useRealtimeOdds = (meme: Meme, direction: 'up' | 'down' | null) => {
  const [oddsData, setOddsData] = useState<OddsData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!direction) {
      setOddsData(null);
      return;
    }

    setLoading(true);
    
    // Initial odds calculation
    const initialOdds = getRealtimeOdds(meme, direction);
    setOddsData(initialOdds);
    setLoading(false);

    // Update odds every 5 seconds
    const interval = setInterval(() => {
      const updatedOdds = getRealtimeOdds(meme, direction);
      setOddsData(updatedOdds);
    }, 5000);

    return () => clearInterval(interval);
  }, [meme, direction]);

  return {
    oddsData,
    loading
  };
}; 