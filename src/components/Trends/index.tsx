import React, { useState, useEffect } from 'react';
import { getOdds } from '../../services/api';
import { Coin, BetData } from '../../types';
import { TrendCard } from './TrendCard';
import { BetModal } from './BetModal';
import { LoadingCard } from './LoadingCard';
import { ErrorMessage } from '../TrendingMemes/ErrorMessage';

export const Trends: React.FC = () => {
  const [trends, setTrends] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrend, setSelectedTrend] = useState<Coin | null>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        const data = await getOdds();
        setTrends(data);
        setError(null);
      } catch (err) {
        setError('Failed to load trends');
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
    const interval = setInterval(fetchTrends, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleBetSubmit = async (betData: BetData) => {
    // Handle bet submission
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trends.map((trend) => (
          <TrendCard
            key={trend.id}
            trend={trend}
            onBetClick={() => setSelectedTrend(trend)}
          />
        ))}
      </div>

      {selectedTrend && (
        <BetModal
          isOpen={true}
          onClose={() => setSelectedTrend(null)}
          coin={selectedTrend}
          onPlaceBet={handleBetSubmit}
        />
      )}
    </>
  );
};