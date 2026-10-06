import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type ButtonVariant = 'primary' | 'secondary' | 'destructive';

type ButtonSize = 'sm' | 'md' | 'lg';

type Props = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const Button = ({
  title,
  variant = 'primary',
  size = 'md',
  disabled,
  loading = false,
  style,
  textStyle,
  ...rest
}: Props) => {
  const { theme } = useUnistyles();
  const isDisabled = !!disabled || loading;
  const spinnerColor = {
    primary: theme.colors.primaryForeground,
    secondary: theme.colors.secondaryForeground,
    destructive: theme.colors.destructiveForeground,
  }[variant];

  styles.useVariants({ variant, size });

  return (
    <Pressable
      accessibilityRole='button'
      {...rest}
      accessibilityState={{
        ...rest.accessibilityState,
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={[styles.label, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: {
          backgroundColor: theme.colors.secondary,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
        },
        destructive: { backgroundColor: theme.colors.destructive },
      } satisfies Record<ButtonVariant, ViewStyle>,
      size: {
        sm: { minHeight: theme.controlHeight.sm, paddingHorizontal: theme.spacing.md },
        md: { minHeight: theme.controlHeight.md, paddingHorizontal: theme.spacing.xl },
        lg: { minHeight: theme.controlHeight.lg, paddingHorizontal: theme.spacing.xxl },
      } satisfies Record<ButtonSize, ViewStyle>,
    },
  },
  pressed: {
    variants: {
      variant: {
        primary: { opacity: 0.9 },
        secondary: { backgroundColor: theme.colors.muted },
        destructive: { opacity: 0.9 },
      } satisfies Record<ButtonVariant, ViewStyle>,
    },
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: theme.fontFamily.semibold,
    variants: {
      variant: {
        primary: { color: theme.colors.primaryForeground },
        secondary: { color: theme.colors.secondaryForeground },
        destructive: { color: theme.colors.destructiveForeground },
      } satisfies Record<ButtonVariant, TextStyle>,
      size: {
        sm: { fontSize: theme.fontSize.sm },
        md: { fontSize: theme.fontSize.md },
        lg: { fontSize: theme.fontSize.lg },
      } satisfies Record<ButtonSize, TextStyle>,
    },
  },
}));
