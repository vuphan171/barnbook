import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PASSWORD_STRENGTH, type PasswordStrength } from '@/utils/password-strength';

import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/themes';

const LEVELS = {
  [PASSWORD_STRENGTH.weak]: {
    bar: COLORS.destructive,
    text: COLORS.destructive,
    label: 'common.passwordStrength.weak',
  },
  [PASSWORD_STRENGTH.medium]: {
    bar: COLORS.warning,
    text: COLORS.warningForeground,
    label: 'common.passwordStrength.medium',
  },
  [PASSWORD_STRENGTH.strong]: {
    bar: COLORS.primary,
    text: COLORS.primary,
    label: 'common.passwordStrength.strong',
  },
} as const;

const SEGMENTS = [
  PASSWORD_STRENGTH.weak,
  PASSWORD_STRENGTH.medium,
  PASSWORD_STRENGTH.strong,
] as const;

type Props = ViewProps & {
  strength: PasswordStrength;
};

export const PasswordStrengthBar = ({ strength, style, ...rest }: Props) => {
  const { t } = useTranslation();
  const level = strength === PASSWORD_STRENGTH.empty ? null : LEVELS[strength];

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.bars}>
        {SEGMENTS.map((segment) => (
          <View
            key={segment}
            style={[styles.bar, level && strength >= segment && { backgroundColor: level.bar }]}
          />
        ))}
      </View>
      <Text accessibilityLiveRegion='polite' style={[styles.label, level && { color: level.text }]}>
        {level ? t(level.label) : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  bars: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  bar: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  label: {
    minWidth: 84,
    textAlign: 'right',
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.semibold,
    color: COLORS.mutedForeground,
  },
});
