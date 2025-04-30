import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

export type AuthActions = {
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      login: (user: User, accessToken: string) =>
        set({
          user,
          accessToken,
          isAuthenticated: true
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false
        }),
      updateUser: (user: User) =>
        set((state) => ({
          ...state,
          user
        }))
    }),
    {
      name: 'auth-store',
      skipHydration: true
    }
  )
);
