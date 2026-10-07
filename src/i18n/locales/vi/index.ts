import type en from '../en';
import { common } from './common';
import { forgotPassword } from './forgot-password';
import { signIn } from './sign-in';
import { signUp } from './sign-up';
import { validation } from './validation';
import { verifyCode } from './verify-code';

const vi: typeof en = {
  common,
  forgotPassword,
  signIn,
  signUp,
  validation,
  verifyCode,
};

export default vi;
