import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GuestbookPost } from "@/types/guestbook";
import type { QueryDocumentSnapshot } from "firebase/firestore";

type GuestbookState = {
  posts: GuestbookPost[];
  setPosts: (posts: GuestbookPost[]) => void;
  prependPost: (post: GuestbookPost) => void;
  replacePost: (tempId: string, real: GuestbookPost) => void;
  removePost: (id: string) => void;
  appendPosts: (posts: GuestbookPost[]) => void;

  cursor: QueryDocumentSnapshot | null;
  setCursor: (c: QueryDocumentSnapshot | null) => void;

  hasMore: boolean;
  setHasMore: (v: boolean) => void;

  // Persisted slice
  draft: string;
  setDraft: (v: string) => void;
  clearDraft: () => void;
};

export const useGuestbookStore = create<GuestbookState>()(
  persist(
    (set, get) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
      prependPost: (post) => set({ posts: [post, ...get().posts] }),
      replacePost: (tempId, real) =>
        set({ posts: get().posts.map((p) => (p.id === tempId ? real : p)) }),
      removePost: (id) => set({ posts: get().posts.filter((p) => p.id !== id) }),
      appendPosts: (more) => set({ posts: [...get().posts, ...more] }),

      cursor: null,
      setCursor: (c) => set({ cursor: c }),

      hasMore: true,
      setHasMore: (v) => set({ hasMore: v }),

      draft: "",
      setDraft: (v) => set({ draft: v }),
      clearDraft: () => set({ draft: "" }),
    }),
    {
      name: "rizal-blog:guestbook",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
