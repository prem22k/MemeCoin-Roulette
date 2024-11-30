import React, { useState, useEffect } from 'react';
import { generateMockActivity } from '../../data/mockActivity';
import { motion, AnimatePresence } from 'framer-motion';

export const LiveActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Initialize with some activities
    setActivities(Array.from({ length: 5 }, () => generateMockActivity()));

    // Add new activity every few seconds
    const interval = setInterval(() => {
      setActivities(prev => [generateMockActivity(), ...prev.slice(0, 9)]);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={activity.avatar}
                  alt={activity.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.username}</span>
                    {' '}
                    <span className={activity.action === 'win' 
                      ? 'text-green-600' 
                      : activity.action === 'loss' 
                      ? 'text-red-600' 
                      : 'text-gray-600'
                    }>
                      {activity.action === 'win' ? 'won' : activity.action === 'loss' ? 'lost' : 'bet'}
                    </span>
                    {' '}
                    <span className="font-medium">{activity.amount.toLocaleString()}</span>
                    {' points on '}
                    <span className="font-medium">${activity.coinSymbol}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}; 