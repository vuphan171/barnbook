import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppleIcon, GoogleIcon } from '@/components/icons';

import { Typography } from './typography';

type Props = ViewProps & {
  onApplePress?: () => void;
  onGooglePress?: () => void;
};

export const SocialSignIn: React.FC<Props> = ({ onApplePress, onGooglePress, style, ...rest }) => {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Typography variant='bodySmall' color='mutedForeground'>
          {t('common.orContinueWith')}
        </Typography>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.buttons}>
        <Pressable
          accessibilityRole='button'
          accessibilityLabel={t('common.continueWithApple')}
          onPress={onApplePress}
          style={({ pressed }) => [styles.button, styles.apple, pressed && styles.applePressed]}
        >
          <AppleIcon color={theme.colors.appleForeground} />
        </Pressable>
        <Pressable
          accessibilityRole='button'
          accessibilityLabel={t('common.continueWithGoogle')}
          onPress={onGooglePress}
          style={({ pressed }) => [styles.button, styles.google, pressed && styles.googlePressed]}
        >
          <GoogleIcon />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apple: {
    backgroundColor: theme.colors.apple,
  },
  applePressed: {
    opacity: 0.9,
  },
  google: {
    borderWidth: 1,
    borderColor: theme.colors.input,
    backgroundColor: theme.colors.background,
  },
  googlePressed: {
    backgroundColor: theme.colors.muted,
  },
}));
