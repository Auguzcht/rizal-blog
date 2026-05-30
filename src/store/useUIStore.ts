import { create } from "zustand";

type UIState = {
  loaded: boolean;
  setLoaded: (v: boolean) => void;

  navOpen: boolean;
  setNavOpen: (v: boolean) => void;

  activeSection: string | null;
  setActiveSection: (id: string | null) => void;

  fontSizePref: "regular" | "large";
  setFontSizePref: (v: "regular" | "large") => void;
};

export const useUIStore = create<UIState>((set) => ({
  loaded: false,
  setLoaded: (v) => set({ loaded: v }),
  navOpen: false,
  setNavOpen: (v) => set({ navOpen: v }),
  activeSection: null,
  setActiveSection: (id) => set({ activeSection: id }),
  fontSizePref: "regular",
  setFontSizePref: (v) => set({ fontSizePref: v }),
}));
