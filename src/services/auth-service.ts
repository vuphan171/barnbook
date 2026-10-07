export type LoginParams = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};

export type RequestPasswordResetParams = {
  email: string;
};

export type VerifyResetCodeParams = {
  email: string;
  code: string;
};

export class EmailTakenError extends Error {}

export class InvalidCredentialsError extends Error {}

export class InvalidCodeError extends Error {
  constructor(public attemptsLeft: number) {
    super('Invalid code');
  }
}

const FAKE_LATENCY_MS = 2000;
const FAKE_TAKEN_EMAIL = 'lan@trangtrai.vn';
const FAKE_WRONG_PASSWORD = 'wrongpassword';
const FAKE_RESET_CODE = '123456';
const MAX_CODE_ATTEMPTS = 5;

let fakeCodeAttemptsLeft = MAX_CODE_ATTEMPTS;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const AuthService = {
  login: async ({ email, password }: LoginParams): Promise<LoginResponse> => {
    await delay(FAKE_LATENCY_MS);

    if (password === FAKE_WRONG_PASSWORD) {
      throw new InvalidCredentialsError();
    }

    return {
      user: { id: '1', email },
      accessToken: 'fake-access-token',
    };
  },

  register: async ({ email }: RegisterParams): Promise<LoginResponse> => {
    await delay(FAKE_LATENCY_MS);

    if (email.toLowerCase() === FAKE_TAKEN_EMAIL) {
      throw new EmailTakenError(email);
    }

    return {
      user: { id: '2', email },
      accessToken: 'fake-access-token',
    };
  },

  requestPasswordReset: async (_params: RequestPasswordResetParams): Promise<void> => {
    await delay(FAKE_LATENCY_MS);
    fakeCodeAttemptsLeft = MAX_CODE_ATTEMPTS;
  },

  verifyResetCode: async ({ code }: VerifyResetCodeParams): Promise<void> => {
    await delay(FAKE_LATENCY_MS);

    if (fakeCodeAttemptsLeft === 0 || code !== FAKE_RESET_CODE) {
      fakeCodeAttemptsLeft = Math.max(fakeCodeAttemptsLeft - 1, 0);
      throw new InvalidCodeError(fakeCodeAttemptsLeft);
    }
  },
};
