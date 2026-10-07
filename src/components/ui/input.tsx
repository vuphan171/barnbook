import React, { ReactNode, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ErrorMessage } from './error-message';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  suffix?: ReactNode;
};

export const Input: React.FC<Props> = ({
  label,
  error,
  suffix,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const { theme } = useUnistyles();
  const [focused, setFocused] = useState(false);

  styles.useVariants({
    state: focused ? 'focused' : error ? 'error' : undefined,
    withSuffix: !!suffix,
  });

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View>
        <TextInput
          placeholderTextColor={theme.colors.mutedForeground}
          aria-invalid={!!error}
          style={[styles.input, style]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {suffix ? <View style={styles.suffix}>{suffix}</View> : null}
      </View>
      <ErrorMessage error={error} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.semibold,
    color: theme.colors.foreground,
  },
  input: {
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.lg,
    minHeight: theme.controlHeight.md,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.foreground,
    backgroundColor: theme.colors.card,
    variants: {
      state: {
        default: { borderWidth: 1.5, borderColor: theme.colors.border },
        error: { borderWidth: 2, borderColor: theme.colors.destructive },
        focused: { borderWidth: 2, borderColor: theme.colors.ring },
      },
      withSuffix: {
        true: { paddingRight: theme.controlHeight.md + theme.spacing.xs },
      },
    },
  },
  suffix: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
}));
