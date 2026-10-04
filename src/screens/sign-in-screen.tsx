import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import type { RootStackScreenProps } from '@/navigation/types';

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Demo only: no real authentication yet.
    // reset() replaces the stack so the back gesture can't return to SignIn.
    navigation.reset({ index: 0, routes: [{ name: 'Home', params: { email } }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Sign In</Text>
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
          autoComplete="password"
        />
        <Button
          title="Sign In"
          onPress={handleSignIn}
          disabled={!email || !password}
        />
        <Text style={styles.footer}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
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
    backgroundColor: '#FAFAFA',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
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

export default SignInScreen;
