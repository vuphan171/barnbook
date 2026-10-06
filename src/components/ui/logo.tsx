import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/themes';

type Props = ViewProps;

export const Logo = ({ style, ...rest }: Props) => {
  return (
    <View accessibilityRole='header' style={[styles.container, style]} {...rest}>
      <View style={styles.mark}>
        <Svg
          width={20}
          height={20}
          viewBox='0 0 24 24'
          fill='none'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <Path
            d='M4 11l8-6 8 6v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z'
            stroke={COLORS.primaryForeground}
          />
          <Path d='M12 20v-5c0-2 1.5-3.5 3.5-3.5' stroke={COLORS.accent} />
        </Svg>
      </View>
      <Text style={styles.name}>Barnbook</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  mark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: FONT_SIZE.xl,
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.text,
  },
});
