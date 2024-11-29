import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
  noPadding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = '7xl',
  noPadding = false
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
  };

  return (
    <div className={`
      container mx-auto 
      ${!noPadding ? 'px-4 sm:px-6 lg:px-8' : ''}
      transition-all duration-300
      ${maxWidthClasses[maxWidth]}
      ${className}
    `}>
      {children}
    </div>
  );
}; 