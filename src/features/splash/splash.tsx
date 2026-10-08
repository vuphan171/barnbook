import React, { useState } from 'react';
import { Image, LayoutChangeEvent, StatusBar, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import BootSplash from 'react-native-bootsplash';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

import type { RootStackScreenProps } from '@/navigation/types';

import { Typography } from '@/components/ui/typography';

import { ROUTES } from '@/configs/routes';
import { COLORS, RADIUS, SPACING } from '@/themes';

import manifest from '../../../assets/bootsplash/manifest.json';
import { version } from '../../../package.json';

const REVEAL_DURATION = 500;
const LOADING_DURATION = 1500;

const SplashScreen: React.FC<RootStackScreenProps<typeof ROUTES.SPLASH>> = ({ navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [measured, setMeasured] = useState(false);

  const logoOffset = useSharedValue(0);
  const reveal = useSharedValue(0);
  const progress = useSharedValue(0);

  const goToSignIn = () => navigation.replace(ROUTES.SIGN_IN);

  const { container, logo } = BootSplash.useHideAnimation({
    manifest,
    logo: require('../../../assets/bootsplash/logo.png'),
    ready: measured,
    animate: () => {
      reveal.value = withTiming(1, {
        duration: REVEAL_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      progress.value = withDelay(
        REVEAL_DURATION,
        withTiming(1, { duration: LOADING_DURATION }, (finished) => {
          if (finished) {
            scheduleOnRN(goToSignIn);
          }
        }),
      );
    },
  });

  // Start with the logo where the native splash drew it (screen center), then slide the group into place
  const onTextLayout = (event: LayoutChangeEvent) => {
    logoOffset.value = event.nativeEvent.layout.height / 2;
    setMeasured(true);
  };

  const groupStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoOffset.value * (1 - reveal.value) }],
  }));
  const fadeInStyle = useAnimatedStyle(() => ({ opacity: reveal.value }));
  const barStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  return (
    <View {...container}>
      <StatusBar barStyle='light-content' />
      <Animated.View style={[styles.group, groupStyle]}>
        <Image {...logo} />
        <Animated.View style={[styles.text, fadeInStyle]} onLayout={onTextLayout}>
          <Typography variant='h1' color='primaryForeground' style={styles.title}>
            Barnbook
          </Typography>
          <Typography color='primaryForeground'>{t('splash.tagline')}</Typography>
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.footer, { bottom: insets.bottom + SPACING.xxl }, fadeInStyle]}>
        <View style={styles.track}>
          <Animated.View style={[styles.bar, barStyle]} />
        </View>
        <Typography variant='bodySmall' color='primaryForeground'>
          {t('splash.version', { version })}
        </Typography>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    alignItems: 'center',
  },
  text: {
    alignItems: 'center',
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.xxl,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: SPACING.xxl,
  },
  track: {
    width: 184,
    height: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryForeground + '40',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryForeground,
  },
});

export { SplashScreen };
