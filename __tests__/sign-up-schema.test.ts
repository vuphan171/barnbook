import type { TFunction } from 'i18next';

import { createSignUpSchema } from '@/features/sign-up/schema';

const t = ((key: string) => key) as unknown as TFunction;
const schema = createSignUpSchema(t);

const valid = {
  name: 'Nguyễn Thị Lan',
  email: 'lan.nguyen@gmail.com',
  password: 'Trangtrai2026!',
  agree: true,
};

const firstError = (values: Partial<typeof valid>) =>
  schema.safeParse({ ...valid, ...values }).error?.issues[0]?.message;

test('accepts a valid form', () => {
  expect(schema.safeParse(valid).success).toBe(true);
});

test.each([
  [{ name: '' }, 'validation.nameRequired'],
  [{ email: '' }, 'validation.emailRequired'],
  [{ email: 'lan.nguyen@gmail' }, 'validation.emailInvalid'],
  [{ password: 'Abcdefgh' }, 'validation.passwordWeak'],
  [{ agree: false }, 'validation.termsRequired'],
])('rejects %p', (values, message) => {
  expect(firstError(values)).toBe(message);
});
