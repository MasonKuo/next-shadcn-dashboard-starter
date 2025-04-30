import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
  id: string;
  email: string;
  status: boolean;
  userName: string;
  firstName: string;
  lastName: string;
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
      storage: createJSONStorage(() => localStorage),
      skipHydration: false
    }
  )
);
