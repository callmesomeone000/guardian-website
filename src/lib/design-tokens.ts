export const colors = {
  background: {
    primary: '#05080C',
    secondary: '#0A0F1A',
    tertiary: '#101828',
    elevated: '#141D2F',
  },
  foreground: {
    primary: '#F0F4F8',
    secondary: '#C8D4E0',
    tertiary: '#8B9BB0',
    muted: '#5E6E82',
  },
  accent: {
    cyan: '#00D4C8',
    cyanSoft: '#00D4C820',
    cyanMuted: '#00D4C840',
    teal: '#00B8A9',
    blue: '#3B82F6',
    blueSoft: '#3B82F620',
    amber: '#F59E0B',
    red: '#EF4444',
    green: '#10B981',
  },
  border: {
    primary: '#1E2D3D',
    secondary: '#2D3E50',
    accent: '#00D4C840',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #00D4C8 0%, #3B82F6 100%)',
    subtle: 'linear-gradient(135deg, #00D4C810 0%, #3B82F610 100%)',
    radial: 'radial-gradient(ellipse at center, #00D4C810 0%, transparent 70%)',
  },
};

export const typography = {
  fontFamilies: {
    sans: ['Geist', 'Inter', 'Manrope', 'system-ui', 'sans-serif'],
    mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.1em',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
};

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
  glow: '0 0 20px rgb(0 212 200 / 0.3)',
  glowStrong: '0 0 40px rgb(0 212 200 / 0.5)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
  toast: 600,
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
};

export type DesignTokens = typeof designTokens;