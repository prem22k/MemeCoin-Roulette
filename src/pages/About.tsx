import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Coins, 
  Users, 
  Sparkles, 
  BarChart2,
  Trophy,
  Brain,
  Target
} from 'lucide-react';
import { buttonStyles } from '../styles/buttons';

export const About: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-Time Tracking',
      description: 'Monitor meme trends as they happen with our advanced tracking system.',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      icon: Coins,
      title: 'Virtual Betting',
      description: 'Practice your prediction skills with our risk-free virtual betting system.',
      gradient: 'from-green-600 to-teal-600'
    },
    {
      icon: Users,
      title: 'Community Insights',
      description: 'Learn from other users and see what the community thinks will trend next.',
      gradient: 'from-orange-600 to-pink-600'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Track Trends',
      description: 'Monitor real-time meme popularity and engagement metrics.',
      icon: BarChart2,
      color: 'purple'
    },
    {
      number: '02',
      title: 'Make Predictions',
      description: 'Place virtual bets on which memes you think will trend next.',
      icon: Brain,
      color: 'blue'
    },
    {
      number: '03',
      title: 'Learn & Improve',
      description: 'Track your prediction accuracy and learn from the community.',
      icon: Target,
      color: 'green'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
          Welcome to MemeCoin Roulette
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your gateway to predicting and tracking the next big meme trends in the crypto world.
        </p>
        <button
          onClick={() => navigate('/trending')}
          className={`${buttonStyles.primary} text-lg`}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Start Predicting
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="relative group p-8 rounded-2xl bg-white shadow-xl 
              hover-lift overflow-hidden"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} 
              opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            
            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient}
              text-white mb-4 transform transition-transform duration-300
              group-hover:scale-110 group-hover:rotate-3`}
            >
              <feature.icon className="w-6 h-6" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold mb-2 group-hover:text-transparent
              group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600
              group-hover:to-blue-600 transition-all duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative group hover-lift"
            >
              {/* Step Number */}
              <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full
                bg-${step.color}-100 text-${step.color}-600 flex items-center justify-center
                font-bold text-lg transform transition-transform duration-300
                group-hover:scale-110 group-hover:rotate-12`}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className={`inline-flex p-3 rounded-lg bg-${step.color}-100
                  text-${step.color}-600 mb-4 transform transition-transform duration-300
                  group-hover:scale-110`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our community and start predicting the next big meme trends today.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/trending')}
            className={buttonStyles.primary}
          >
            <Trophy className="w-5 h-5 mr-2" />
            Start Betting
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className={buttonStyles.secondary}
          >
            View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};