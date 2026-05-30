# `components/motion/` — The Central Animation System

> The "central motion.tsx" the brief asks for. All complex, shared animation primitives live here. If a `motion.div` with non-trivial choreography appears in two or more sections, it must be extracted into this folder.

## What belongs here

- **Reusable animation primitives** — small components that wrap `motion.*` with sensible, project-tuned defaults.
- **Shared `Variants` constants** — for stagger groups, text reveals, parallax sweeps.
- **The easing + duration constants** — single source of truth.
- **Reduced-motion guards** — every primitive must check `prefers-reduced-motion` and degrade gracefully.

## What does *not* belong here

- One-off animations used by a single component. Inline `motion.div` is fine in `sections/` for unique flourishes.
- Layout animations of UI widgets — those live with the widget in `ui/`.
- Scroll-driven transforms specific to the Timeline — those live in `timeline/`.

## Files

```
motion/
├── README.md                  ← you are here
├── index.ts                   ← Barrel: re-exports everything for `@/components/motion`
├── constants.ts               ← EASE_CINEMATIC, DURATIONS, STAGGER
├── variants.ts                ← Shared Variants objects (fadeUp, fadeIn, scaleIn, etc.)
├── FadeIn.tsx                 ← Fade + optional Y translate on view enter
├── SlideUp.tsx                ← Larger Y translate, used for section openers
├── TextReveal.tsx             ← Per-word stagger reveal (split-text approach)
├── Parallax.tsx               ← Wraps children; translates Y based on scroll progress
├── StaggerChildren.tsx        ← Parent that staggers any direct motion children
├── ScrollScrub.tsx            ← Maps useScroll progress to a child's prop (e.g., opacity)
└── ScrollIndicator.tsx        ← The "scroll down" indicator under the hero
```

## Constants (single source of truth)

```ts
// constants.ts
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT_IN = [0.4, 0, 0.2, 1] as const;

export const DURATIONS = {
  quick: 0.25,
  base: 0.5,
  entry: 0.7,
  cinematic: 1.2,
} as const;

export const STAGGER = {
  tight: 0.04,
  default: 0.08,
  loose: 0.12,
  word: 0.025,
} as const;
```

Never write a magic-number duration or easing array elsewhere. Import from `constants.ts`.

## Primitive contract

Every primitive in this folder must:

1. **Forward a `className` prop** to the underlying `motion.*` element.
2. **Forward `children`.**
3. **Accept a `delay` prop** (number, in seconds, default 0).
4. **Use `useReducedMotion()`** and short-circuit to a static render or opacity-only fade when reduce is requested.
5. **Trigger on view-enter by default** using `whileInView` with `viewport={{ once: true, amount: 0.3 }}`.
6. **Be a server-safe (no DOM access in render).**

### Example contract — `FadeIn.tsx`

```tsx
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_CINEMATIC, DURATIONS } from "./constants";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type FadeInProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
};

export function FadeIn({ delay = 0, className, children, as = "div" }: FadeInProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DURATIONS.entry, ease: EASE_CINEMATIC, delay }}
    >
      {children}
    </MotionTag>
  );
}
```

## TextReveal — per-word stagger

The signature animation of the site. Splits children text into words, animates each in. Used for every section heading and the hero subtitle.

**Contract:**
- Input: a `string` child only. Throws (dev) if it receives anything else.
- Splits on whitespace, preserves spaces between spans.
- Each word: `<motion.span>` with `display: inline-block`, animated `opacity` + `y`.
- Stagger: `STAGGER.word` (25ms).
- Reduced motion: renders the string as a single faded span.

## Parallax — the cinematic feel

Wraps a child (typically an image) and translates it on the Y axis as the user scrolls past. Uses Motion's `useScroll` with a target ref.

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
```

Magnitudes are deliberately *subtle*. We're going for "the page breathes," not "the page is showing off." Default range: ±10%. Max: ±20%.

## Reduced motion strategy

Lenis itself respects `prefers-reduced-motion: reduce` and disables smoothing when set. On top of that:

- All `Parallax` and `ScrollScrub` components return their children unwrapped when reduced motion is requested.
- All view-enter animations collapse to opacity-only.
- The Timeline's progress line still draws (it's informational), but without the elastic ease.

Test with macOS System Settings → Accessibility → Display → Reduce Motion before submitting.

## Integration with Lenis

Lenis is mounted at the `App.tsx` level via a provider. Motion's `useScroll` reads from `window.scrollY` by default, which Lenis updates correctly — no special integration needed. Verify after install with the demo at the bottom of the Lenis README.

## Import surface

Always import from the barrel:

```ts
import { FadeIn, SlideUp, TextReveal, Parallax, StaggerChildren, EASE_CINEMATIC } from "@/components/motion";
```

Don't deep-import individual files outside this folder. Keeps refactoring cheap.
