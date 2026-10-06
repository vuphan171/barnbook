import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '@/navigation/types';

import { AppleIcon, GoogleIcon } from '@/components/icons';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { PasswordStrengthBar } from '@/components/ui/password-strength-bar';
import { Typography } from '@/components/ui/typography';

import { AuthService, EmailTakenError } from '@/services/auth-service';

import { getPasswordStrength } from '@/utils/password-strength';

import { PRIVACY_URL, TERMS_URL } from '@/configs/links';
import { ROUTES } from '@/configs/routes';
import { COLORS, RADIUS, SPACING } from '@/themes';

import { createSignUpSchema, SignUpForm } from './schema';

const SignUpScreen = ({ navigation }: RootStackScreenProps<typeof ROUTES.SIGN_UP>) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(createSignUpSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      agree: false,
    },
    mode: 'onTouched',
  });

  const register = useMutation({
    mutationFn: AuthService.register,
    onSuccess: ({ user }) => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ROUTES.HOME,
            params: {
              email: user.email,
            },
          },
        ],
      });
    },
    onError: (error) => {
      if (error instanceof EmailTakenError) {
        setError('email', {
          message: t('validation.emailTaken'),
        });
      }
    },
  });

  const onSubmit = ({ name, email, password }: SignUpForm) =>
    register.mutate({
      name,
      email,
      password,
    });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps='handled'
        bottomOffset={SPACING.lg}
      >
        <BackButton
          accessibilityLabel={t('common.back')}
          onPress={navigation.goBack}
          style={styles.backButton}
        />
        <Typography variant='h1' style={styles.title}>
          {t('signUp.title')}
        </Typography>
        <Typography variant='body' style={styles.tagline}>
          {t('signUp.tagline')}
        </Typography>
        <View style={styles.fields}>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('signUp.name')}
                placeholder={t('signUp.namePlaceholder')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
                autoComplete='name'
                textContentType='name'
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('signUp.email')}
                placeholder={t('signUp.emailPlaceholder')}
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
              <View style={styles.passwordField}>
                <PasswordInput
                  label={t('signUp.password')}
                  placeholder={t('signUp.passwordPlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoComplete='new-password'
                  textContentType='newPassword'
                />
                <PasswordStrengthBar strength={getPasswordStrength(value)} />
              </View>
            )}
          />
        </View>

        <Controller
          control={control}
          name='agree'
          render={({ field: { onChange, value } }) => (
            <Checkbox checked={value} onChange={onChange} style={styles.agree}>
              <Typography variant='bodySmall' color='foreground'>
                <Trans
                  i18nKey='signUp.agree'
                  components={{
                    terms: (
                      <Typography
                        variant='bodySmall'
                        asLink
                        onPress={() => Linking.openURL(TERMS_URL)}
                      />
                    ),
                    privacy: (
                      <Typography
                        variant='bodySmall'
                        asLink
                        onPress={() => Linking.openURL(PRIVACY_URL)}
                      />
                    ),
                  }}
                />
              </Typography>
            </Checkbox>
          )}
        />

        <Button
          title={t('signUp.submit')}
          size='lg'
          onPress={() => handleSubmit(onSubmit)()}
          disabled={!isValid}
          loading={register.isPending}
          style={styles.submit}
        />

        {register.error instanceof EmailTakenError ? null : (
          <ErrorMessage error={register.error} style={styles.error} />
        )}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Typography variant='bodySmall'>{t('signUp.orContinueWith')}</Typography>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socials}>
          <Pressable
            accessibilityRole='button'
            accessibilityLabel={t('signUp.continueWithGoogle')}
            style={({ pressed }) => [styles.social, styles.google, pressed && styles.googlePressed]}
          >
            <GoogleIcon />
          </Pressable>
          <Pressable
            accessibilityRole='button'
            accessibilityLabel={t('signUp.continueWithApple')}
            style={({ pressed }) => [styles.social, styles.apple, pressed && styles.applePressed]}
          >
            <AppleIcon color={COLORS.appleForeground} />
          </Pressable>
        </View>

        <Typography color='mutedForeground' style={styles.footer}>
          <Trans
            i18nKey='signUp.haveAccount'
            components={{
              signIn: (
                <Typography
                  asLink
                  onPress={() => {
                    navigation.popTo(ROUTES.SIGN_IN);
                  }}
                />
              ),
            }}
          />
        </Typography>
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
    textAlign: 'left',
  },
  tagline: {
    textAlign: 'left',
    color: COLORS.mutedForeground,
  },
  fields: {
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  passwordField: {
    gap: SPACING.sm,
  },
  agree: {
    marginTop: SPACING.xs,
  },
  submit: {
    marginTop: SPACING.sm,
  },
  error: {
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
  },
  social: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  google: {
    borderWidth: 1,
    borderColor: COLORS.input,
    backgroundColor: COLORS.background,
  },
  googlePressed: {
    backgroundColor: COLORS.muted,
  },
  apple: {
    backgroundColor: COLORS.apple,
  },
  applePressed: {
    opacity: 0.9,
  },
  footer: {
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
});

export { SignUpScreen };
