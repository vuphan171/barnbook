import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppleIcon,
  ChevronLeftIcon,
  EyeIcon,
  GoogleIcon,
} from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';
import { PasswordStrengthBar } from '@/components/ui/password-strength-bar';
import { Typography } from '@/components/ui/typography';
import type { RootStackScreenProps } from '@/navigation/types';
import { AuthService, EmailTakenError } from '@/services/auth-service';
import {
  COLORS,
  CONTROL_HEIGHT,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  RADIUS,
  SPACING,
} from '@/themes';
import { getPasswordStrength } from '@/utils/password-strength';

import { createSignUpSchema, SignUpForm } from './schema';

const SignUpScreen = ({ navigation }: RootStackScreenProps<'SignUp'>) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(createSignUpSchema(t)),
    defaultValues: { name: '', email: '', password: '', agree: false },
    mode: 'onTouched',
  });

  const register = useMutation({
    mutationFn: AuthService.register,
    onSuccess: ({ user }) => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { email: user.email } }],
      });
    },
    onError: error => {
      if (error instanceof EmailTakenError) {
        setError('email', { message: t('validation.emailTaken') });
      }
    },
  });

  const onSubmit = ({ name, email, password }: SignUpForm) =>
    register.mutate({ name, email, password });

  const goToSignIn = () => navigation.popTo('SignIn');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('signUp.back')}
              onPress={navigation.goBack}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}
            >
              <ChevronLeftIcon color={COLORS.text} />
            </Pressable>
            <Logo />
          </View>

          <Typography variant="h2" style={styles.title}>
            {t('signUp.title')}
          </Typography>
          <Typography style={styles.tagline}>{t('signUp.tagline')}</Typography>

          <View style={styles.fields}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('signUp.name')}
                  placeholder={t('signUp.namePlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  autoComplete="name"
                  textContentType="name"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('signUp.email')}
                  placeholder={t('signUp.emailPlaceholder')}
                  value={value}
                  onChangeText={text => onChange(text.trim())}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.passwordField}>
                  {/* Strength meter replaces the error text for this field */}
                  <Input
                    label={t('signUp.password')}
                    placeholder={t('signUp.passwordPlaceholder')}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="new-password"
                    textContentType="newPassword"
                    right={
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t(
                          showPassword
                            ? 'signUp.hidePassword'
                            : 'signUp.showPassword',
                        )}
                        onPress={() => setShowPassword(shown => !shown)}
                        style={styles.eyeButton}
                      >
                        <EyeIcon
                          color={COLORS.textSecondary}
                          off={showPassword}
                        />
                      </Pressable>
                    }
                  />
                  <PasswordStrengthBar strength={getPasswordStrength(value)} />
                </View>
              )}
            />
          </View>

          <Controller
            control={control}
            name="agree"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                onChange={onChange}
                style={styles.agree}
              >
                <Text style={styles.agreeText}>
                  {t('signUp.agreePrefix')}
                  <Text style={styles.link}>{t('signUp.terms')}</Text>
                  {t('signUp.agreeAnd')}
                  <Text style={styles.link}>{t('signUp.privacy')}</Text>
                </Text>
              </Checkbox>
            )}
          />

          <Button
            title={t('signUp.submit')}
            size="lg"
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
            <Text style={styles.dividerText}>{t('signUp.orContinueWith')}</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socials}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('signUp.continueWithGoogle')}
              style={({ pressed }) => [
                styles.social,
                styles.google,
                pressed && styles.googlePressed,
              ]}
            >
              <GoogleIcon />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('signUp.continueWithApple')}
              style={({ pressed }) => [
                styles.social,
                styles.apple,
                pressed && styles.applePressed,
              ]}
            >
              <AppleIcon color={COLORS.apple.foreground} />
            </Pressable>
          </View>

          <Text style={styles.footer}>
            {t('signUp.haveAccount')}{' '}
            <Text style={styles.link} onPress={goToSignIn}>
              {t('signUp.signIn')}
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  header: {
    height: CONTROL_HEIGHT.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: -SPACING.md,
    width: CONTROL_HEIGHT.md,
    height: CONTROL_HEIGHT.md,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: COLORS.secondary.pressed,
  },
  title: {
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
  tagline: {
    marginTop: SPACING.xs,
    textAlign: 'center',
    color: COLORS.textSecondary,
  },
  fields: {
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  passwordField: {
    gap: SPACING.sm,
  },
  eyeButton: {
    width: CONTROL_HEIGHT.md,
    height: CONTROL_HEIGHT.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agree: {
    marginTop: SPACING.xs,
  },
  agreeText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: COLORS.text,
  },
  link: {
    color: COLORS.primary.default,
    fontWeight: FONT_WEIGHT.semibold,
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
    backgroundColor: COLORS.divider,
  },
  dividerText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
  },
  social: {
    width: CONTROL_HEIGHT.lg,
    height: CONTROL_HEIGHT.lg,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  google: {
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    backgroundColor: COLORS.secondary.default,
  },
  googlePressed: {
    backgroundColor: COLORS.secondary.pressed,
  },
  apple: {
    backgroundColor: COLORS.apple.default,
  },
  applePressed: {
    backgroundColor: COLORS.apple.pressed,
  },
  footer: {
    marginTop: SPACING.lg,
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
});

export { SignUpScreen };
