import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import type { RootStackScreenProps } from '@/navigation/types';
import { COLORS, SPACING, FONT_WEIGHT } from '@/themes';
import Typography from '@/components/ui/typography';

type SignInForm = {
  email: string;
  password: string;
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: { email: '', password: '' },
    // Validate on blur first, then re-validate on every change once touched
    mode: 'onTouched',
  });

  const onSubmit = async ({ email }: SignInForm) => {
    // Demo only: no real authentication yet.
    // reset() replaces the stack so the back gesture can't return to SignIn.
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { email } }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Typography color="primary" variant="h1" style={styles.title}>
          Barnbook
        </Typography>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_PATTERN, message: 'Invalid email' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
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
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
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
          title="Sign In"
          onPress={() => handleSubmit(onSubmit)()}
          loading={isSubmitting}
        />
        <Text style={styles.footer}>
          Don't have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
    gap: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
});

export { SignInScreen };
