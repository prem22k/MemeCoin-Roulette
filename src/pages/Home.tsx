import React from 'react';
import { TrendingMemes } from '../components/TrendingMemes';
import { LiveFeed } from '../components/LiveFeed';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Main Content */}
      <section className="grid lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Trending Section */}
        <div className="space-y-4 transform transition-all duration-500 hover:scale-[1.02]">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Trending Memes
          </h2>
          <div className="h-[450px] bg-white rounded-2xl shadow-xl overflow-hidden 
            border border-gray-100 hover:border-purple-200 transition-colors">
            <TrendingMemes />
          </div>
        </div>

        {/* Live Feed Section */}
        <div className="space-y-4 transform transition-all duration-500 hover:scale-[1.02]">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Live Activity
          </h2>
          <LiveFeed />
        </div>
      </section>
    </div>
  );
};
