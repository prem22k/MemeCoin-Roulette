export const theme = {
  colors: {
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    success: {
      light: '#10b981',
      DEFAULT: '#059669',
      dark: '#047857',
    },
    error: {
      light: '#ef4444',
      DEFAULT: '#dc2626',
      dark: '#b91c1c',
    },
    warning: {
      light: '#f59e0b',
      DEFAULT: '#d97706',
      dark: '#b45309',
    },
    info: {
      light: '#3b82f6',
      DEFAULT: '#2563eb',
      dark: '#1d4ed8',
    },
  },

  spacing: {
    container: {
      sm: 'max-w-sm mx-auto px-4',
      md: 'max-w-md mx-auto px-4 sm:px-6',
      lg: 'max-w-lg mx-auto px-4 sm:px-6 lg:px-8',
      xl: 'max-w-xl mx-auto px-4 sm:px-6 lg:px-8',
      '2xl': 'max-w-2xl mx-auto px-4 sm:px-6 lg:px-8',
      '7xl': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    },
    section: {
      sm: 'py-4 sm:py-6',
      md: 'py-6 sm:py-8 md:py-12',
      lg: 'py-8 sm:py-12 md:py-16',
      xl: 'py-12 sm:py-16 md:py-20',
    },
  },

  transitions: {
    base: 'transition-all duration-300 ease-in-out',
    fast: 'transition-all duration-150 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
    transform: 'transform transition-transform duration-300 ease-in-out',
  },

  animations: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    slideIn: 'animate-slideIn',
    pulse: 'animate-pulse',
    spin: 'animate-spin-slow',
    bounce: 'animate-bounce',
    gradient: 'animate-gradient-x',
  },

  shadows: {
    sm: 'shadow-sm hover:shadow transition-shadow duration-300',
    md: 'shadow-md hover:shadow-lg transition-shadow duration-300',
    lg: 'shadow-lg hover:shadow-xl transition-shadow duration-300',
    xl: 'shadow-xl hover:shadow-2xl transition-shadow duration-300',
  },

  gradients: {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600',
    secondary: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600',
    error: 'bg-gradient-to-r from-red-600 to-rose-600',
    warning: 'bg-gradient-to-r from-yellow-600 to-orange-600',
  },

  blur: {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  },
} as const; 