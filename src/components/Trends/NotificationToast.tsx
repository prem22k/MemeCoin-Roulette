import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, TrendingUp, TrendingDown } from 'lucide-react';
import { zIndexLevels } from '../../styles/z-index';

interface TrendNotificationProps {
  type: 'success' | 'error' | 'trending-up' | 'trending-down';
  message: string;
  onClose: () => void;
  duration?: number;
  coinSymbol?: string;
  coinThumbnail?: string;
}

export const TrendNotificationToast: React.FC<TrendNotificationProps> = ({
  type,
  message,
  onClose,
  duration = 5000,
  coinSymbol,
  coinThumbnail
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getNotificationConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle2,
          gradient: 'from-green-100 to-green-50',
          textColor: 'text-green-800',
          iconColor: 'text-green-600'
        };
      case 'error':
        return {
          icon: AlertCircle,
          gradient: 'from-red-100 to-red-50',
          textColor: 'text-red-800',
          iconColor: 'text-red-600'
        };
      case 'trending-up':
        return {
          icon: TrendingUp,
          gradient: 'from-purple-100 to-blue-50',
          textColor: 'text-purple-800',
          iconColor: 'text-purple-600'
        };
      case 'trending-down':
        return {
          icon: TrendingDown,
          gradient: 'from-orange-100 to-red-50',
          textColor: 'text-orange-800',
          iconColor: 'text-orange-600'
        };
      default:
        return {
          icon: CheckCircle2,
          gradient: 'from-gray-100 to-gray-50',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-600'
        };
    }
  };

  const config = getNotificationConfig();
  const Icon = config.icon;

  return (
    <div 
      className={`
        fixed bottom-4 right-4 
        flex items-center space-x-3 p-4 rounded-lg
        shadow-lg hover:shadow-xl
        transform transition-all duration-300 ease-in-out
        animate-slideIn
        bg-gradient-to-r ${config.gradient}
        ${config.textColor}
      `}
      style={{ zIndex: zIndexLevels.notification }}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${config.iconColor}`}>
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        {coinSymbol && coinThumbnail && (
          <div className="flex items-center space-x-2 mb-1">
            <img
              src={coinThumbnail}
              alt={coinSymbol}
              className="w-4 h-4 rounded-full"
            />
            <span className="font-medium">{coinSymbol}</span>
          </div>
        )}
        <p className="text-sm truncate">
          {message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className={`
          flex-shrink-0 p-1 
          hover:bg-black/5 rounded-full 
          transition-colors
        `}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}; 