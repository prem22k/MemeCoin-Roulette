import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import { LiveActivity, generateMockActivity } from '../../data/mockActivity';
import { BetHistory } from '../BetHistory';
import { userService } from '../../services/userService';
import { motion, AnimatePresence } from 'framer-motion';

export const LiveFeed: React.FC = () => {
  const [showBetHistory, setShowBetHistory] = useState(false);
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const userStats = userService.getStats();

  useEffect(() => {
    const loadInitialActivities = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const initialActivities = Array.from({ length: 5 }, () => generateMockActivity());
        setActivities(initialActivities);
      } finally {
        setLoading(false);
      }
    };

    loadInitialActivities();

    const interval = setInterval(() => {
      const newActivity = generateMockActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 animate-pulse"
          >
            {/* Stats Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                      <div className="h-3 w-1/4 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Stats Overview */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Your Stats</h3>
                <button
                  onClick={() => setShowBetHistory(!showBetHistory)}
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700
                    transition-colors"
                >
                  <History className="w-4 h-4" />
                  {showBetHistory ? 'Hide History' : 'View History'}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="font-semibold text-lg">
                    {userStats.balance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Win Rate</p>
                  <p className="font-semibold text-lg">
                    {userStats.totalBets > 0
                      ? ((userStats.winCount / userStats.totalBets) * 100).toFixed(1)
                      : '0'}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Bets</p>
                  <p className="font-semibold text-lg">
                    {userStats.totalBets.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Bet History */}
            {showBetHistory && <BetHistory />}

            {/* Live Activity Feed */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Live Activity</h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-[450px] overflow-y-auto">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-gray-50 transition-colors animate-fadeIn"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={activity.avatar}
                        alt={activity.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium text-gray-900">
                            {activity.username}
                          </span>
                          {' '}
                          <span className={activity.action === 'win' 
                            ? 'text-green-600' 
                            : activity.action === 'loss' 
                            ? 'text-red-600' 
                            : 'text-gray-600'
                          }>
                            {activity.action === 'win' 
                              ? 'won' 
                              : activity.action === 'loss' 
                              ? 'lost' 
                              : 'bet'
                            }
                          </span>
                          {' '}
                          <span className="font-medium">
                            {activity.amount.toLocaleString()}
                          </span>
                          {' points on '}
                          <span className="font-medium">
                            ${activity.coinSymbol}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};