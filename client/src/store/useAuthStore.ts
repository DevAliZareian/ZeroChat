import { User } from "@/types/auth";
import { create } from "zustand";

type AuthState = {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

const TOKEN_KEY = "auth_token";

export const useAuthStore = create<AuthState>((set) => {
  const storedToken = localStorage.getItem(TOKEN_KEY);

  return {
    token: storedToken || null,
    user: null,

    setToken: (token) => {
      localStorage.setItem(TOKEN_KEY, token);
      set({ token });
    },

    setUser: (user) => {
      set({ user });
    },

    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      set({ token: null, user: null });
    },
  };
});
