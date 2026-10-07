import React from 'react';
import { Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { PASSWORD_STRENGTH, type PasswordStrength } from '@/utils/password-strength';

const LEVELS = {
  [PASSWORD_STRENGTH.weak]: 'weak',
  [PASSWORD_STRENGTH.medium]: 'medium',
  [PASSWORD_STRENGTH.strong]: 'strong',
} as const;

type Level = (typeof LEVELS)[keyof typeof LEVELS];

const SEGMENTS = [
  PASSWORD_STRENGTH.weak,
  PASSWORD_STRENGTH.medium,
  PASSWORD_STRENGTH.strong,
] as const;

const DEFAULT_LABELS = {
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
};

type Props = ViewProps & {
  strength: PasswordStrength;
  labels?: typeof DEFAULT_LABELS;
};

export const PasswordStrengthBar: React.FC<Props> = ({
  strength,
  labels = DEFAULT_LABELS,
  style,
  ...rest
}) => {
  const level = strength === PASSWORD_STRENGTH.empty ? undefined : LEVELS[strength];

  styles.useVariants({ level });

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.bars}>
        {SEGMENTS.map((segment) => (
          <View key={segment} style={[styles.bar, strength >= segment && styles.barFilled]} />
        ))}
      </View>
      <Text accessibilityLiveRegion='polite' style={styles.label}>
        {level ? labels[level] : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  bars: {
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  bar: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.colors.border,
  },
  barFilled: {
    variants: {
      level: {
        weak: { backgroundColor: theme.colors.destructive },
        medium: { backgroundColor: theme.colors.warning },
        strong: { backgroundColor: theme.colors.primary },
      } satisfies Record<Level, ViewStyle>,
    },
  },
  label: {
    minWidth: 84,
    textAlign: 'right',
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.semibold,
    color: theme.colors.mutedForeground,
    variants: {
      level: {
        weak: { color: theme.colors.destructive },
        medium: { color: theme.colors.warningForeground },
        strong: { color: theme.colors.primary },
      } satisfies Record<Level, TextStyle>,
    },
  },
}));
