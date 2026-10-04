import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/button';
import type { RootStackScreenProps } from '@/navigation/types';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@/themes';

const HomeScreen = ({ navigation, route }: RootStackScreenProps<'Home'>) => {
  const { email } = route.params;

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.subtitle}>Signed in as {email}</Text>
      </View>
      <Button title="Sign Out" onPress={handleSignOut} style={styles.signOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  signOut: {
    marginHorizontal: SPACING.xxl,
    marginBottom: SPACING.lg,
  },
});

export default HomeScreen;
