# `components/layout/` — App Chrome

> Everything that frames the content but isn't content itself: the navigation, footer, loading screen, scroll progress indicator, and the Lenis smooth-scroll provider.

## Files

```
layout/
├── README.md             ← you are here
├── index.ts              ← Barrel
├── Nav.tsx               ← Top nav, sticky, with section anchors and progress bar
├── Footer.tsx            ← Bottom: credits, references CTA, social links
├── LoadingScreen.tsx     ← First-load overlay, hides when fonts + critical assets ready
├── ScrollProgress.tsx    ← The thin top progress bar (separate from Nav so it can be reused)
└── LenisProvider.tsx     ← Mounts Lenis, exposes context, handles cleanup
```

## LenisProvider

Wraps the app, instantiates Lenis once, attaches its `requestAnimationFrame` loop.

```tsx
import Lenis from "@studio-freight/lenis";
import { createContext, useEffect, useRef } from "react";

export const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;  // Native scroll for users who prefer it.

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
```

`lerp: 0.1` is the smoothness factor — lower is smoother, higher is snappier. 0.1 is the cinematic sweet spot.

Mounted in `App.tsx` as the outermost wrapper around the content tree.

## LoadingScreen

The "custom startup/loading screen" the brief requests. Covers the screen until:
1. Web fonts have loaded (`document.fonts.ready` resolves).
2. The hero background image has loaded (decoded).
3. A minimum display time has elapsed (1200ms — long enough to feel intentional, short enough not to annoy).

Design:
- Full viewport, parchment background.
- Centered: the project title in `font-display`, with an animated quill drawing an underline beneath it (SVG path stroke-dashoffset animation).
- Below: a small percentage counter or a single italicized line in `font-script`: *"Para sa Inang Bayan..."*
- On exit: slide up + fade out (700ms, `EASE_CINEMATIC`).

```tsx
type LoadingState = "loading" | "ready" | "exited";

export function LoadingScreen() {
  const [state, setState] = useState<LoadingState>("loading");
  const setLoaded = useUIStore(s => s.setLoaded);

  useEffect(() => {
    const minDelay = new Promise(r => setTimeout(r, 1200));
    const fontsReady = document.fonts.ready;
    Promise.all([minDelay, fontsReady]).then(() => setState("ready"));
  }, []);

  // ... exit animation handled by AnimatePresence wrapper in App.tsx
}
```

The store flag `setLoaded(true)` is what unlocks the page's mount/intro animations downstream.

## Nav

Sticky top bar, transparent initially, blurs + tints after the user scrolls past the hero.

**Contents (desktop):**
- Left: small project mark — the title in `font-display`, scaled down.
- Center: anchor links to sections (`Intro` / `Origins` / `Life` / `Character` / `Legacy` / `Guestbook`).
- Right: a thin progress bar showing read-through percentage.

**Contents (mobile):**
- Hamburger that opens a full-screen sheet with the same anchors.

**Behavior:**
- Anchor clicks call Lenis's `scrollTo(targetEl, { duration: 1.2, easing })` for smooth navigation, not native `scrollIntoView` (which fights Lenis).
- The currently active section is highlighted — driven by an IntersectionObserver in `useActiveSection()` hook.

## ScrollProgress

A 2px-tall bar fixed to the top of the viewport, scaling its width with `useScroll()`'s `scrollYProgress`.

```tsx
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gold-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

This sits above the `Nav`. It's a separate component so the Nav doesn't need to know about scroll progress.

## Footer

Minimal. Three sections:
- A short colophon paragraph: "Built for SS038, The Life and Works of Rizal. [Your name], [Section]."
- Links: "View references" (scrolls to `#references`), "Source code" (if the project goes public on GitHub).
- A tiny acknowledgments block — fonts, image sources at a high level (detailed credits live in `ReferencesSection`).

No newsletter signup, no socials, no spam. The footer matches the academic tone.

## Mounting order in App.tsx

```tsx
<LenisProvider>
  <AnimatePresence>
    {!loaded && <LoadingScreen key="loading" />}
  </AnimatePresence>
  <ScrollProgress />
  <Nav />
  <main>
    {/* sections */}
  </main>
  <Footer />
</LenisProvider>
```

`LenisProvider` is outermost so all descendants share the same scroller. `LoadingScreen` is inside `AnimatePresence` so it can animate out.
