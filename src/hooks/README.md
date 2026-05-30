# `hooks/` — Custom React Hooks

> Reusable React hooks. Keep them small and focused. If a hook grows past ~50 lines, consider whether it should be split or moved to `lib/`.

## Files

```
hooks/
├── README.md                    ← you are here
├── index.ts                     ← Barrel
├── useScrollProgress.ts         ← Page-wide scroll progress (thin wrapper on Motion's useScroll)
├── useActiveSection.ts          ← IntersectionObserver across section IDs → returns active ID
├── useReducedMotion.ts          ← Stable wrapper over Motion's useReducedMotion + matchMedia fallback
├── useLocalStorage.ts           ← Typed, SSR-safe localStorage hook
├── useFirebaseAuth.ts           ← Subscribes to auth state, syncs Zustand authStore
├── useGuestbookPosts.ts         ← Lives in components/guestbook/ instead — see that folder
├── useMediaQuery.ts             ← Match a CSS media query, returns boolean
└── useDelayedMount.ts           ← Mount with a setTimeout — useful for entrance-only animations
```

(Note: `useGuestbookPosts` and `useTimelineProgress` live next to their consumers in `components/guestbook/` and `components/timeline/` respectively. Hooks used by multiple unrelated consumers go here.)

## Conventions

1. **Hook names start with `use`.**
2. **SSR-safe.** Even though this is a SPA, hooks should not crash if `window` is undefined (defensive habit). Use `useEffect` for DOM access, never module-top-level.
3. **Return tuples for setters, objects for read-only states.** Matches React's own conventions.
   ```ts
   const [value, setValue] = useLocalStorage("key", initial);
   const { user, loading } = useFirebaseAuth();
   ```
4. **Test in isolation when feasible.** A hook that does a lot of DOM math is usually telling you it should be a component.

## useReducedMotion

A thin re-export of Motion's hook with a manual fallback (in case Motion's hook misbehaves with Lenis).

```ts
import { useReducedMotion as useMotionReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const fromMotion = useMotionReducedMotion();
  const [native, setNative] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setNative(mq.matches);
    const handler = (e: MediaQueryListEvent) => setNative(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return fromMotion || native;
}
```

Always import from `@/hooks` so the project has a single source of truth for this signal.

## useActiveSection

The Nav needs to know which section the user is currently viewing. Implementation:

```ts
export function useActiveSection(sectionIds: string[], options?: IntersectionObserverInit) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1], ...options }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds.join(",")]);

  return active;
}
```

The `-40% 0px -40% 0px` rootMargin makes "active" mean "in the middle 20% of the viewport," which feels more intuitive than first-pixel-visible.

## useLocalStorage

```ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota, private mode, etc. — swallow */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
```

Used for: dismissible UI banners, user-toggled font-size preference, last-seen-version tracking. The guestbook draft uses Zustand's persist middleware instead — don't reimplement that here.

## useFirebaseAuth

Subscribes to Firebase auth state changes and syncs the Zustand `authStore`. Mount once at the App level.

```ts
export function useFirebaseAuth() {
  const setUser = useAuthStore(s => s.setUser);
  const setLoading = useAuthStore(s => s.setLoading);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setUser(user ? toAppUser(user) : null);
      setLoading(false);
    });
    return unsub;
  }, [setUser, setLoading]);
}
```

Call it once in `App.tsx`. Don't call from multiple components.
