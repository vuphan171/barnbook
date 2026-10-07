import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackScreenProps } from '@/navigation/types';

import { Button } from '@/components/ui/button';

import { ROUTES } from '@/configs/routes';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/themes';

const HomeScreen: React.FC<RootStackScreenProps<typeof ROUTES.HOME>> = ({ navigation, route }) => {
  const { email } = route.params;

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: ROUTES.SIGN_IN }] });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.subtitle}>Signed in as {email}</Text>
      </View>
      <Button title='Sign Out' onPress={handleSignOut} style={styles.signOut} />
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
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.foreground,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.mutedForeground,
  },
  signOut: {
    marginHorizontal: SPACING.xxl,
    marginBottom: SPACING.lg,
  },
});

export default HomeScreen;
