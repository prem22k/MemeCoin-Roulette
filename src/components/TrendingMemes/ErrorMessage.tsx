import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { buttonStyles } from '../../styles/buttons';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = ''
}) => {
  return (
    <div className={`
      bg-gradient-to-r from-red-50 to-red-100
      rounded-xl p-6 sm:p-8
      border border-red-200
      shadow-sm
      animate-fadeIn
      ${className}
    `}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600 mb-4">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className={`
                  ${buttonStyles.primary}
                  bg-red-600 hover:bg-red-700
                  inline-flex items-center space-x-2
                  group
                `}
              >
                <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Try Again</span>
              </button>
            )}
            <button
              onClick={() => window.location.reload()}
              className={`
                ${buttonStyles.secondary}
                text-red-700 border-red-300
                hover:bg-red-50
              `}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-4 pt-4 border-t border-red-200">
        <p className="text-sm text-red-600 text-center sm:text-left">
          If the problem persists, please try again later or contact support.
        </p>
      </div>
    </div>
  );
};