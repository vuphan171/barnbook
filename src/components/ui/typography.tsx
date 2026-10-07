import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ColorName } from '@/themes';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'caption';

type Props = TextProps & {
  variant?: TypographyVariant;
  color?: ColorName;
  asLink?: boolean;
};

export const Typography: React.FC<Props> = ({
  variant = 'body',
  color,
  asLink = false,
  style,
  ...rest
}) => {
  const { theme } = useUnistyles();

  styles.useVariants({ variant, asLink });

  return (
    <Text
      accessibilityRole={asLink ? 'link' : undefined}
      style={[styles.text, color && { color: theme.colors[color] }, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  text: {
    color: theme.colors.foreground,
    variants: {
      variant: {
        h1: {
          fontSize: theme.fontSize.xxxl,
          lineHeight: theme.lineHeight.xxxl,
          fontFamily: theme.fontFamily.bold,
        },
        h2: {
          fontSize: theme.fontSize.xxl,
          lineHeight: theme.lineHeight.xxl,
          fontFamily: theme.fontFamily.bold,
        },
        h3: {
          fontSize: theme.fontSize.xl,
          lineHeight: theme.lineHeight.xl,
          fontFamily: theme.fontFamily.semibold,
        },
        subtitle: {
          fontSize: theme.fontSize.lg,
          lineHeight: theme.lineHeight.lg,
          fontFamily: theme.fontFamily.medium,
        },
        body: {
          fontSize: theme.fontSize.md,
          lineHeight: theme.lineHeight.md,
          fontFamily: theme.fontFamily.regular,
        },
        bodySmall: {
          fontSize: theme.fontSize.sm,
          lineHeight: theme.lineHeight.sm,
          fontFamily: theme.fontFamily.regular,
        },
        label: {
          fontSize: theme.fontSize.sm,
          lineHeight: theme.lineHeight.sm,
          fontFamily: theme.fontFamily.medium,
        },
        caption: {
          fontSize: theme.fontSize.xs,
          lineHeight: theme.lineHeight.xs,
          fontFamily: theme.fontFamily.regular,
        },
      } satisfies Record<TypographyVariant, TextStyle>,
      asLink: {
        true: {
          color: theme.colors.primary,
          fontFamily: theme.fontFamily.semibold,
        },
      },
    },
  },
}));
