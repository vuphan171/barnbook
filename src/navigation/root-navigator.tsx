import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '@/features/sign-in';
import { SignUpScreen } from '@/features/sign-up';
import { ButtonGalleryScreen, InputGalleryScreen, UiGalleryScreen } from '@/features/ui-gallery';
import HomeScreen from '@/screens/home-screen';

import { ROUTES } from '@/configs/routes';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.SIGN_IN}>
      <Stack.Screen
        name={ROUTES.SIGN_IN}
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SIGN_UP}
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: 'Home', headerBackVisible: false }}
      />
      {__DEV__ ? (
        <>
          <Stack.Screen
            name={ROUTES.UI_GALLERY}
            component={UiGalleryScreen}
            options={{ title: 'UI Gallery' }}
          />
          <Stack.Screen
            name={ROUTES.UI_GALLERY_BUTTON}
            component={ButtonGalleryScreen}
            options={{ title: 'Button' }}
          />
          <Stack.Screen
            name={ROUTES.UI_GALLERY_INPUT}
            component={InputGalleryScreen}
            options={{ title: 'Input' }}
          />
        </>
      ) : null}
    </Stack.Navigator>
  );
};

export default RootNavigator;
