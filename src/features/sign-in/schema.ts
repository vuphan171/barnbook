import type { TFunction } from 'i18next';
import { z } from 'zod';

const PASSWORD_MIN = 6;

export const createSignInSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t('validation.emailRequired'))
      .pipe(z.email(t('validation.emailInvalid'))),
    password: z
      .string()
      .min(1, t('validation.passwordRequired'))
      .min(PASSWORD_MIN, t('validation.passwordMin', { count: PASSWORD_MIN })),
  });

export type SignInForm = z.infer<ReturnType<typeof createSignInSchema>>;
