import React from 'react';
import { AlertCircle, RefreshCw, WifiOff, Clock, Key } from 'lucide-react';
import { AppError } from '../../utils/errorHandling';
import { buttonStyles } from '../../styles/buttons';

interface ErrorDisplayProps {
  error: AppError;
  onRetry: () => void;
  retryCount: number;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  retryCount
}) => {
  const getErrorIcon = () => {
    switch (error.code) {
      case 'NETWORK_ERROR':
        return <WifiOff className="h-12 w-12" />;
      case 'RATE_LIMIT':
        return <Clock className="h-12 w-12" />;
      case 'INVALID_API_KEY':
        return <Key className="h-12 w-12" />;
      default:
        return <AlertCircle className="h-12 w-12" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-xl">
      <div className="text-red-500 mb-4">
        {getErrorIcon()}
      </div>
      <p className="text-red-700 font-medium mb-2">{error.message}</p>
      <p className="text-red-600/70 text-sm mb-4">
        {retryCount > 0 && `Retry attempt ${retryCount}/3`}
      </p>
      {retryCount < 3 && (
        <button
          onClick={onRetry}
          className={`${buttonStyles.primary} animate-bounce`}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
}; 