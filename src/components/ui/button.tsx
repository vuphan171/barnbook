import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { COLORS, CONTROL_HEIGHT, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/themes';

const VARIANTS = {
  primary: StyleSheet.create({
    container: { backgroundColor: COLORS.primary.default },
    pressed: { backgroundColor: COLORS.primary.pressed },
    label: { color: COLORS.primary.foreground },
  }),
  secondary: StyleSheet.create({
    container: {
      backgroundColor: COLORS.secondary.default,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: COLORS.border,
    },
    pressed: { backgroundColor: COLORS.secondary.pressed },
    label: { color: COLORS.secondary.foreground },
  }),
  destructive: StyleSheet.create({
    container: { backgroundColor: COLORS.destructive.default },
    pressed: { backgroundColor: COLORS.destructive.pressed },
    label: { color: COLORS.destructive.foreground },
  }),
};

const SIZES = {
  sm: StyleSheet.create({
    container: { minHeight: CONTROL_HEIGHT.sm, paddingHorizontal: SPACING.md },
    label: { fontSize: FONT_SIZE.sm },
  }),
  md: StyleSheet.create({
    container: { minHeight: CONTROL_HEIGHT.md, paddingHorizontal: SPACING.xl },
    label: { fontSize: FONT_SIZE.md },
  }),
  lg: StyleSheet.create({
    container: { minHeight: CONTROL_HEIGHT.lg, paddingHorizontal: SPACING.xxl },
    label: { fontSize: FONT_SIZE.lg },
  }),
};

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

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
  const isDisabled = !!disabled || loading;
  const v = VARIANTS[variant];
  const s = SIZES[size];

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
        styles.base,
        v.container,
        pressed && v.pressed,
        s.container,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.label.color} />
      ) : (
        <Text style={[styles.label, v.label, s.label, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: FONT_FAMILY.semibold,
  },
});
