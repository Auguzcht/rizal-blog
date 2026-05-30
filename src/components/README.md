# `components/` — The Component Layers

> Seven subfolders, each with a focused README. Read those for the details — this file just maps how they fit together.

## Layered architecture

Think of the components folder as layers, from atoms at the bottom to compositions at the top:

```
┌─────────────────────────────────────────────────────┐
│  sections/      ← Compositions: one per blog section │
├─────────────────────────────────────────────────────┤
│  timeline/  guestbook/  three/  ← Feature modules    │
├─────────────────────────────────────────────────────┤
│  layout/        ← App chrome: Nav, Footer, Loading   │
├─────────────────────────────────────────────────────┤
│  motion/        ← Animation primitives + variants    │
├─────────────────────────────────────────────────────┤
│  ui/            ← shadcn + Cite, Figure, PullQuote   │
└─────────────────────────────────────────────────────┘
```

Lower layers don't import from upper layers. `ui/` knows nothing about `sections/`. `motion/` knows nothing about `timeline/`. Violating this gets you a circular dependency.

## Which README to read for a given task

| Task                                                         | Read                                  |
| ------------------------------------------------------------ | ------------------------------------- |
| Add a new section to the blog                                | `sections/README.md`                  |
| Tweak the timeline behavior                                  | `timeline/README.md`                  |
| Add a new animation primitive (used in multiple places)      | `motion/README.md`                    |
| Change the loading screen or nav                             | `layout/README.md`                    |
| Style a shadcn primitive                                     | `ui/README.md`                        |
| Add a new citation chip variant                              | `ui/README.md` (`Cite.tsx`)           |
| Wire the guestbook submission flow                           | `guestbook/README.md`                 |
| Add 3D (only after Phase 5 is done)                          | `three/README.md`                     |

## Import shorthand

Every folder exports a barrel from `index.ts`. Always import from the barrel:

```ts
// Good
import { FadeIn, TextReveal, EASE_CINEMATIC } from "@/components/motion";
import { Button, Card, Cite, Figure } from "@/components/ui";
import { Timeline } from "@/components/timeline";

// Bad — deep import bypasses the public surface, fragile
import { FadeIn } from "@/components/motion/FadeIn";
```

The exception is *within* the same folder, where deep imports are fine and preferred (avoids accidental circular re-export).

## Adding a new folder

Don't, unless you can defend it in MASTERPLAN §6. The structure is intentionally narrow. If you have a feature that doesn't fit any of the seven folders, it's probably one of:

- A `ui` atom — restyle a shadcn primitive or add one.
- A `sections` member — even a small section is still a section.
- A new feature module like `timeline` or `guestbook` — these get their own folder only when they have 4+ internal components.
