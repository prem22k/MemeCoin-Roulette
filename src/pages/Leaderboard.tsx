import React, { useState, useMemo } from 'react';
import { Trophy, Search, Medal, Flame, Users } from 'lucide-react';
import { LeaderboardTable } from '../components/Leaderboard/LeaderboardTable';
import { generateMockLeaderboard, LeaderboardEntry } from '../data/leaderboardData';

type SortField = keyof LeaderboardEntry;
type SortOrder = 'asc' | 'desc';

export const Leaderboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('points');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'all-time'>('all-time');

  const leaderboardData = useMemo(() => generateMockLeaderboard(50), []);

  const filteredAndSortedUsers = useMemo(() => {
    return leaderboardData
      .filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const multiplier = sortOrder === 'asc' ? 1 : -1;
        
        // Handle different types of fields
        if (typeof a[sortField] === 'number' && typeof b[sortField] === 'number') {
          return (a[sortField] as number - b[sortField] as number) * multiplier;
        }
        
        // Handle string fields (like username)
        if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
          return (a[sortField] as string).localeCompare(b[sortField] as string) * multiplier;
        }
        
        // Handle date fields
        if (a[sortField] instanceof Date && b[sortField] instanceof Date) {
          return (a[sortField] as Date).getTime() - (b[sortField] as Date).getTime() * multiplier;
        }

        return 0;
      });
  }, [leaderboardData, searchQuery, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-gray-600">
          Top performers in meme prediction
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 
                focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500
              focus:border-purple-500"
          >
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 
          rounded-xl p-4 text-white">
          <Trophy className="h-6 w-6 mb-2" />
          <p className="text-sm opacity-90">Top Player</p>
          <p className="text-xl font-bold">{filteredAndSortedUsers[0]?.username}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 
          rounded-xl p-4 text-white">
          <Medal className="h-6 w-6 mb-2" />
          <p className="text-sm opacity-90">Highest Win Rate</p>
          <p className="text-xl font-bold">
            {Math.max(...filteredAndSortedUsers.map(u => u.winRate)).toFixed(1)}%
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 
          rounded-xl p-4 text-white">
          <Flame className="h-6 w-6 mb-2" />
          <p className="text-sm opacity-90">Longest Streak</p>
          <p className="text-xl font-bold">
            {Math.max(...filteredAndSortedUsers.map(u => u.streak))}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 
          rounded-xl p-4 text-white">
          <Users className="h-6 w-6 mb-2" />
          <p className="text-sm opacity-90">Total Players</p>
          <p className="text-xl font-bold">{filteredAndSortedUsers.length}</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <LeaderboardTable
        data={filteredAndSortedUsers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    </div>
  );
};