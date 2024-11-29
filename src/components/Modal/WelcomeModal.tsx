import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Rocket, ArrowRight, TrendingUp } from 'lucide-react';
import { useRandomMeme } from '../../hooks/useRandomMeme';
import { zIndexLevels } from '../../styles/z-index';
import { buttonStyles } from '../../styles/buttons';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentMeme, refreshMeme } = useRandomMeme();

  useEffect(() => {
    if (isOpen) {
      refreshMeme();
    }
  }, [isOpen, refreshMeme]);

  useEffect(() => {
    if (isOpen && audioRef.current && currentMeme) {
      audioRef.current.play().catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }
  }, [isOpen, currentMeme]);

  if (!isOpen || !currentMeme) return null;

  const steps = [
    {
      icon: TrendingUp,
      title: 'Track Trends',
      description: 'Monitor real-time meme popularity and engagement metrics.'
    },
    {
      icon: Sparkles,
      title: 'Make Predictions',
      description: 'Place virtual bets on which memes will trend next.'
    },
    {
      icon: Rocket,
      title: 'Compete & Win',
      description: 'Climb the leaderboard and prove your prediction skills!'
    }
  ];

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-0"
      style={{ zIndex: zIndexLevels.modal }}
    >
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ zIndex: zIndexLevels.modalBackdrop }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl 
          transform transition-all duration-300 animate-slideUp overflow-hidden"
        style={{ zIndex: zIndexLevels.modal + 1 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 
            hover:bg-gray-100 rounded-lg transition-all duration-200 z-10"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Content */}
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
            <img
              src={currentMeme.image}
              alt="Welcome"
              className="w-full h-full object-cover animate-ken-burns"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome to MemeCoin Roulette
              </h2>
              <p className="text-white/90">
                Your journey into meme prediction starts here!
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="p-6 sm:p-8 space-y-8">
            <div className="grid gap-6">
              {steps.map((step, index) => (
                <div 
                  key={step.title}
                  className="flex items-start space-x-4 animate-fadeIn"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <step.icon className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className={`
                ${buttonStyles.primary}
                w-full group relative overflow-hidden
                animate-fadeIn animation-delay-500
              `}
            >
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 
                opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentMeme.sound}
        className="hidden"
      />
    </div>
  );
};