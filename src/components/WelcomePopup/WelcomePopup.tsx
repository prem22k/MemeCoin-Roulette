import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { getRandomMemeAsset } from '../../data/welcomeAssets';

interface WelcomePopupProps {
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const randomAsset = useRef(getRandomMemeAsset());

  const startAudio = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
        setShowPermissionDialog(false);
      } catch (error) {
        console.log('Audio playback failed:', error);
        setIsMuted(true);
        setShowPermissionDialog(false);
      }
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      if (!newMutedState) {
        audioRef.current.play().catch(error => 
          console.log('Audio playback error:', error)
        );
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-purple-500/20"
          onClick={e => e.stopPropagation()}
        >
          {showPermissionDialog ? (
            <div className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-center">Ready for the full experience?</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                This meme comes with sound! Would you like to enable it?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setIsMuted(true);
                    setShowPermissionDialog(false);
                  }}
                  className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 
                    transition-colors font-medium"
                >
                  Skip Sound
                </button>
                <button
                  onClick={startAudio}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 
                    text-white rounded-xl hover:from-purple-700 hover:to-blue-700 
                    transition-colors font-medium"
                >
                  Enable Sound
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 
                text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYwIiBoZWlnaHQ9IjU2MCIgdmlld0JveD0iMCAwIDU2MCA1NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImEiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjEiIG9mZnNldD0iMCUiLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGZpbGw9InVybCgjYSkiIGQ9Ik01NjAgMjgwQzU2MCA0MzQuNyA0MzQuNyA1NjAgMjgwIDU2MFMwIDQzNC43IDAgMjgwIDEyNS4zIDAgMjgwIDBzMjgwIDEyNS4zIDI4MCAyODB6Ii8+Cjwvc3ZnPgo=')] opacity-30"></div>
                <div className="relative flex justify-between items-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                    Welcome to MemeCoin Roulette!
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Meme Content */}
              <div className="p-6 space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-black/90 shadow-xl ring-1 ring-white/10">
                  {/* Loading Placeholder */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-800/90">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 
                          rounded-full animate-spin" />
                      </div>
                    </div>
                  )}
                  
                  <motion.img
                    src={randomAsset.current.image}
                    alt={randomAsset.current.alt}
                    className="w-full h-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isImageLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    onLoad={() => setIsImageLoaded(true)}
                    onError={(e) => {
                      console.error('Image failed to load:', randomAsset.current.image);
                      console.error('Error:', e);
                    }}
                  />

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                      from-black via-black/80 to-transparent p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isImageLoaded ? 1 : 0, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-white text-lg font-medium text-center">
                      {randomAsset.current.title}
                    </p>
                  </motion.div>
                </div>

                {/* Audio Controls */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMute}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl 
                        transition-all duration-200 font-medium
                        ${isMuted 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                      <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                    </motion.button>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                      text-white rounded-xl hover:from-purple-700 hover:to-blue-700 
                      transition-colors font-medium shadow-lg shadow-purple-500/20
                      ring-1 ring-purple-500/50"
                  >
                    Let's Go! 🚀
                  </motion.button>
                </div>
              </div>
            </>
          )}

          <audio
            ref={audioRef}
            src={randomAsset.current.audio}
            muted={isMuted}
            loop
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 
