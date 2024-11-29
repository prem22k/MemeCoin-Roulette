import { theme } from './theme';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'ghost' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

const baseStyles = `
  inline-flex items-center justify-center
  font-medium rounded-lg
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  ${theme.transitions.base}
`;

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    ${theme.gradients.primary}
    text-white
    hover:opacity-90
    focus:ring-purple-500
    ${theme.shadows.md}
  `,
  secondary: `
    border border-gray-300
    text-gray-700
    hover:bg-gray-50 hover:border-gray-400
    focus:ring-gray-500
    ${theme.shadows.sm}
  `,
  success: `
    ${theme.gradients.success}
    text-white
    hover:opacity-90
    focus:ring-green-500
    ${theme.shadows.md}
  `,
  error: `
    ${theme.gradients.error}
    text-white
    hover:opacity-90
    focus:ring-red-500
    ${theme.shadows.md}
  `,
  ghost: `
    text-gray-600
    hover:bg-gray-100
    focus:ring-gray-500
  `,
  icon: `
    p-2 rounded-lg
    text-gray-600
    hover:bg-gray-100
    focus:ring-gray-500
    ${theme.transitions.transform}
    hover:scale-105
  `,
};

export const buttonStyles = {
  getStyles: (variant: ButtonVariant = 'primary', size: ButtonSize = 'md') => {
    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
  },
  primary: `${baseStyles} ${sizeStyles.md} ${variantStyles.primary}`,
  secondary: `${baseStyles} ${sizeStyles.md} ${variantStyles.secondary}`,
  success: `${baseStyles} ${sizeStyles.md} ${variantStyles.success}`,
  error: `${baseStyles} ${sizeStyles.md} ${variantStyles.error}`,
  ghost: `${baseStyles} ${sizeStyles.md} ${variantStyles.ghost}`,
  icon: `${baseStyles} ${variantStyles.icon}`,
} as const; 
