import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, History, AlertCircle } from 'lucide-react';
import { UserBet } from '../../types';
import { getUserBets } from '../../services/api';
import { LoadingSpinner } from '../TrendingMemes/LoadingSpinner';

export const BetHistory: React.FC = () => {
  const [bets, setBets] = useState<UserBet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBets = async () => {
    try {
      setLoading(true);
      const response = await getUserBets();
      setBets(response.bets);
      setError(null);
    } catch (err) {
      setError('Failed to load bet history');
      console.error('Error fetching bets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBets();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <History className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Betting History</h2>
        </div>
      </div>

      {/* Bet List */}
      <div className="space-y-4">
        {bets.length > 0 ? (
          bets.map((bet) => (
            <div
              key={bet.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{bet.coinSymbol}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(bet.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {bet.direction === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`font-medium ${
                      bet.direction === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {bet.direction === 'up' ? 'Up' : 'Down'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {bet.amount.toLocaleString()} points at {bet.odds.toFixed(2)}x
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  bet.status === 'won'
                    ? 'bg-green-100 text-green-800'
                    : bet.status === 'lost'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No bets placed yet. Start betting on trending memes!
          </div>
        )}
      </div>
    </div>
  );
};