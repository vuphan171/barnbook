import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ROUTES } from '@/configs/routes';

export type RootStackParamList = {
  [ROUTES.SIGN_IN]: undefined;
  [ROUTES.SIGN_UP]: undefined;
  [ROUTES.HOME]: { email: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

// Lets useNavigation() infer route names and params without passing generics
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
