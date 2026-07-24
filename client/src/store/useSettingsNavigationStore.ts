import { create } from "zustand";

type SettingSection = "My Profile" | "Security" | "Teams" | "Team Member" | "Notifications" | "Billing" | "Data Export";

interface SettingsNavState {
  activeSection: SettingSection;
  setActiveSection: (section: SettingSection) => void;
}

export const useSettingsNav = create<SettingsNavState>((set) => ({
  activeSection: "My Profile",
  setActiveSection: (section) => set({ activeSection: section }),
}));
