import React from 'react';
import { StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '@/navigation/types';

import { ChevronLeftIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';

import { AuthService } from '@/services/auth-service';

import { ROUTES } from '@/configs/routes';
import { COLORS, SPACING } from '@/themes';

import { createForgotPasswordSchema, ForgotPasswordForm } from './schema';

const ForgotPasswordScreen: React.FC<RootStackScreenProps<typeof ROUTES.FORGOT_PASSWORD>> = ({
  navigation,
}) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(createForgotPasswordSchema(t)),
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  const requestReset = useMutation({
    mutationFn: AuthService.requestPasswordReset,
    onSuccess: (_, { email }) => navigation.navigate(ROUTES.VERIFY_CODE, { email }),
  });

  const onSubmit = (values: ForgotPasswordForm) => requestReset.mutate(values);

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
          {t('forgotPassword.title')}
        </Typography>
        <Typography variant='body' style={styles.tagline}>
          {t('forgotPassword.tagline')}
        </Typography>

        <View style={styles.field}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('forgotPassword.email')}
                placeholder={t('forgotPassword.emailPlaceholder')}
                value={value}
                onChangeText={(text) => onChange(text.trim())}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                textContentType='emailAddress'
              />
            )}
          />
        </View>

        <Button
          title={t('forgotPassword.submit')}
          size='lg'
          onPress={() => handleSubmit(onSubmit)()}
          disabled={!isValid}
          loading={requestReset.isPending}
          style={styles.submit}
        />

        <ErrorMessage error={requestReset.error} style={styles.error} />

        <Button
          variant='ghost'
          title={t('forgotPassword.backToSignIn')}
          textStyle={styles.backToSignIn}
          onPress={() => navigation.popTo(ROUTES.SIGN_IN)}
          style={styles.backToSignInButton}
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
  field: {
    marginTop: SPACING.xl,
  },
  submit: {
    marginTop: SPACING.xxl,
  },
  error: {
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  backToSignInButton: {
    alignSelf: 'center',
    marginTop: SPACING.md,
  },
  backToSignIn: {
    color: COLORS.primary,
  },
});

export { ForgotPasswordScreen };
