import { create } from "zustand";

type AppState = {
  isReady: boolean;
  progress: number;
  setReady: () => void;
  setProgress: (value: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isReady: false,
  progress: 0,
  setReady: () => set({ isReady: true }),
  setProgress: (value) => set({ progress: value }),
}));
