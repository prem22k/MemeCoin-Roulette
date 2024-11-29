import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  overlay?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'md',
  overlay = false
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const Content = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader 
        className={`
          ${sizeClasses[size]} 
          text-purple-600 
          animate-spin-slow
        `}
      />
      {message && (
        <p className="text-sm text-gray-500 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center 
        bg-white/80 backdrop-blur-sm z-50"
      >
        <Content />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <Content />
    </div>
  );
}; 