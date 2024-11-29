import { theme } from './theme';

export const spacing = {
  section: 'py-4 sm:py-6 md:py-8',
  container: theme.spacing.container,
  layout: {
    header: 'h-16 sm:h-20',
    footer: 'py-8',
    main: 'min-h-[calc(100vh-theme(spacing.header.DEFAULT))]',
  },
  grid: {
    base: 'grid gap-6',
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    },
  },
  stack: {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-start justify-start',
    end: 'flex items-end justify-end',
  },
} as const; 