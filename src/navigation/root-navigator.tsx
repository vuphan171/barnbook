import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '@/features/sign-in';
import { SignUpScreen } from '@/features/sign-up';
import HomeScreen from '@/screens/home-screen';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
