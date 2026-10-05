/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from '@/navigation/root-navigator';

import { queryClient } from '@/services/query-client';

import '@/i18n';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </KeyboardProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
