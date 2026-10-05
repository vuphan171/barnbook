import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { ColorName, colorOf, COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT } from '@/themes';

const variants = StyleSheet.create({
  h1: {
    fontSize: FONT_SIZE.xxxl,
    lineHeight: LINE_HEIGHT.xxxl,
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.foreground,
  },
  h2: {
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxl,
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.foreground,
  },
  h3: {
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xl,
    fontFamily: FONT_FAMILY.semibold,
    color: COLORS.foreground,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    lineHeight: LINE_HEIGHT.lg,
    fontFamily: FONT_FAMILY.medium,
    color: COLORS.foreground,
  },
  body: {
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.foreground,
  },
  bodySmall: {
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.foreground,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    fontFamily: FONT_FAMILY.medium,
    color: COLORS.foreground,
  },
  caption: {
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.foreground,
  },
});

export type TypographyVariant = keyof typeof variants;

type Props = TextProps & {
  variant?: TypographyVariant;
  color?: ColorName;
  asLink?: boolean;
};

export const Typography = ({ variant = 'body', color, asLink = false, style, ...rest }: Props) => {
  const colorStyle = color ? { color: colorOf(color) } : null;

  return (
    <Text
      accessibilityRole={asLink ? 'link' : undefined}
      style={[variants[variant], asLink && styles.link, colorStyle, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  link: {
    color: COLORS.primary.default,
    fontFamily: FONT_FAMILY.semibold,
  },
});
