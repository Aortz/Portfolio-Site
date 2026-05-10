const shared = {
  font: {
    mono: `'JetBrains Mono', 'IBM Plex Mono', 'IBMPlexMonoBold', ui-monospace, SFMono-Regular, Menlo, monospace`,
    sans: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    accent: `'Kolker Brush', 'Brush Script MT', cursive`,
  },
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.5rem',
    '2xl': '2.25rem',
    '3xl': '3.5rem',
    '4xl': '5rem',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
    16: '64px',
    24: '96px',
  },
  radius: { sm: '4px', md: '8px', lg: '12px', xl: '20px', pill: '999px' },
  motion: {
    fast: '150ms',
    base: '250ms',
    slow: '400ms',
    ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  bp: { sm: '375px', md: '768px', lg: '1024px', xl: '1440px' },
};

export const darkTokens = {
  ...shared,
  mode: 'dark',
  color: {
    bg: '#000000',
    surface: '#18181B',
    surfaceAlt: '#27272A',
    fg: '#FAFAFA',
    fgMuted: '#A1A1AA',
    fgSubtle: '#71717A',
    border: '#27272A',
    accent: '#2563EB',
    accentHover: '#3B82F6',
    onAccent: '#FFFFFF',
    danger: '#DC2626',
  },
};

export const lightTokens = {
  ...shared,
  mode: 'light',
  color: {
    bg: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceAlt: '#F4F4F5',
    fg: '#09090B',
    fgMuted: '#52525B',
    fgSubtle: '#71717A',
    border: '#E4E4E7',
    accent: '#2563EB',
    accentHover: '#1D4ED8',
    onAccent: '#FFFFFF',
    danger: '#DC2626',
  },
};

export const tokensFor = (mode) => (mode === 'light' ? lightTokens : darkTokens);
