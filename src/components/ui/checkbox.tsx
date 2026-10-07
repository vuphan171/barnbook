import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { CheckIcon } from '@/components/icons';

type Props = Omit<PressableProps, 'children' | 'onPress' | 'style'> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Checkbox: React.FC<Props> = ({ checked, onChange, children, style, ...rest }) => {
  const { theme } = useUnistyles();

  styles.useVariants({ checked });

  return (
    <Pressable
      accessibilityRole='checkbox'
      {...rest}
      accessibilityState={{ ...rest.accessibilityState, checked }}
      onPress={() => onChange(!checked)}
      style={[styles.container, style]}
    >
      <View style={styles.box}>
        {checked ? <CheckIcon color={theme.colors.primaryForeground} /> : null}
      </View>
      {children ? <View style={styles.label}>{children}</View> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    minHeight: theme.controlHeight.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.input,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      checked: {
        true: {
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.primary,
        },
      },
    },
  },
  label: {
    flex: 1,
  },
}));
