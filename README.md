# `src/` — Source Tree Overview

> Read `../MASTERPLAN.md` first for global decisions. This file describes only what lives directly under `src/` and the relationships between subfolders.

## Top-level files

| File         | Purpose                                                                      |
| ------------ | ---------------------------------------------------------------------------- |
| `main.tsx`   | React root. Mounts `<App />`. Imports `styles/globals.css`. Nothing else.    |
| `App.tsx`    | Composes the whole experience: Lenis provider → `<LoadingScreen />` → `<Nav />` → `<main>` with all `<Section/>` components in order → `<Footer />`. |
| `vite-env.d.ts` | Vite's ambient types for `import.meta.env`.                                |

## Subfolder map

```
src/
├── components/
│   ├── ui/          ← shadcn primitives, restyled to parchment theme
│   ├── motion/      ← Animation primitives + shared variants (the "central motion.tsx")
│   ├── layout/      ← App chrome: Nav, Footer, LoadingScreen, ScrollProgress
│   ├── sections/    ← One file per blog section — these consume everything else
│   ├── timeline/    ← Self-contained scroll-scrubbed timeline subsystem
│   ├── three/       ← Optional WebGL accents (lazy-loaded, dependency-isolated)
│   └── guestbook/   ← "Echoes of the Wall" — Firebase-backed feature
├── hooks/           ← Shared React hooks
├── lib/             ← Pure utilities + Firebase initialization
├── store/           ← Zustand stores (UI, auth, guestbook)
├── data/            ← Rizal content as typed TypeScript modules
├── styles/          ← Global CSS, font imports, Tailwind layer additions
└── types/           ← Shared TypeScript types (cross-folder contracts)
```

## Dependency graph (allowed import directions)

```
sections/ ──► motion/, ui/, timeline/, guestbook/, three/, data/, hooks/
timeline/ ──► motion/, ui/, data/, hooks/
guestbook/──► motion/, ui/, store/, lib/firebase, hooks/
layout/   ──► motion/, ui/, store/, hooks/
three/    ──► (self-contained, lazy)
motion/   ──► hooks/
ui/       ──► lib/cn
hooks/    ──► (self-contained)
lib/      ──► (self-contained)
store/    ──► lib/firebase (auth only), types/
data/     ──► types/
types/    ──► (self-contained)
```

**Rule:** if you find yourself drawing an arrow not in this list, you're probably setting up a circular dependency. Stop and reconsider.

## Path alias

`@/` resolves to `src/`. Use it everywhere except for siblings inside the same folder.

```ts
// Good
import { FadeIn } from "@/components/motion";
import { rizalTimeline } from "@/data/rizal-timeline";

// Also good — same-folder import
import { TimelineEvent } from "./TimelineEvent";
```

## When in doubt

If a piece of code doesn't obviously belong in one of these folders, the folder is probably wrong. Open an issue / discuss before adding a new top-level folder. The structure exists to keep cognitive load low for an academic project — bloat defeats the purpose.
