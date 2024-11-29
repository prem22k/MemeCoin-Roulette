import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  X, 
  Trophy, 
  Flame,
  Calendar,
  BarChart2
} from 'lucide-react';
import { LeaderboardEntry, UserBet } from '../../types';
import { buttonStyles } from '../../styles/buttons';
import { LoadingSpinner } from '../../components/TrendingMemes/LoadingSpinner';

interface UserProfileProps {
  user: LeaderboardEntry;
  bets: UserBet[];
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  bets,
  isOpen,
  onClose,
  loading = false
}) => {
  if (!isOpen) return null;

  const recentBets = bets.slice(0, 10); // Show last 10 bets
  const wonBets = bets.filter(bet => bet.status === 'won').length;
  const totalBets = bets.length;
  const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.username}
              className="h-16 w-16 rounded-full border-2 border-white/20"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-white/90">Rank #{user.rank}</span>
                {user.streak >= 3 && (
                  <div className="flex items-center gap-1 bg-red-500/20 px-2 py-0.5 rounded-full">
                    <Flame className="h-4 w-4 text-red-400" />
                    <span className="text-sm">{user.streak} streak</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 p-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 mb-1">Win Rate</p>
            <p className="text-2xl font-bold text-purple-700">{user.winRate}%</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 mb-1">Total Bets</p>
            <p className="text-2xl font-bold text-blue-700">{user.totalBets}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">Points</p>
            <p className="text-2xl font-bold text-green-700">{user.points.toLocaleString()}</p>
          </div>
        </div>

        {/* Betting History */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bets</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Last 10 bets</span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-3">
              {recentBets.map((bet) => (
                <div
                  key={bet.id}
                  className="bg-gray-50 rounded-lg p-4 flex items-center justify-between
                    hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={bet.coinThumbnail}
                      alt={bet.coinSymbol}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        ${bet.coinSymbol}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{new Date(bet.timestamp).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className={bet.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {bet.direction === 'up' ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Bet Amount</div>
                      <div className="font-medium">
                        {bet.amount.toLocaleString()} pts
                      </div>
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
              ))}
            </div>
          )}

          {/* Performance Chart */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart2 className="h-4 w-4" />
                <span>Win rate over time</span>
              </div>
            </div>
            <div className="h-40 bg-gray-50 rounded-lg p-4">
              {/* Add a chart component here if desired */}
              <div className="flex items-center justify-center h-full text-gray-500">
                Performance chart coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 