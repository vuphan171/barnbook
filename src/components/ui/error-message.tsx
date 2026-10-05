import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/themes';

type Props = Omit<TextProps, 'children'> & {
  error?: string | Error | null;
};

export const ErrorMessage = ({ error, style, ...rest }: Props) => {
  const message = error instanceof Error ? error.message : error;

  if (!message) return null;

  return (
    <Text accessibilityRole='alert' style={[styles.text, style]} {...rest}>
      {message}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.xs,
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.error,
  },
});
