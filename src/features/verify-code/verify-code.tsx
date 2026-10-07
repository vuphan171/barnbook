import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Trans, useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '@/navigation/types';

import { ChevronLeftIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { OtpInput } from '@/components/ui/otp-input';
import { Typography } from '@/components/ui/typography';

import { AuthService, InvalidCodeError } from '@/services/auth-service';

import { ROUTES } from '@/configs/routes';
import { COLORS, FONT_FAMILY, SPACING } from '@/themes';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_S = 60;

const formatCountdown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

const VerifyCodeScreen: React.FC<RootStackScreenProps<typeof ROUTES.VERIFY_CODE>> = ({
  navigation,
  route,
}) => {
  const { email } = route.params;
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_S);

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const verify = useMutation({
    mutationFn: AuthService.verifyResetCode,
  });

  const resend = useMutation({
    mutationFn: AuthService.requestPasswordReset,
    onSuccess: () => {
      setCode('');
      verify.reset();
      setCooldown(RESEND_COOLDOWN_S);
    },
  });

  const invalidCode = verify.error instanceof InvalidCodeError ? verify.error : null;
  const locked = invalidCode?.attemptsLeft === 0;

  const submit = (value: string) => verify.mutate({ email, code: value });

  const onChangeCode = (value: string) => {
    setCode(value);
    if (verify.isError) verify.reset();
    if (value.length === CODE_LENGTH) submit(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps='handled'
        bottomOffset={SPACING.lg}
      >
        <Button
          variant='ghost'
          size='icon'
          icon={ChevronLeftIcon}
          accessibilityLabel={t('common.back')}
          onPress={navigation.goBack}
          style={styles.backButton}
        />
        <Typography variant='h1' style={styles.title}>
          {t('verifyCode.title')}
        </Typography>
        <Typography style={styles.tagline}>
          <Trans
            i18nKey='verifyCode.sentTo'
            values={{ email }}
            components={{ email: <Typography style={styles.email} /> }}
          />
        </Typography>

        <OtpInput
          value={code}
          onChangeText={onChangeCode}
          length={CODE_LENGTH}
          error={!!invalidCode}
          editable={!verify.isPending && !locked}
          autoFocus
          style={styles.otp}
        />

        <ErrorMessage
          error={
            invalidCode
              ? locked
                ? t('verifyCode.locked')
                : t('verifyCode.incorrect', { count: invalidCode.attemptsLeft })
              : verify.error
          }
          style={styles.error}
        />

        <Button
          title={t('verifyCode.submit')}
          size='lg'
          onPress={() => submit(code)}
          disabled={code.length < CODE_LENGTH || !!invalidCode}
          loading={verify.isPending}
          style={styles.submit}
        />

        <Button
          variant='outline'
          title={
            cooldown > 0
              ? t('verifyCode.resendIn', { time: formatCountdown(cooldown) })
              : t('verifyCode.resend')
          }
          size='lg'
          onPress={() => resend.mutate({ email })}
          disabled={cooldown > 0 || verify.isPending}
          loading={resend.isPending}
          style={styles.resend}
        />

        <ErrorMessage error={resend.error} style={styles.error} />

        <Button
          variant='ghost'
          title={t('verifyCode.differentEmail')}
          textStyle={styles.differentEmail}
          onPress={navigation.goBack}
          style={styles.differentEmailButton}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  backButton: {
    marginTop: SPACING.sm,
    marginLeft: -SPACING.lg,
  },
  title: {
    marginTop: SPACING.xs,
  },
  tagline: {
    color: COLORS.mutedForeground,
  },
  email: {
    fontFamily: FONT_FAMILY.semibold,
    color: COLORS.foreground,
  },
  otp: {
    marginTop: SPACING.xl,
  },
  error: {
    marginTop: SPACING.sm,
  },
  submit: {
    marginTop: SPACING.xxl,
  },
  resend: {
    marginTop: SPACING.md,
  },
  differentEmailButton: {
    alignSelf: 'center',
    marginTop: SPACING.md,
  },
  differentEmail: {
    color: COLORS.primary,
  },
});

export { VerifyCodeScreen };
