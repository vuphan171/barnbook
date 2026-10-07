import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type Props = ViewProps;

export const Logo: React.FC<Props> = ({ style, ...rest }) => {
  const { theme } = useUnistyles();

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
            stroke={theme.colors.primaryForeground}
          />
          <Path d='M12 20v-5c0-2 1.5-3.5 3.5-3.5' stroke={theme.colors.warning} />
        </Svg>
      </View>
      <Text style={styles.name}>Barnbook</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  mark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.foreground,
  },
}));
