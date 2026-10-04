// Size scale only. Semantic roles (h1, body, caption...) live in <Typography> variants.
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
} as const;

// Paired with FONT_SIZE so multi-line text has consistent rhythm
export const LINE_HEIGHT = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 28,
  xxl: 32,
  xxxl: 36,
} as const;

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;
