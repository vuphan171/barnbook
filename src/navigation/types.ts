import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: { email: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Lets useNavigation() infer route names and params without passing generics
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
