import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>(set => ({
  isLoggedIn: false,
  token: null,

  login: token => {
    set({
      isLoggedIn: true,
      token,
    });
  },
  logout: () => {
    set({
      isLoggedIn: false,
      token: null,
    });
  },
}));
