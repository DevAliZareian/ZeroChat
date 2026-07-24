import { create } from "zustand";

type ConversationStore = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

export const useConversationStore = create<ConversationStore>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));
