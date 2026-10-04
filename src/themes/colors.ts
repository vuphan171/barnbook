const PALETTE = {
  green600: '#1A7F42',
  green700: '#146535',
  red500: '#E53935',
  red700: '#C62828',
  white: '#FFFFFF',
  grey50: '#FAFAFA',
  grey100: '#F5F5F5',
  grey300: '#E0E0E0',
  grey500: '#9E9E9E',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',
} as const;

// Semantic colors: components should use these, not the raw palette
export const COLORS = {
  primary: {
    default: PALETTE.green600,
    pressed: PALETTE.green700,
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

// Plain color for a token name; grouped tokens (primary, ...) resolve to their default.
export const colorOf = (name: ColorName): string => {
  const value = COLORS[name];
  return typeof value === 'string' ? value : value.default;
};
