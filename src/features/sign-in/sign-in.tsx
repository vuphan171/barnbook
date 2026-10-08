import React from 'react';
import { StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '@/navigation/types';

import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { SocialSignIn } from '@/components/ui/social-sign-in';
import { Typography } from '@/components/ui/typography';

import { AuthService, InvalidCredentialsError } from '@/services/auth-service';

import { ROUTES } from '@/configs/routes';
import { COLORS, SPACING } from '@/themes';

import { Hero } from './hero';
import { createSignInSchema, SignInForm } from './schema';

const SignInScreen: React.FC<RootStackScreenProps<typeof ROUTES.SIGN_IN>> = ({ navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(createSignInSchema(t)),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const login = useMutation({
    mutationFn: AuthService.login,
    onSuccess: ({ user }) => {
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME, params: { email: user.email } }],
      });
    },
    onError: (error) => {
      if (error instanceof InvalidCredentialsError) {
        setError('password', { message: t('signIn.invalidCredentials') });
      }
    },
  });

  const onSubmit = (values: SignInForm) => login.mutate(values);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps='handled'
        bottomOffset={SPACING.lg}
      >
        <View style={[styles.hero, { paddingTop: insets.top }]}>
          <Hero />
        </View>
        <View style={styles.content}>
          <Typography variant='h1' color='primary'>
            Barnbook
          </Typography>
          <Typography style={styles.tagline}>{t('signIn.tagline')}</Typography>

          <View style={styles.fields}>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('signIn.email')}
                  placeholder={t('signIn.emailPlaceholder')}
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
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  label={t('signIn.password')}
                  placeholder='••••••••'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  autoComplete='password'
                  textContentType='password'
                  showPasswordLabel={t('common.showPassword')}
                  hidePasswordLabel={t('common.hidePassword')}
                />
              )}
            />
          </View>

          <Typography
            asLink
            onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
            style={styles.forgotPassword}
          >
            {t('signIn.forgotPassword')}
          </Typography>

          <Button
            title={t('signIn.submit')}
            size='lg'
            onPress={() => handleSubmit(onSubmit)()}
            loading={login.isPending}
            style={styles.submit}
          />

          {login.error instanceof InvalidCredentialsError ? null : (
            <ErrorMessage error={login.error} style={styles.error} />
          )}

          <SocialSignIn style={styles.social} />

          <Typography color='mutedForeground' style={styles.footer}>
            <Trans
              i18nKey='signIn.noAccount'
              components={{
                signUp: <Typography asLink onPress={() => navigation.navigate(ROUTES.SIGN_UP)} />,
              }}
            />
          </Typography>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flexGrow: 1,
  },
  hero: {
    backgroundColor: COLORS.muted,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
  },
  tagline: {
    color: COLORS.mutedForeground,
  },
  fields: {
    marginTop: SPACING.xxl,
    gap: SPACING.lg,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingVertical: SPACING.sm,
  },
  submit: {
    marginTop: SPACING.md,
  },
  error: {
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  social: {
    marginVertical: SPACING.xxl,
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
  },
});

export { SignInScreen };
