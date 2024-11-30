import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Trophy, XCircle, Clock } from 'lucide-react';
import { betService, PlacedBet } from '../../services/betService';
import { formatDistanceToNow } from 'date-fns';

export const BetHistory: React.FC = () => {
  const [bets, setBets] = useState<PlacedBet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBets = async () => {
      try {
        const userBets = await betService.getUserBets('user-1'); // Replace with actual user ID
        setBets(userBets.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      } catch (error) {
        console.error('Error loading bet history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBets();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <Clock className="w-6 h-6 text-purple-600 animate-spin mx-auto mb-2" />
        <p className="text-gray-500">Loading bet history...</p>
      </div>
    );
  }

  if (!bets.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-gray-500">No bets placed yet. Start betting!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Bet History</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {bets.map((bet) => (
          <div
            key={bet.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {bet.status === 'won' ? (
                    <Trophy className="h-5 w-5 text-green-500" />
                  ) : bet.status === 'lost' ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <span className="font-medium">
                    {bet.amount.toLocaleString()} points
                  </span>
                  <span className="text-gray-500">on</span>
                  <span className="font-medium">${bet.memeId}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className={`flex items-center gap-1
                    ${bet.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {bet.direction === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {bet.direction}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">
                    {formatDistanceToNow(new Date(bet.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${
                  bet.status === 'won' 
                    ? 'text-green-600' 
                    : bet.status === 'lost'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}>
                  {bet.status === 'won'
                    ? `+${bet.potentialWinnings.toLocaleString()}`
                    : bet.status === 'lost'
                    ? `-${bet.amount.toLocaleString()}`
                    : 'Pending'}
                </div>
                <div className="text-sm text-gray-500">
                  {bet.odds.toFixed(2)}x odds
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};