import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '@/features/sign-in';
import { SignUpScreen } from '@/features/sign-up';
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
    </Stack.Navigator>
  );
};

export default RootNavigator;
