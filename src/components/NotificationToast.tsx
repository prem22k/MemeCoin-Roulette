import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { zIndexLevels } from '../styles/z-index';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationProps> = ({
  type,
  message,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`
        fixed bottom-4 right-4 
        flex items-center space-x-2 p-4 rounded-lg
        shadow-lg hover:shadow-xl
        transform transition-all duration-300 ease-in-out
        animate-slideIn
        ${type === 'success'
          ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800'
          : 'bg-gradient-to-r from-red-100 to-red-50 text-red-800'
        }
      `}
      style={{ zIndex: zIndexLevels.notification }}
    >
      {type === 'success' ? (
        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      )}
      <span className="text-sm">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};