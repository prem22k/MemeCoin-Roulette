import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'text-purple-600'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] space-y-4">
      <Loader 
        className={`
          ${sizeClasses[size]} 
          ${color}
          animate-spin-slow
        `}
      />
      <span className="text-sm text-gray-500 animate-pulse">
        Loading...
      </span>
    </div>
  );
};