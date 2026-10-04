export type LoginParams = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};

const FAKE_LATENCY_MS = 2000;

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const AuthService = {
  login: async ({ email }: LoginParams): Promise<LoginResponse> => {
    await delay(FAKE_LATENCY_MS);

    return {
      user: { id: '1', email },
      accessToken: 'fake-access-token',
    };
  },
};
