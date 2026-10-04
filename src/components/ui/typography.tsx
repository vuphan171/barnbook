import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import {
  ColorName,
  colorOf,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from '@/themes';

const variants = StyleSheet.create({
  h1: {
    fontSize: FONT_SIZE.xxxl,
    lineHeight: LINE_HEIGHT.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  h2: {
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  h3: {
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xl,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    lineHeight: LINE_HEIGHT.lg,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
  },
  body: {
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
    color: COLORS.text,
  },
  bodySmall: {
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: COLORS.textSecondary,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textLabel,
  },
  caption: {
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    color: COLORS.textSecondary,
  },
});

export type TypographyVariant = keyof typeof variants;

type Props = TextProps & {
  variant?: TypographyVariant;
  color?: ColorName;
};

export const Typography = ({
  variant = 'body',
  color,
  style,
  ...rest
}: Props) => {
  const colorStyle = color ? { color: colorOf(color) } : null;

  return <Text style={[variants[variant], colorStyle, style]} {...rest} />;
};
