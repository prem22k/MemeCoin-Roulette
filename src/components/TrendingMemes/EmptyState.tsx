import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { buttonStyles } from '../../styles/buttons';

interface EmptyStateProps {
  onRefresh: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => (
  <div className="min-h-[400px] flex items-center justify-center p-4">
    <div className="text-center p-8 bg-gray-50 rounded-xl max-w-md">
      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No Memes Found
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn't find any trending memes right now. Try refreshing or check back later.
      </p>
      <button
        onClick={onRefresh}
        className={buttonStyles.secondary}
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        Refresh
      </button>
    </div>
  </div>
); 