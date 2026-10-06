const PALETTE = {
  light: {
    background: '#FFFFFF',
    foreground: '#0F1F14',

    card: '#FFFFFF',
    cardForeground: '#0F1F14',
    popover: '#FFFFFF',
    popoverForeground: '#0F1F14',

    primary: '#10B94D',
    primaryForeground: '#052E16',

    secondary: '#1F6FB0',
    secondaryForeground: '#FFFFFF',

    muted: '#F1F5F2',
    mutedForeground: '#56665B',

    accent: '#E6F6EC',
    accentForeground: '#0E5A29',

    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',

    success: '#15803D',
    successForeground: '#FFFFFF',
    warning: '#F59E0B',
    warningForeground: '#3A2503',
    info: '#4F5FD0',
    infoForeground: '#FFFFFF',

    link: '#0C8536',

    border: '#DCE4DE',
    input: '#7F9286',
    ring: '#0C8536',

    chart1: '#10B94D',
    chart2: '#1F6FB0',
    chart3: '#F59E0B',
    chart4: '#8B5E3C',
    chart5: '#7C5CD6',
  },
  dark: {
    background: '#0A120D',
    foreground: '#EAF4ED',

    card: '#111B15',
    cardForeground: '#EAF4ED',
    popover: '#111B15',
    popoverForeground: '#EAF4ED',

    primary: '#22C55E',
    primaryForeground: '#052E16',

    secondary: '#5AA9E6',
    secondaryForeground: '#06233B',

    muted: '#1A261F',
    mutedForeground: '#9DB0A3',

    accent: '#163221',
    accentForeground: '#B5EBC8',

    destructive: '#F87171',
    destructiveForeground: '#2B0707',

    success: '#4ADE80',
    successForeground: '#052E16',
    warning: '#FBBF24',
    warningForeground: '#3A2503',
    info: '#8B97F0',
    infoForeground: '#0E1440',

    link: '#22C55E',

    border: '#25332A',
    input: '#566A5D',
    ring: '#22C55E',

    chart1: '#22C55E',
    chart2: '#5AA9E6',
    chart3: '#FBBF24',
    chart4: '#C08A5E',
    chart5: '#A48BF0',
  },
} as const;

export type ColorScheme = keyof typeof PALETTE;
export type ColorToken = keyof typeof PALETTE.light;
export type Colors = Record<ColorToken, string>;

export default PALETTE;

// Semantic colors: components should use these, not the raw palette
export const COLORS = {
  ...PALETTE.light,
  // Apple's sign-in button guidelines require pure black/white
  apple: '#000000',
  appleForeground: '#FFFFFF',
} as const;

export type ColorName = keyof typeof COLORS;
