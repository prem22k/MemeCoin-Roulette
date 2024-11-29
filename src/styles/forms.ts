import { theme } from './theme';

export const formStyles = {
  base: `
    w-full
    rounded-lg
    border border-gray-300
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder-gray-400
    ${theme.transitions.base}
  `,

  input: `
    px-4 py-2
    bg-white
    hover:border-gray-400
  `,

  textarea: `
    px-4 py-2
    bg-white
    hover:border-gray-400
    resize-none
  `,

  select: `
    px-4 py-2
    bg-white
    hover:border-gray-400
    appearance-none
    bg-no-repeat
    bg-right-4
  `,

  label: `
    block
    text-sm font-medium
    text-gray-700
    mb-1
  `,

  error: `
    text-sm text-red-600
    mt-1 flex items-center space-x-1
  `,

  group: `
    space-y-4
  `,

  checkbox: {
    container: `
      flex items-center space-x-2
    `,
    input: `
      h-4 w-4
      text-purple-600
      rounded
      focus:ring-purple-500
      border-gray-300
    `,
    label: `
      text-sm text-gray-700
    `,
  },

  radio: {
    container: `
      flex items-center space-x-2
    `,
    input: `
      h-4 w-4
      text-purple-600
      focus:ring-purple-500
      border-gray-300
    `,
    label: `
      text-sm text-gray-700
    `,
  },
} as const; 
