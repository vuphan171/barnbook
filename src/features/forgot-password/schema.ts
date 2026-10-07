import type { TFunction } from 'i18next';
import { z } from 'zod';

export const createForgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t('validation.emailRequired'))
      .pipe(z.email(t('validation.emailInvalid'))),
  });

export type ForgotPasswordForm = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
