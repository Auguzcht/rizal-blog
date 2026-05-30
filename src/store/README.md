# `store/` — Zustand Stores

> Three small stores, one responsibility each. Read MASTERPLAN §9 for the full state map.

## Files

```
store/
├── README.md           ← you are here
├── index.ts            ← Barrel
├── useUIStore.ts       ← Loading flag, current section, nav-open, font-size pref
├── useAuthStore.ts     ← Firebase user + loading state
└── useGuestbookStore.ts← Posts list, draft message (persisted), cursor
```

## Conventions

- **One store per concern.** Don't combine guestbook state with auth state — they have different lifecycles.
- **Selectors at the call site.** Components subscribe via `useStore(s => s.thing)` for fine-grained re-renders, not `useStore()` (which subscribes to the whole store).
- **Actions are methods, not action creators.** `setUser(u)`, not `dispatch({ type: "SET_USER", payload: u })`.
- **No async actions that touch React.** Hooks orchestrate async; stores hold state.
- **Persist sparingly.** Only the guestbook draft. Don't persist auth state — Firebase handles its own session persistence.

## useUIStore

```ts
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

export const useUIStore = create<UIState>(set => ({
  loaded: false,
  setLoaded: v => set({ loaded: v }),
  navOpen: false,
  setNavOpen: v => set({ navOpen: v }),
  activeSection: null,
  setActiveSection: id => set({ activeSection: id }),
  fontSizePref: "regular",
  setFontSizePref: v => set({ fontSizePref: v }),
}));
```

`fontSizePref` is an accessibility nicety — a small toggle in the footer lets readers bump body type up one step. Persist this with `useLocalStorage` from `hooks/` (read on mount, write on change).

## useAuthStore

```ts
import { create } from "zustand";

export type AppUser = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  provider: "google.com" | "github.com" | null;
};

type AuthState = {
  user: AppUser | null;
  loading: boolean;
  setUser: (u: AppUser | null) => void;
  setLoading: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  loading: true,    // true on mount until onAuthStateChanged fires once
  setUser: u => set({ user: u, loading: false }),
  setLoading: v => set({ loading: v }),
}));
```

The Firebase `User` object is *not* stored directly — we map it to a lean `AppUser` so the store is serializable and tests are easy.

## useGuestbookStore

```ts
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

  // Persisted slice ↓
  draft: string;
  setDraft: (v: string) => void;
  clearDraft: () => void;
};

export const useGuestbookStore = create<GuestbookState>()(
  persist(
    (set, get) => ({
      posts: [],
      setPosts: posts => set({ posts }),
      prependPost: post => set({ posts: [post, ...get().posts] }),
      replacePost: (tempId, real) =>
        set({ posts: get().posts.map(p => (p.id === tempId ? real : p)) }),
      removePost: id => set({ posts: get().posts.filter(p => p.id !== id) }),
      appendPosts: more => set({ posts: [...get().posts, ...more] }),

      cursor: null,
      setCursor: c => set({ cursor: c }),

      hasMore: true,
      setHasMore: v => set({ hasMore: v }),

      draft: "",
      setDraft: v => set({ draft: v }),
      clearDraft: () => set({ draft: "" }),
    }),
    {
      name: "rizal-blog:guestbook",
      partialize: state => ({ draft: state.draft }), // Persist ONLY the draft.
    }
  )
);
```

The `partialize` makes the persisted slice the draft alone — we don't want stale posts or stale cursors surviving a page reload.

## Subscribing — patterns to follow

**Good:**
```tsx
const draft = useGuestbookStore(s => s.draft);
const setDraft = useGuestbookStore(s => s.setDraft);
```

**Bad (subscribes to entire store, re-renders on every change):**
```tsx
const { draft, setDraft } = useGuestbookStore();
```

The shallow-destructure pattern is allowed when *every field* is genuinely used and changes together, but prefer fine-grained selectors.
