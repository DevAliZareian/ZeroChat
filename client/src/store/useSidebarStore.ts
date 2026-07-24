import { create } from "zustand";

type Section = "chats" | "bookmarks" | "friends" | "settings";

interface SidebarState {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  activeSection: "chats",
  setActiveSection: (section) => set({ activeSection: section }),
}));
