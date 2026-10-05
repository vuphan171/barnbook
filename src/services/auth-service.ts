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

export class EmailTakenError extends Error {}

const FAKE_LATENCY_MS = 2000;
const FAKE_TAKEN_EMAIL = 'lan@trangtrai.vn';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export const AuthService = {
  login: async ({ email }: LoginParams): Promise<LoginResponse> => {
    await delay(FAKE_LATENCY_MS);

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
};
