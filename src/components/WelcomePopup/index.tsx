import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

interface WelcomePopupProps {
  onClose: () => void;
}

const memeImages = [
  {
    src: '/assets/lets-go-gambling.png',
    alt: "Let's go gambling meme"
  },
  {
    src: '/assets/im-a-loser-cat-with-gambling-addiction.png',
    alt: 'Gambling cat meme'
  },
  {
    src: '/assets/im-a-chill-who-loves-to-gamble.png',
    alt: 'Chill gambler meme'
  }
];

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const randomMeme = memeImages[Math.floor(Math.random() * memeImages.length)];

  useEffect(() => {
    // Play audio when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(error => {
        console.log('Audio autoplay failed:', error);
      });
    }

    // Add escape key listener
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center 
        bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 
          text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Welcome to MemeCoin Roulette!</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Meme Content */}
        <div className="p-6">
          <div className="relative rounded-lg overflow-hidden mb-4">
            <img
              src={randomMeme.src}
              alt={randomMeme.alt}
              className="w-full h-auto"
            />
          </div>

          {/* Audio Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={toggleMute}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 
                rounded-lg hover:bg-gray-200 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 transition-colors"
            >
              Let's Go!
            </button>
          </div>
        </div>

        <audio
          ref={audioRef}
          src="/assets/gambling-chill-audio.mp3"
          muted={isMuted}
        />
      </motion.div>
    </motion.div>
  );
}; 