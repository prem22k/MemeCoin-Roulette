import React, { useState, useEffect } from 'react';
import { Trophy, Medal, TrendingUp, Users } from 'lucide-react';
import { LeaderboardEntry, UserBet } from '../types';
import { getLeaderboard, getUserBets } from '../services/api';
import { LoadingSpinner } from '../components/TrendingMemes/LoadingSpinner';
import { UserProfile } from '../components/Leaderboard/UserProfile';
import { buttonStyles } from '../styles/buttons';

type TimeFrame = 'daily' | 'weekly' | 'all-time';

export const Leaderboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('all-time');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(null);
  const [userBets, setUserBets] = useState<UserBet[]>([]);
  const [loadingBets, setLoadingBets] = useState(false);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard(timeFrame);
      setLeaderboard(data);
      setError(null);
    } catch (err) {
      setError('Failed to load leaderboard data');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Set up real-time updates
    const interval = setInterval(fetchLeaderboard, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [timeFrame]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <span className="text-gray-500 font-mono w-6 text-center">{rank}</span>;
    }
  };

  const handleUserClick = async (user: LeaderboardEntry) => {
    try {
      setLoadingBets(true);
      const response = await getUserBets(Number(user.id));
      setUserBets(response.bets);
      setSelectedUser(user);
    } catch (err) {
      console.error('Failed to fetch user bets:', err);
      // You might want to show an error toast here
    } finally {
      setLoadingBets(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg mx-auto max-w-4xl my-8">
        <p className="text-center">{error}</p>
        <button
          onClick={fetchLeaderboard}
          className={`${buttonStyles.secondary} mt-4 mx-auto`}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Top Predictors
        </h1>
        <p className="text-gray-600">
          See who's making the best meme predictions
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          <span className="font-medium">
            {leaderboard.length} Active Players
          </span>
        </div>

        <div className="flex gap-2">
          {(['daily', 'weekly', 'all-time'] as TimeFrame[]).map((frame) => (
            <button
              key={frame}
              onClick={() => setTimeFrame(frame)}
              className={`${buttonStyles.secondary} ${
                timeFrame === frame ? 'bg-purple-100 text-purple-700' : ''
              }`}
            >
              {frame.charAt(0).toUpperCase() + frame.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-medium mb-2">Average Win Rate</h3>
          <p className="text-3xl font-bold">
            {(leaderboard.reduce((acc, user) => acc + user.winRate, 0) / leaderboard.length || 0).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-medium mb-2">Total Bets Placed</h3>
          <p className="text-3xl font-bold">
            {leaderboard.reduce((acc, user) => acc + user.totalBets, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-medium mb-2">Highest Streak</h3>
          <p className="text-3xl font-bold">
            {Math.max(...leaderboard.map(user => user.streak))}
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Player</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Win Rate</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total Bets</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboard.map((entry) => (
                <tr 
                  key={entry.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleUserClick(entry)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRankIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={entry.avatar}
                        alt={entry.username}
                        className="h-8 w-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {entry.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-2 w-20 rounded-full bg-gray-200 mr-2 overflow-hidden`}>
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${entry.winRate}%` }}
                        />
                      </div>
                      <span className="font-medium">{entry.winRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {entry.totalBets.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TrendingUp className={`h-4 w-4 ${
                        entry.streak > 5 ? 'text-green-500' : 'text-gray-400'
                      } mr-1`} />
                      <span className={`font-medium ${
                        entry.streak > 5 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {entry.streak}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <UserProfile
          user={selectedUser}
          bets={userBets}
          isOpen={true}
          onClose={() => {
            setSelectedUser(null);
            setUserBets([]);
          }}
          loading={loadingBets}
        />
      )}
    </div>
  );
};