import {
  getPasswordStrength,
  PASSWORD_STRENGTH,
} from '@/utils/password-strength';

test.each([
  ['', PASSWORD_STRENGTH.empty],
  ['abc123', PASSWORD_STRENGTH.weak],
  ['abcdefgh', PASSWORD_STRENGTH.weak],
  ['Abcdefg1', PASSWORD_STRENGTH.medium],
  ['Trangtrai2026!', PASSWORD_STRENGTH.strong],
])('getPasswordStrength(%p) = %p', (password, expected) => {
  expect(getPasswordStrength(password)).toBe(expected);
});
