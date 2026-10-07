import React, { ComponentType } from 'react';
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

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type Props = Omit<PressableProps, 'children' | 'style'> & {
  title?: string;
  icon?: ComponentType<{ color: string; size?: number }>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const Button: React.FC<Props> = ({
  title,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  disabled,
  loading = false,
  style,
  textStyle,
  ...rest
}) => {
  const { theme } = useUnistyles();
  const isDisabled = !!disabled || loading;

  const foregroundColor = {
    primary: theme.colors.primaryForeground,
    secondary: theme.colors.secondaryForeground,
    destructive: theme.colors.destructiveForeground,
    outline: theme.colors.primary,
    ghost: theme.colors.foreground,
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
        <ActivityIndicator color={foregroundColor} />
      ) : (
        <>
          {Icon && <Icon color={foregroundColor} size={size === 'icon' ? 28 : 20} />}
          {title && (
            <Text style={[styles.label, { color: foregroundColor }, textStyle]}>{title}</Text>
          )}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
        destructive: { backgroundColor: theme.colors.destructive },
        outline: {
          borderWidth: 1.5,
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.card,
        },
        ghost: {},
      } satisfies Record<ButtonVariant, ViewStyle>,
      size: {
        sm: { minHeight: theme.controlHeight.sm, paddingHorizontal: theme.spacing.md },
        md: { minHeight: theme.controlHeight.md, paddingHorizontal: theme.spacing.xl },
        lg: { minHeight: theme.controlHeight.lg, paddingHorizontal: theme.spacing.xxl },
        icon: {
          width: theme.controlHeight.md,
          height: theme.controlHeight.md,
          borderRadius: theme.radius.full,
        },
      } satisfies Record<ButtonSize, ViewStyle>,
    },
  },
  pressed: {
    variants: {
      variant: {
        primary: { opacity: 0.9 },
        secondary: { opacity: 0.9 },
        destructive: { opacity: 0.9 },
        outline: { backgroundColor: theme.colors.muted },
        ghost: { backgroundColor: theme.colors.muted },
      } satisfies Record<ButtonVariant, ViewStyle>,
    },
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: theme.fontFamily.semibold,
    variants: {
      size: {
        sm: { fontSize: theme.fontSize.sm },
        md: { fontSize: theme.fontSize.md },
        lg: { fontSize: theme.fontSize.lg },
        icon: { fontSize: theme.fontSize.md },
      } satisfies Record<ButtonSize, TextStyle>,
    },
  },
}));
