import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { BetStatus } from '../../types';

interface BetStatusBadgeProps {
  status: BetStatus;
  size?: 'sm' | 'md';
}

export const BetStatusBadge: React.FC<BetStatusBadgeProps> = ({ 
  status,
  size = 'md'
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'won':
        return {
          icon: CheckCircle2,
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          label: 'Won'
        };
      case 'lost':
        return {
          icon: XCircle,
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          label: 'Lost'
        };
      case 'pending':
        return {
          icon: Clock,
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          label: 'Pending'
        };
      default:
        return {
          icon: Clock,
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          label: status.toUpperCase()
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`
      inline-flex items-center justify-center space-x-1
      ${size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
      font-medium rounded-full border
      ${config.bg} ${config.text} ${config.border}
      transition-all duration-200
      hover:scale-105
    `}>
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      <span>{config.label}</span>
    </span>
  );
};