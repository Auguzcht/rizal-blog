# `components/three/` — Optional WebGL Accents

> This folder is **strictly optional**. Build the entire site without it first. Only return here in Phase 6, after everything else ships and passes Lighthouse.

## Why scoped this way

The brief mentioned three.js as a "not really knowledgeable" stretch goal. WebGL is a force multiplier when it lands well and a liability when it doesn't — janky 3D damages the polished impression that everything else creates. If Phase 5 finishes with time and energy to spare, *then* attempt this. Otherwise, ship without.

## What's possible (in order of cost)

### Option A — Particle quill ink (cheap)

A canvas-based 2D particle system, no three.js needed, that emits sepia ink particles slowly drifting upward behind the Hero title. ~50 lines of code. **Recommended if you want a "3D feel" without the bundle cost.**

This wouldn't actually live in this folder — put it in `motion/` as `<InkParticles />` since it's 2D canvas.

### Option B — Floating 3D quill (medium)

A low-poly quill model floats above the hero, slowly rotating, casting a soft sepia shadow. Uses React Three Fiber + Drei's `<Float>` helper. The quill is the only mesh — no scene, no lighting beyond ambient + a single point light.

Roughly 200 lines of code + a small `.glb` (model). Lazy-loaded so it doesn't bloat the initial bundle.

### Option C — Page-turning book intro (expensive)

A 3D book opens on page load, the pages turn, the title appears as printed on the right page. Cinematic but a *lot* of work — model rigging, page-turn shader, integration with the loading screen.

**Not recommended** for an academic deadline. Listed only for completeness.

## If you proceed with Option B

```
three/
├── README.md             ← you are here
├── index.ts              ← Exports <FloatingQuill /> (lazy-friendly)
├── FloatingQuill.tsx     ← The R3F canvas + scene
├── Quill.tsx             ← The mesh itself
└── assets/
    └── quill.glb         ← Model file (300 KB, public-domain or CC0)
```

### Lazy-load pattern

```tsx
// In HeroSection.tsx
const FloatingQuill = lazy(() =>
  import("@/components/three").then(m => ({ default: m.FloatingQuill }))
);

// ...

<Suspense fallback={null}>
  {!prefersReducedMotion && <FloatingQuill />}
</Suspense>
```

The quill is a decorative enhancement. If it fails to load, the page is unaffected. The `Suspense fallback={null}` is intentional — nothing should appear until it's ready.

### Performance guardrails

- `dpr={[1, 1.5]}` — cap pixel ratio.
- `<Canvas frameloop="demand">` only redraws on demand. Combine with R3F's invalidate() called on visibility changes.
- Pause the canvas when scrolled out of view. Use `useInView` on the parent.
- Skip rendering entirely on `prefers-reduced-motion: reduce`.
- Skip rendering entirely when `navigator.hardwareConcurrency < 4` (a rough proxy for low-end devices).

### Model sourcing

Use only CC0 / public domain models. Good sources:

- https://poly.pizza/ (CC-BY-3.0, attribution required — credit in `ReferencesSection`)
- https://kenney.nl/ (CC0)
- https://www.sketchfab.com (filter to CC0)

Convert to `.glb` (binary glTF) — single file, gzip-friendly, R3F's `useGLTF` consumes it natively. Run through `gltf-pipeline` to compress.

```bash
npx gltf-pipeline -i quill.glb -o quill.glb --draco.compressionLevel=10
```

Target final size: under 200 KB.

## Bundle isolation

R3F + Drei + three is ~150 KB gzipped. That's larger than the rest of the app combined. Vite's `manualChunks` in `vite.config.ts` puts three into its own chunk:

```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        three: ["three", "@react-three/fiber", "@react-three/drei"],
      },
    },
  },
},
```

And the import must always be dynamic (`lazy()`) — never a static import from a section file.

## Decision checkpoint

Before adding three.js, ask: *Does this make the project better, or is this a vanity feature?* For an academic blog graded on accuracy, clarity, and design, a static parchment + Option A particle system almost certainly scores as well. If WebGL is a learning goal independent of the grade, by all means proceed — but flag it in the README as exploratory.
