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
  primary: {
    default: PALETTE.green600,
    pressed: PALETTE.green800,
    foreground: PALETTE.white,
  },
  secondary: {
    default: PALETTE.white,
    pressed: PALETTE.grey100,
    foreground: PALETTE.grey900,
  },
  destructive: {
    default: PALETTE.red500,
    pressed: PALETTE.red700,
    foreground: PALETTE.white,
  },
  apple: {
    default: PALETTE.black,
    pressed: PALETTE.grey900,
    foreground: PALETTE.white,
  },

  background: PALETTE.grey50,
  surface: PALETTE.white,

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

// Plain color for a token name; grouped tokens (primary, ...) resolve to their default.
export const colorOf = (name: ColorName): string => {
  const value = COLORS[name];
  return typeof value === 'string' ? value : value.default;
};
