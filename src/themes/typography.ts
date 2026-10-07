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
  md: 22,
  lg: 24,
  xl: 26,
  xxl: 30,
  xxxl: 36,
} as const;

// Be Vietnam Pro ships one file per weight; pick the family instead of setting fontWeight,
// otherwise Android synthesizes a fake bold on top of the file.
export const FONT_FAMILY = {
  regular: 'BeVietnamPro-Regular',
  medium: 'BeVietnamPro-Medium',
  semibold: 'BeVietnamPro-SemiBold',
  bold: 'BeVietnamPro-Bold',
  extrabold: 'BeVietnamPro-ExtraBold',
} as const;
