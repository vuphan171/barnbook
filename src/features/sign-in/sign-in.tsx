import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '@/navigation/types';

import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Typography } from '@/components/ui/typography';

import { AuthService } from '@/services/auth-service';

import { ROUTES } from '@/configs/routes';
import { COLORS, FONT_FAMILY, SPACING } from '@/themes';

import { createSignInSchema, SignInForm } from './schema';

const SignInScreen = ({ navigation }: RootStackScreenProps<typeof ROUTES.SIGN_IN>) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
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
  });

  const onSubmit = (values: SignInForm) => login.mutate(values);

  return (
    <SafeAreaView style={styles.container}>
      <Typography color='primary' variant='h1'>
        Barnbook
      </Typography>
      <Typography variant='body'>{t('signIn.tagline')}</Typography>
      <View style={styles.form}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('signIn.email')}
              placeholder='you@example.com'
              value={value}
              onChangeText={(text) => onChange(text.trim())}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType='email-address'
              autoCapitalize='none'
              autoComplete='email'
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
            />
          )}
        />
        <Button
          title={t('signIn.submit')}
          onPress={() => handleSubmit(onSubmit)()}
          loading={login.isPending}
        />
        <ErrorMessage error={login.error} style={styles.error} />
        <Text style={styles.footer}>
          {t('signIn.noAccount')}{' '}
          <Text style={styles.link} onPress={() => navigation.navigate(ROUTES.SIGN_UP)}>
            {t('signIn.signUp')}
          </Text>
        </Text>
        {__DEV__ ? (
          <Text style={styles.link} onPress={() => navigation.navigate(ROUTES.UI_GALLERY)}>
            UI Gallery
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xxl,
    backgroundColor: COLORS.background,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  error: {
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.semibold,
  },
});

export { SignInScreen };
