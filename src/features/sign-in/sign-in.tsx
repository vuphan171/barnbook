import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import ErrorMessage from '@/components/ui/error-message';
import type { RootStackScreenProps } from '@/navigation/types';
import { COLORS, SPACING, FONT_WEIGHT } from '@/themes';
import Typography from '@/components/ui/typography';
import { AuthService } from '@/services/auth-service';
import { createSignInSchema, SignInForm } from './sign-in-schema';

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(createSignInSchema(t)),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const login = useMutation({
    mutationFn: AuthService.login,
    onSuccess: ({ user }) => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { email: user.email } }],
      });
    },
  });

  const onSubmit = (values: SignInForm) => login.mutate(values);

  return (
    <SafeAreaView style={styles.container}>
      <Typography color="primary" variant="h1">
        Barnbook
      </Typography>
      <Typography variant="body">{t('signIn.tagline')}</Typography>
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('signIn.email')}
              placeholder="you@example.com"
              value={value}
              onChangeText={text => onChange(text.trim())}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('signIn.password')}
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              secureTextEntry
              autoComplete="password"
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
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}
          >
            {t('signIn.signUp')}
          </Text>
        </Text>
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
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary.default,
    fontWeight: FONT_WEIGHT.semibold,
  },
});

export { SignInScreen };
