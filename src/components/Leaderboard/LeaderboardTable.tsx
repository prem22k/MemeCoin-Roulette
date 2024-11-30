import React from 'react';
import { Trophy, Flame, ArrowUpDown, Medal } from 'lucide-react';
import { LeaderboardEntry } from '../../data/leaderboardData';

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  sortField: keyof LeaderboardEntry;
  sortOrder: 'asc' | 'desc';
  onSort: (field: keyof LeaderboardEntry) => void;
}

const RankBadge: React.FC<{ rank: number }> = ({ rank }) => {
  if (rank > 3) return (
    <span className="text-gray-500 font-mono w-8 text-center">
      {rank}
    </span>
  );

  const badges = {
    1: {
      icon: Trophy,
      style: 'bg-yellow-100 text-yellow-600 border-yellow-300',
      label: '1st'
    },
    2: {
      icon: Medal,
      style: 'bg-gray-100 text-gray-600 border-gray-300',
      label: '2nd'
    },
    3: {
      icon: Medal,
      style: 'bg-amber-100 text-amber-700 border-amber-300',
      label: '3rd'
    }
  };

  const badge = badges[rank as keyof typeof badges];
  const Icon = badge.icon;

  return (
    <div className={`
      flex items-center gap-1 px-2 py-1 rounded-full border
      ${badge.style} text-sm font-medium
    `}>
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{badge.label}</span>
    </div>
  );
};

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  data,
  sortField,
  sortOrder,
  onSort
}) => {
  const columns = [
    { field: 'points', label: 'Points' },
    { field: 'totalWins', label: 'Wins' },
    { field: 'totalBets', label: 'Total Bets' },
    { field: 'winRate', label: 'Win Rate' },
    { field: 'streak', label: 'Streak' }
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-gray-500">
                Rank
              </th>
              <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-gray-500">
                Player
              </th>
              {columns.map(({ field, label }) => (
                <th
                  key={field}
                  onClick={() => onSort(field)}
                  className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 
                    cursor-pointer hover:text-gray-700 hidden sm:table-cell"
                >
                  <div className="flex items-center gap-1">
                    {label}
                    <ArrowUpDown className={`h-4 w-4 ${
                      sortField === field ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                  </div>
                </th>
              ))}
              <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-gray-500 sm:hidden">
                Stats
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((entry, index) => (
              <tr
                key={entry.id}
                className={`
                  hover:bg-gray-50 transition-colors
                  ${index < 3 ? 'bg-opacity-50' : ''}
                  ${index === 0 ? 'bg-yellow-50' : ''}
                  ${index === 1 ? 'bg-gray-50' : ''}
                  ${index === 2 ? 'bg-amber-50' : ''}
                `}
              >
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <RankBadge rank={index + 1} />
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`
                      relative w-10 h-10 rounded-full overflow-hidden
                      ${index < 3 ? 'ring-2 ring-offset-2' : ''}
                      ${index === 0 ? 'ring-yellow-400' : ''}
                      ${index === 1 ? 'ring-gray-400' : ''}
                      ${index === 2 ? 'ring-amber-500' : ''}
                    `}>
                      <img
                        src={entry.avatar}
                        alt={entry.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {entry.username}
                      </div>
                      <div className="text-sm text-gray-500 sm:hidden">
                        {entry.points.toLocaleString()} pts
                      </div>
                    </div>
                  </div>
                </td>
                {/* Desktop Stats */}
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="font-medium">
                    {entry.points.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  {entry.totalWins.toLocaleString()}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  {entry.totalBets.toLocaleString()}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  {entry.winRate.toFixed(1)}%
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="flex items-center">
                    <Flame className={`h-4 w-4 mr-1 ${
                      entry.streak > 5 ? 'text-red-500' : 'text-gray-400'
                    }`} />
                    <span>{entry.streak}</span>
                  </div>
                </td>
                {/* Mobile Stats Summary */}
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap sm:hidden">
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Win Rate:</span>
                      <span className="font-medium">{entry.winRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className={`h-4 w-4 ${
                        entry.streak > 5 ? 'text-red-500' : 'text-gray-400'
                      }`} />
                      <span className="font-medium">{entry.streak}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 