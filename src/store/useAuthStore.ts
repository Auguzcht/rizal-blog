import { create } from "zustand";
import type { AppUser } from "@/types/user";

type AuthState = {
  user: AppUser | null;
  loading: boolean;
  setUser: (u: AppUser | null) => void;
  setLoading: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (u) => set({ user: u, loading: false }),
  setLoading: (v) => set({ loading: v }),
}));
