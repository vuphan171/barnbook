const PALETTE = {
  green600: '#2E7D32',
  green800: '#1B5E20',
  red500: '#E53935',
  red700: '#C62828',
  amber500: '#E0A100',
  amber800: '#8A5A00',
  amber300: '#F9C74F',
  white: '#FFFFFF',
  grey50: '#FAFAF7',
  grey100: '#EEF1EA',
  grey200: '#DCE0D8',
  grey300: '#B9BFB4',
  grey500: '#7D8579',
  grey700: '#4A5247',
  grey900: '#1C2419',
  black: '#000000',
} as const;

// Semantic colors: components should use these, not the raw palette
export const COLORS = {
  primary: PALETTE.green600,
  primaryForeground: PALETTE.white,
  secondary: PALETTE.white,
  secondaryForeground: PALETTE.grey900,
  destructive: PALETTE.red500,
  destructiveForeground: PALETTE.white,
  apple: PALETTE.black,
  appleForeground: PALETTE.white,
  foreground: '#1C2419',
  background: PALETTE.grey50,
  surface: PALETTE.white,
  muted: PALETTE.grey100,

  text: PALETTE.grey900,
  textSecondary: PALETTE.grey700,
  textLabel: PALETTE.grey900,
  placeholder: PALETTE.grey500,

  border: PALETTE.grey300,
  borderStrong: PALETTE.grey500,
  divider: PALETTE.grey200,
  error: PALETTE.red700,
  warning: PALETTE.amber500,
  warningText: PALETTE.amber800,
  accent: PALETTE.amber300,
} as const;

export type ColorName = keyof typeof COLORS;
