const PALETTE = {
  red500: '#E53935',
  red700: '#C62828',
  white: '#FFFFFF',
  grey50: '#FAFAFA',
  grey300: '#E0E0E0',
  grey500: '#9E9E9E',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',
} as const;

// Semantic colors: components should use these, not the raw palette
export const COLORS = {
  primary: '#1a7f42',
  primaryPressed: PALETTE.red700,
  onPrimary: PALETTE.white,

  secondary: PALETTE.white,
  secondaryPressed: PALETTE.grey300,
  onSecondary: PALETTE.grey900,

  destructive: PALETTE.red500,
  destructivePressed: PALETTE.red700,
  onDestructive: PALETTE.white,

  background: PALETTE.grey50,
  surface: PALETTE.white,

  text: PALETTE.grey900,
  textSecondary: PALETTE.grey700,
  textLabel: PALETTE.grey800,
  placeholder: PALETTE.grey500,

  border: PALETTE.grey300,
  error: PALETTE.red500,
} as const;

export type ColorName = keyof typeof COLORS;
