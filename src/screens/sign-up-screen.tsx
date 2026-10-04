import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import type { RootStackScreenProps } from '@/navigation/types';

const SignUpScreen = ({ navigation }: RootStackScreenProps<'SignUp'>) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const canSubmit =
    !!name && !!email && !!password && password === confirmPassword;

  const handleSignUp = () => {
    // Demo only: no real registration yet.
    navigation.reset({ index: 0, routes: [{ name: 'Home', params: { email } }] });
  };

  return (
    // The header already covers the top inset
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.form}>
        <Input
          label="Name"
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          autoComplete="name"
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
        />
        <Input
          label="Confirm password"
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="new-password"
        />
        {passwordMismatch ? (
          <Text style={styles.error}>Passwords do not match</Text>
        ) : null}
        <Button title="Sign Up" onPress={handleSignUp} disabled={!canSubmit} />
        <Text style={styles.footer}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.goBack()}>
            Sign In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  error: {
    color: '#E53935',
  },
  footer: {
    textAlign: 'center',
    color: '#616161',
  },
  link: {
    color: '#E53935',
    fontWeight: '600',
  },
});

export default SignUpScreen;
