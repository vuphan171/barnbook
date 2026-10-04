import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/button';
import type { RootStackScreenProps } from '@/navigation/types';

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
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
  },
  subtitle: {
    fontSize: 16,
    color: '#616161',
  },
  signOut: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
