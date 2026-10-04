import type { TFunction } from 'i18next';
import * as yup from 'yup';

const PASSWORD_MIN = 6;

export const createSignInSchema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .trim()
      .required(t('validation.emailRequired'))
      .email(t('validation.emailInvalid')),
    password: yup
      .string()
      .required(t('validation.passwordRequired'))
      .min(PASSWORD_MIN, t('validation.passwordMin', { count: PASSWORD_MIN })),
  });

export type SignInForm = yup.InferType<ReturnType<typeof createSignInSchema>>;
