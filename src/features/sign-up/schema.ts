import type { TFunction } from 'i18next';
import { z } from 'zod';

import {
  getPasswordStrength,
  PASSWORD_STRENGTH,
} from '@/utils/password-strength';

const NAME_MIN = 2;
const PASSWORD_MIN = 8;

export const createSignUpSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, t('validation.nameRequired'))
      .min(NAME_MIN, t('validation.nameMin', { count: NAME_MIN })),
    email: z
      .string()
      .trim()
      .min(1, t('validation.emailRequired'))
      .pipe(z.email(t('validation.emailInvalid'))),
    password: z
      .string()
      .min(1, t('validation.passwordRequired'))
      .min(PASSWORD_MIN, t('validation.passwordMin', { count: PASSWORD_MIN }))
      .refine(
        value => getPasswordStrength(value) >= PASSWORD_STRENGTH.medium,
        t('validation.passwordWeak'),
      ),
    agree: z.boolean().refine(Boolean, t('validation.termsRequired')),
  });

export type SignUpForm = z.infer<ReturnType<typeof createSignUpSchema>>;
