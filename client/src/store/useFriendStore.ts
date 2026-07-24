import { User } from "@/types/auth";
import { create } from "zustand";

interface FriendStore {
  selectedFriend: User | null;
  setSelectedFriend: (friend: User | null) => void;
}

export const useFriendStore = create<FriendStore>((set) => ({
  selectedFriend: null,
  setSelectedFriend: (friend) => set({ selectedFriend: friend }),
}));
