import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { CheckIcon } from '@/components/icons';
import { COLORS, CONTROL_HEIGHT, RADIUS, SPACING } from '@/themes';

type Props = Omit<PressableProps, 'children' | 'onPress' | 'style'> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Checkbox = ({ checked, onChange, children, style, ...rest }: Props) => {
  return (
    <Pressable
      accessibilityRole='checkbox'
      {...rest}
      accessibilityState={{ ...rest.accessibilityState, checked }}
      onPress={() => onChange(!checked)}
      style={[styles.container, style]}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <CheckIcon color={COLORS.primary.foreground} /> : null}
      </View>
      {children ? <View style={styles.label}>{children}</View> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: CONTROL_HEIGHT.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.borderStrong,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    borderColor: COLORS.primary.default,
    backgroundColor: COLORS.primary.default,
  },
  label: {
    flex: 1,
  },
});
