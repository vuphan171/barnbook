import { StyleSheet } from 'react-native-unistyles';

import { COLORS } from './colors';
import { CONTROL_HEIGHT } from './sizes';
import { RADIUS, SPACING } from './spacing';
import { FONT_FAMILY, FONT_SIZE, LINE_HEIGHT } from './typography';

const lightTheme = {
  colors: COLORS,
  spacing: SPACING,
  radius: RADIUS,
  controlHeight: CONTROL_HEIGHT,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
  lineHeight: LINE_HEIGHT,
};

const appThemes = {
  light: lightTheme,
};

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: appThemes,
  settings: { initialTheme: 'light' },
});
