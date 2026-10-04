import { AppState, AppStateStatus, Platform } from 'react-native';
import { focusManager, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30 * 1000,
    },
  },
});

// React Native has no window focus events: treat "app came to foreground" as focus,
// so stale queries refetch when the user returns to the app.
const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

AppState.addEventListener('change', onAppStateChange);
