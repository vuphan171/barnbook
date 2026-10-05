import React from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ChevronLeftIcon } from '@/components/icons';

import { COLORS, CONTROL_HEIGHT, RADIUS } from '@/themes';

type Props = Omit<PressableProps, 'children' | 'onPress' | 'accessibilityLabel' | 'style'> & {
  onPress: NonNullable<PressableProps['onPress']>;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

export const BackButton = ({ style, ...rest }: Props) => (
  <Pressable
    accessibilityRole='button'
    {...rest}
    style={({ pressed }) => [styles.container, pressed && styles.pressed, style]}
  >
    <ChevronLeftIcon size={28} color={COLORS.text} />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    width: CONTROL_HEIGHT.md,
    height: CONTROL_HEIGHT.md,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: COLORS.secondary.pressed,
  },
});
