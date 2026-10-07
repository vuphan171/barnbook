import React, { ReactNode, useState } from 'react';
import { Text, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ErrorMessage } from './error-message';

export type InputSize = 'sm' | 'md' | 'lg';

type Props = TextInputProps & {
  size?: InputSize;
  label?: string;
  error?: string;
  suffix?: ReactNode;
};

export const Input: React.FC<Props> = ({
  size = 'md',
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
    size,
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
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.foreground,
    backgroundColor: theme.colors.card,
    variants: {
      size: {
        sm: {
          minHeight: theme.controlHeight.sm,
          paddingHorizontal: theme.spacing.md,
          fontSize: theme.fontSize.sm,
        },
        md: {
          minHeight: theme.controlHeight.md,
          paddingHorizontal: theme.spacing.lg,
          fontSize: theme.fontSize.md,
        },
        lg: {
          minHeight: theme.controlHeight.lg,
          paddingHorizontal: theme.spacing.lg,
          fontSize: theme.fontSize.lg,
        },
      } satisfies Record<InputSize, TextStyle>,
      state: {
        default: { borderWidth: 1.5, borderColor: theme.colors.border },
        error: { borderWidth: 2, borderColor: theme.colors.destructive },
        focused: { borderWidth: 2, borderColor: theme.colors.ring },
      },
      withSuffix: {
        true: {},
      },
    },
    compoundVariants: (['sm', 'md', 'lg'] as const).map((size) => ({
      size,
      withSuffix: true,
      styles: { paddingRight: theme.controlHeight[size] + theme.spacing.xs },
    })),
  },
  suffix: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
}));
