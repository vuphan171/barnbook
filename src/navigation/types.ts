import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ROUTES } from '@/configs/routes';

export type RootStackParamList = {
  [ROUTES.SIGN_IN]: undefined;
  [ROUTES.SIGN_UP]: undefined;
  [ROUTES.HOME]: { email: string };
  [ROUTES.UI_GALLERY]: undefined;
  [ROUTES.UI_GALLERY_BUTTON]: undefined;
  [ROUTES.UI_GALLERY_INPUT]: undefined;
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
