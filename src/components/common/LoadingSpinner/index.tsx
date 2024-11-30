import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader className="h-8 w-8 text-purple-600 animate-spin" />
    </div>
  );
}; 