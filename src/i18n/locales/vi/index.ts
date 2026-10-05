import type en from '../en';
import { common } from './common';
import { signIn } from './sign-in';
import { signUp } from './sign-up';
import { validation } from './validation';

const vi: typeof en = {
  common,
  signIn,
  signUp,
  validation,
};

export default vi;
