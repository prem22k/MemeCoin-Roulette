import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart2, 
  Users, 
  Trophy,
  ArrowRight,
  Activity
} from 'lucide-react';
import { CompactTrendingMemes } from '../components/TrendingMemes/CompactTrendingMemes';
import { LiveActivityFeed } from '../components/LiveFeed/LiveActivityFeed';

export const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Track meme popularity with dynamic charts and advanced analytics tools.",
      gradient: "from-purple-600 to-purple-400"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a vibrant community of trend predictors and share insights.",
      gradient: "from-green-600 to-green-400"
    },
    {
      icon: Trophy,
      title: "Competitive Rewards",
      description: "Climb the leaderboard and earn rewards for successful predictions.",
      gradient: "from-amber-600 to-amber-400"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center
        bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 overflow-hidden">
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
          >
            MemeCoin Roulette
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Predict the next viral meme trend and compete with other traders
            in this exciting prediction game
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => navigate('/trending')}
              className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold
                hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              <TrendingUp className="h-5 w-5" />
              Start Predicting
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="px-8 py-3 bg-purple-500/20 text-white rounded-lg font-semibold
                hover:bg-purple-500/30 transition-colors flex items-center gap-2"
            >
              <BarChart2 className="h-5 w-5" />
              View Trends
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose MemeCoin Roulette?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-6 rounded-xl bg-gradient-to-br ${feature.gradient} 
                text-white shadow-lg hover:shadow-xl transition-all duration-300
                hover:scale-105`}
            >
              <feature.icon className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/90">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending and Activity Section */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trending Memes */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                Trending Memes
              </h2>
              <button
                onClick={() => navigate('/trending')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700
                  transition-colors"
              >
                View All
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </button>
            </div>
            <CompactTrendingMemes />
          </div>

          {/* Live Activity */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Activity className="h-6 w-6 text-purple-600" />
                Live Activity
              </h2>
            </div>
            <div className="h-[600px]">
              <LiveActivityFeed />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
