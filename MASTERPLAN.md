# MASTERPLAN — *The Shaping of a Hero: José Rizal's Character Development*

> Orchestrator document. Read this first. Every folder has a focused `README.md` with implementation details; this file holds the global decisions, conventions, and contracts those folders depend on.

---

## 1. Project Identity

**Working title:** *The Shaping of a Hero: José Rizal's Character Development*
**Short slug:** `rizal-blog`
**Format:** Single-page React SPA, scroll-driven narrative, with one interactive Guestbook section.
**Course:** Mapúa Malayan Colleges Mindanao — SS038, The Life and Works of Rizal.
**Submission:** A deployed Vercel URL.

The output is graded on four axes: **accuracy, visual appeal, clarity/organization, integration of sources**. Every architectural choice below ladders up to at least one of these.

---

## 2. The Experience We're Building

This is a *literary scrollytelling* site. Think Apple product pages crossed with NYT longform, dressed in the visual language of a 19th-century Spanish-Filipino manuscript.

**Five experience pillars:**

1. **Cinematic scroll.** Lenis smooth-scroll governs the entire page. Sections breathe — they pin, parallax, and reveal in choreographed beats, not abrupt jumps.
2. **Period-evocative typography.** Display serifs (Playfair, Cormorant Garamond italic) carry the headers; a humanist body serif (Crimson Pro) carries the prose; a cursive accent (Tangerine) appears sparingly for handwritten flourishes — letters, signatures, quotes.
3. **Parchment over screen.** A subtle paper-grain texture and a warm, low-saturation palette (parchment, sepia, ink, faded crimson) replace the typical white-screen blog look.
4. **Living timeline.** Rizal's life unfolds as a scroll-scrubbed timeline — dates pin to the left, illustrations and text reveal in stagger as the user descends.
5. **A wall that remembers.** The Guestbook section ("Echoes of the Wall") closes the experience — readers sign in, leave a message, and join the chorus of people thinking about Rizal.

**Anti-goals:**
- No drag-and-drop builder aesthetic.
- No generic Bootstrap/Material chrome.
- No autoplay video, no carousels with arrows, no parallax-for-parallax's-sake.
- No content that isn't traceable to a reputable source.

---

## 3. Tech Stack — Locked Decisions

| Concern              | Choice                                           | Why                                                                 |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| Build tool           | **Vite** (`vite@5`)                              | Fast HMR, native ESM, painless TypeScript.                          |
| Language             | **TypeScript** (`strict: true`)                  | Catch content/data shape bugs early. Timeline events are typed.     |
| Framework            | **React 18**                                     | Concurrent features, Suspense for lazy 3D.                          |
| Styling              | **Tailwind CSS v3** + CSS variables              | Tokens in CSS vars, utilities for layout. No CSS-in-JS runtime.     |
| Component primitives | **shadcn/ui** (selectively)                      | Owned source, restyled to match the parchment theme. No npm bloat.  |
| Animation            | **`motion/react`** (Framer Motion v11)           | Best-in-class scroll-linked + variants API.                         |
| Smooth scroll        | **Lenis** (`@studio-freight/lenis`)              | Buttery scroll, integrates cleanly with Motion's `useScroll`.       |
| State (client)       | **Zustand**                                      | Tiny, no boilerplate, perfect for guestbook draft + UI state.       |
| Persistence (client) | **`zustand/middleware/persist`** + `localStorage`| Caches guestbook draft, "seen the intro" flag, user font-size pref. |
| Backend-as-a-service | **Firebase v10** (Auth + Firestore)              | Lets the project stay pure-frontend deploy. Generous free tier.     |
| Auth providers       | **Google** primary, **GitHub** secondary         | Matches the reference design's auth chips.                          |
| 3D (optional)        | **React Three Fiber** + **Drei**                 | Lazy-loaded. See `src/components/three/README.md`.                  |
| Icons                | **lucide-react**                                 | Consistent with shadcn defaults.                                    |
| Fonts                | Google Fonts via `<link rel="preconnect">`       | Self-host later if perf demands.                                    |
| Deploy               | **Vercel**                                       | Zero-config Vite, env vars, edge CDN.                               |

**Explicitly NOT included:**
- React Router — single page, no routing needed. Use scroll anchors and `scrollIntoView`.
- Redux / Jotai — Zustand covers the surface area.
- Server functions — Firebase is the only network dependency.
- Tailwind v4 — wait until shadcn fully tracks it.

---

## 4. Information Architecture — The 1-Page Blog

The page is one long scroll. Sections are addressable by hash (`#intro`, `#timeline`, etc.) for the top nav.

Order corresponds to the assignment's required outline:

| # | Section ID         | Component (`src/components/sections/`)    | Maps to assignment outline                |
| - | ------------------ | ----------------------------------------- | ----------------------------------------- |
| 0 | `loading`          | `<LoadingScreen />` (in `layout/`)        | First impression. Not in outline.         |
| 1 | `hero`             | `<HeroSection />`                         | I. Introduction (overview)                |
| 2 | `thesis`           | `<ThesisSection />`                       | I.B Thesis statement                      |
| 3 | `biological`       | `<BiologicalFactorsSection />`            | II. Biological Factors                    |
| 4 | `environmental`    | `<EnvironmentalFactorsSection />`         | III. Environmental Factors                |
| 5 | `timeline`         | `<LifeExperiencesSection />` (+ timeline) | IV. Life Experiences                      |
| 6 | `character`        | `<CharacterAnalysisSection />`            | V. Character Analysis (Roman IV in PDF)   |
| 7 | `pitfalls`         | `<PitfallsAndHeroismSection />`           | V. Pitfalls and Heroism                   |
| 8 | `legacy`           | `<LegacySection />`                       | VI. Conclusion                            |
| 9 | `guestbook`        | `<GuestbookSection />`                    | (Original — student addition)             |
| 10| `references`       | `<ReferencesSection />`                   | Bibliography (required for grading)       |

The PDF outline numbers Character Analysis as a second "IV." — that's a typo in the brief. We treat it as V and shift downstream. Confirm with the instructor if uncertain.

---

## 5. Visual Design System

### 5.1 Color Tokens

Defined once in `src/styles/globals.css` as CSS custom properties, surfaced through Tailwind's `theme.extend.colors`.

| Token             | Hex      | Role                                                |
| ----------------- | -------- | --------------------------------------------------- |
| `--parchment-50`  | `#FBF7EC`| Page background — the lightest paper                |
| `--parchment-100` | `#F4EBD3`| Card backgrounds, raised surfaces                   |
| `--parchment-200` | `#E8DABC`| Borders, dividers, watermark elements               |
| `--sepia-400`     | `#B08A5B`| Mid-tone illustrations, decorative rule lines       |
| `--sepia-600`     | `#7A5A3A`| Secondary text, captions, dates                     |
| `--ink-900`       | `#1E1611`| Primary text — deep brown-black, not pure black     |
| `--ink-700`       | `#3A2A1F`| Headings, emphasis                                  |
| `--blood-600`     | `#8B1E2A`| Sparing accent — execution date, key quotes only    |
| `--gold-500`      | `#B8860B`| Highlight, link hover, signature elements           |

Pure `#000` and `#FFF` are forbidden on this site. Every neutral has warmth.

### 5.2 Typography Scale

Three families. Loaded with `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` in `index.html`.

| Family                   | Use                                       | CSS class      |
| ------------------------ | ----------------------------------------- | -------------- |
| **Playfair Display**     | Section headers, large display text       | `font-display` |
| **Cormorant Garamond**   | Pull-quotes, italic emphasis, sub-display | `font-serif-i` |
| **Crimson Pro**          | Body prose, all paragraph text            | `font-body`    |
| **Tangerine**            | Cursive flourishes — section openers, signatures, dedication | `font-script`  |

Scale (rem, mobile-first; multiply ×1.25 at `lg`):
- `text-display-2xl`: 4.5rem, line-height 1.05, letter-spacing -0.02em
- `text-display-xl`:  3.5rem, line-height 1.1
- `text-display-lg`:  2.5rem, line-height 1.15
- `text-body-lg`:     1.25rem, line-height 1.7
- `text-body`:        1.0625rem, line-height 1.75
- `text-caption`:     0.875rem, line-height 1.5, tracking-wide, uppercase for labels

Body prose gets a max-width of `65ch`. Always. No exceptions outside the timeline.

### 5.3 Texture & Surface

- A subtle paper-grain SVG noise overlays the whole page at `opacity: 0.04`, `mix-blend-mode: multiply`.
- Section dividers use ornamental SVG flourishes (a fleuron, `❦` styled with `font-script`) rather than `<hr>`.
- Cards and pulled images have a 1px `--sepia-400` border + soft drop shadow `0 8px 32px rgba(30,22,17,0.08)`.
- Images are *never* full-bleed without a vignette or sepia tone overlay — preserves the period feel.

### 5.4 Motion Principles

Codified in `src/components/motion/README.md`. Headlines:

- **Default easing:** `[0.22, 1, 0.36, 1]` (a soft easeOutQuart). Authored as `EASE_CINEMATIC` constant.
- **Default duration:** 700ms for entry, 1200ms for parallax sweeps. Nothing snaps in.
- **Stagger:** 80ms between sibling reveals. 120ms for word-level text splits.
- **Reduced motion:** All scroll-linked transforms must collapse to opacity-only fades when `prefers-reduced-motion: reduce`. Implemented via a `useReducedMotion()` guard in every `motion.tsx` primitive.

---

## 6. Folder Structure

```
rizal-blog/
├── MASTERPLAN.md                    ← you are here
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                       ← Firebase keys, gitignored
├── public/
│   ├── images/
│   │   ├── rizal/                   ← Portraits, daguerreotypes
│   │   ├── family/                  ← Mercado-Rizal family
│   │   ├── travels/                 ← Madrid, Heidelberg, Berlin, etc.
│   │   ├── dapitan/                 ← Exile period
│   │   └── execution/               ← Bagumbayan, monument
│   ├── textures/
│   │   └── paper-grain.svg
│   └── og-image.png
└── src/
    ├── App.tsx                      ← Composes sections, mounts Lenis
    ├── main.tsx                     ← React root
    ├── components/
    │   ├── ui/                      ← shadcn primitives, restyled
    │   ├── motion/                  ← Animation primitives + variants
    │   ├── layout/                  ← Nav, Footer, LoadingScreen, ScrollProgress
    │   ├── sections/                ← One file per blog section
    │   ├── timeline/                ← Scroll-scrubbed timeline subsystem
    │   ├── three/                   ← Optional WebGL accents (lazy-loaded)
    │   └── guestbook/               ← The "Wall of Echoes"
    ├── hooks/                       ← useScrollProgress, useReducedMotion, etc.
    ├── lib/                         ← firebase.ts, cn.ts, format.ts
    ├── store/                       ← Zustand stores
    ├── data/                        ← Rizal content as typed data
    ├── styles/                      ← globals.css, fonts.css
    └── types/                       ← Shared TS types
```

Every folder under `src/` has a `README.md`. When working on a feature, read:
1. This MASTERPLAN.md
2. The README of the folder you're modifying
3. The README of any folder it imports from

---

## 7. Data & Content Strategy

**The content is the project.** Bad sourcing tanks the "Accuracy" rubric score.

- All historical claims live in `src/data/` as typed TypeScript modules. Components import data — they don't hardcode facts.
- Every timeline event, every quote, every image has a `sourceId` field that references an entry in `src/data/references.ts`.
- Reputable sources only. The hierarchy:
  1. Rizal's own correspondence and works (Project Gutenberg, NHCP archives).
  2. Rafael Palma, *The Pride of the Malay Race* (1949).
  3. León Ma. Guerrero, *The First Filipino* (1963).
  4. Ambeth Ocampo, *Rizal Without the Overcoat* and related essays.
  5. National Historical Commission of the Philippines publications.
  6. Peer-reviewed journal articles (JSTOR, Philippine Studies).
- Wikipedia is a starting point, never a citation.
- Images: use public-domain sources (NHCP, Filipinas Heritage Library digital archives, Wikimedia Commons originals). Caption every image with photographer/illustrator (if known), date, source, and license.

See `src/data/README.md` for the schema and the seed content checklist.

---

## 8. The Guestbook ("Echoes of the Wall")

A real, persistent, multi-user feature — the centerpiece of the "dynamic" requirement.

**Functional contract:**
- User clicks "Leave your mark" → modal opens.
- If unauthenticated: shows Google / GitHub sign-in. On success, modal becomes the compose form.
- Compose form: name (auto-filled from auth, editable), message (max 240 chars), optional one-line attribution (e.g., "BS CS, Mapúa MCM").
- On submit: write to Firestore `guestbook` collection, optimistically prepend to local Zustand store.
- Wall displays all entries as colored cards (palette pulled from a fixed set — see `guestbook/README.md`), most recent first, paginated 12 at a time with "Load more."
- Each card shows: message, name, avatar (from auth provider), date, share button.

**Moderation (minimum viable):**
- Firestore security rules enforce auth, rate-limit one post per user per 5 minutes, max 240 char message.
- A client-side profanity word list filters on submit (English + Tagalog). Not bulletproof — flagged content can be deleted manually from Firebase console.
- Optional: report button that increments a `reports` counter; manual review.

**Why Firebase and not a custom backend:** Zero ops, generous free tier, identity built in, real-time updates come free if we want them later. The project stays "pure frontend" from the deployment perspective.

Full implementation details in `src/components/guestbook/README.md`.

---

## 9. State Management Map

Three Zustand stores. Each lives in `src/store/`. No store imports another — composition happens in components.

| Store              | Responsibility                                        | Persisted? |
| ------------------ | ----------------------------------------------------- | ---------- |
| `useUIStore`       | Loading screen done flag, current section, nav open   | No         |
| `useAuthStore`     | Firebase user object, auth loading state              | No (Firebase persists session)|
| `useGuestbookStore`| Posts list, draft message, pagination cursor          | Draft only |

Things that are *not* in Zustand:
- Scroll position → use Motion's `useScroll`.
- Section visibility → `useInView` from `motion/react`.
- Form fields inside the compose dialog → local `useState`.
- Theme → there's only one theme. No dark mode for this project (parchment doesn't have a dark mode).

---

## 10. Performance Budget

This site loads on student laptops and instructor phones. Treat performance as a feature.

| Metric                | Target           |
| --------------------- | ---------------- |
| Lighthouse Performance| ≥ 90 (mobile)    |
| LCP                   | ≤ 2.5s           |
| CLS                   | ≤ 0.05           |
| JS bundle (initial)   | ≤ 180 kB gzipped |

**Strategies:**
- Code-split: `three/`, `guestbook/`, and Firebase init are lazy. Hero + Intro must be in the initial bundle; everything else can stream.
- Images: serve WebP, lazy-load below the fold (`loading="lazy"`, `decoding="async"`), specify intrinsic dimensions.
- Fonts: preconnect to Google Fonts, `display: swap`. Subset Tangerine to Latin if possible.
- Vite's `manualChunks` splits `framer-motion`, `firebase`, and `three` into their own chunks.
- A skeleton renders during loading screen — no FOUC.

---

## 11. Accessibility Contract

Non-negotiable. The grade may not weight a11y but ignoring it is bad practice and limits who can engage with Rizal's story.

- Semantic landmarks: `<header>`, `<main>`, `<nav>`, `<section>` with `aria-labelledby` pointing at the heading.
- Every image has meaningful `alt` text in English (not Tagalog filenames).
- All scroll-linked animation respects `prefers-reduced-motion` — see motion conventions.
- Focus rings visible at all times (`outline-2 outline-offset-2 outline-gold-500`).
- Keyboard nav works through the page; the Guestbook modal traps focus.
- Color contrast: body text (`--ink-900` on `--parchment-50`) clears AAA. Verify with axe DevTools before submission.

---

## 12. Build & Deploy

```bash
# Local dev
pnpm dev          # vite, runs at :5173

# Type-check + build
pnpm typecheck    # tsc --noEmit
pnpm build        # vite build
pnpm preview      # serve dist/

# Deploy
git push origin main   # Vercel auto-deploys
```

**Environment variables** (set in Vercel dashboard + `.env.local`):

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

The `VITE_` prefix is required for client-exposed variables in Vite. Firebase API keys are not secrets — they're identifiers. Security comes from Firestore Rules, not key obscurity. Lock down the rules before deploy.

**Vercel config:** none required. Vite's default `dist/` output works out of the box.

---

## 13. Phased Build Order

Do not build out of order. Each phase produces something demonstrable.

**Phase 1 — Scaffolding (1 session)**
- Vite init, Tailwind, tsconfig strict, fonts loaded, color tokens set.
- shadcn init, install Button, Card, Dialog, Input, Textarea, Avatar, Skeleton.
- `App.tsx` with placeholder sections so the page scrolls top to bottom.
- Lenis wired up.

**Phase 2 — Design system + Motion (1 session)**
- All `motion/` primitives: `FadeIn`, `SlideUp`, `TextReveal`, `Parallax`, `StaggerChildren`.
- `LoadingScreen` and `Nav` in `layout/`.
- Typography classes verified against the scale.

**Phase 3 — Content sections, top to bottom (3–4 sessions)**
- Build `Hero`, `Thesis`, `Biological`, `Environmental` with real data.
- Then the `Timeline` subsystem with `LifeExperiences`.
- Then `Character`, `Pitfalls`, `Legacy`.

**Phase 4 — Guestbook (1 session)**
- Firebase project provisioned, rules deployed.
- Auth, compose, list, pagination.

**Phase 5 — Polish (1 session)**
- References section.
- Lighthouse audit + fixes.
- Reduced motion verification.
- Final image optimization pass.
- Open Graph meta tags for share previews.

**Phase 6 — Optional (defer if time is tight)**
- Three.js floating quill or particle accent in Hero.
- Real-time guestbook updates via Firestore `onSnapshot`.
- Print stylesheet for an academic PDF export.

---

## 14. Conventions Cheat Sheet

- **File names:** `PascalCase.tsx` for components, `camelCase.ts` for utilities, `kebab-case.md` never (we use `README.md`).
- **Component exports:** named exports preferred; default export only for lazy-loaded route-level chunks.
- **Imports order:** React → third-party → `@/components` → `@/hooks` → `@/lib` → `@/data` → relative → styles. ESLint plugin enforces this.
- **Path alias:** `@/*` → `src/*`. Configured in `vite.config.ts` and `tsconfig.json`.
- **Comments:** explain *why*, never *what*. Section headers in long files use `// ─── Section ───`.
- **TODOs:** `// TODO(rizal): description` so they're greppable.
- **Citations in JSX:** every fact-bearing paragraph gets a `<Cite ids={["palma1949", "guerrero1963"]} />` chip at the end. Component lives in `components/ui/Cite.tsx`.

---

## 15. References (Project-Wide, Not Content)

Documentation we lean on while building:

- Lenis: https://github.com/darkroomengineering/lenis
- Motion (Framer Motion docs): https://motion.dev/
- shadcn/ui: https://ui.shadcn.com/
- Zustand: https://docs.pmnd.rs/zustand/
- Firebase v10 modular: https://firebase.google.com/docs/web/modular-upgrade
- React Three Fiber: https://r3f.docs.pmnd.rs/

Inspiration sites (study scroll choreography, not styling):
- https://www.apple.com/airpods-pro/ — section pinning and beat-paced reveals
- https://pudding.cool/ — narrative scrollytelling done right
- https://www.frankchimero.com/ — typography hierarchy
- The reference guestbook the student shared — palette + card layout for Phase 4

---

## 16. Open Questions / Risks

Tracked here, resolved by deletion when answered:

- [ ] Should the timeline be vertical (default plan) or horizontal-pinned? Horizontal is sexier but harder on mobile. **Default: vertical, mobile-friendly.**
- [ ] Confirm with instructor whether external guestbook (anyone can post) is acceptable, or if we should restrict to authenticated `@mcm.edu.ph` accounts. Risk: spam.
- [ ] Firestore free-tier reads: at ~50 visitors/day with 12 posts/page, we're nowhere near limits. Recheck if the post goes viral.
- [ ] Three.js scope: confirm by end of Phase 3 whether to attempt or defer.

---

*End of MASTERPLAN. Folder READMEs follow.*
