import React from 'react';
import { Text, TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = Omit<TextProps, 'children'> & {
  error?: string | Error | null;
};

export const ErrorMessage: React.FC<Props> = ({ error, style, ...rest }) => {
  const message = error instanceof Error ? error.message : error;

  if (!message) return null;

  return (
    <Text accessibilityRole='alert' style={[styles.text, style]} {...rest}>
      {message}
    </Text>
  );
};

const styles = StyleSheet.create((theme) => ({
  text: {
    fontSize: theme.fontSize.xs,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.destructive,
  },
}));
