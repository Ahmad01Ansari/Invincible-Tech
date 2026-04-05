import { create } from "zustand";

interface AppState {
  // Mobile menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Portfolio filters
  activeFilter: string;
  setActiveFilter: (filter: string) => void;

  // Contact form
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  activeFilter: "All",
  setActiveFilter: (filter) => set({ activeFilter: filter }),

  isSubmitting: false,
  setIsSubmitting: (val) => set({ isSubmitting: val }),
}));
