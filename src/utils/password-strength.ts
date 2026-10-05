export const PASSWORD_STRENGTH = {
  empty: 0,
  weak: 1,
  medium: 2,
  strong: 3,
} as const;

export type PasswordStrength = (typeof PASSWORD_STRENGTH)[keyof typeof PASSWORD_STRENGTH];

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return PASSWORD_STRENGTH.empty;

  const score = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 12,
  ].filter(Boolean).length;

  if (password.length < 8 || score <= 2) return PASSWORD_STRENGTH.weak;
  return score === 3 ? PASSWORD_STRENGTH.medium : PASSWORD_STRENGTH.strong;
};
