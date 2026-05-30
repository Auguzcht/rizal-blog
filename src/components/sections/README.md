# `components/sections/` — Blog Sections

> One file per addressable section of the page. These are the *composition layer* — they pull from `data/`, wrap content in `motion/` primitives, and arrange it on the parchment.

## File map (build in this order)

```
sections/
├── README.md                              ← you are here
├── index.ts                               ← Barrel export
├── HeroSection.tsx                        ← #hero — title, subtitle, scroll cue
├── ThesisSection.tsx                      ← #thesis — overview + thesis statement
├── BiologicalFactorsSection.tsx           ← #biological
├── EnvironmentalFactorsSection.tsx        ← #environmental
├── LifeExperiencesSection.tsx             ← #timeline — mounts <Timeline />
├── CharacterAnalysisSection.tsx           ← #character — virtues vs shortcomings
├── PitfallsAndHeroismSection.tsx          ← #pitfalls
├── LegacySection.tsx                      ← #legacy — the conclusion
├── GuestbookSection.tsx                   ← #guestbook — mounts <Guestbook />
└── ReferencesSection.tsx                  ← #references — bibliography
```

## The `<Section>` shell

Every section starts with the same shell. Define it once in `sections/_Section.tsx` (private to this folder) and have each section render through it.

```tsx
type SectionProps = {
  id: string;                   // hash anchor, e.g., "biological"
  eyebrow?: string;             // small uppercase label above the heading
  title: string;                // main heading text (passed to TextReveal)
  children: React.ReactNode;
  className?: string;           // for per-section accents (e.g., crimson background)
};

export function Section({ id, eyebrow, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative mx-auto w-full max-w-screen-xl px-6 py-32 md:py-40",
        className
      )}
    >
      {eyebrow && (
        <FadeIn>
          <p className="font-caption text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
            {eyebrow}
          </p>
        </FadeIn>
      )}
      <h2
        id={`${id}-heading`}
        className="font-display text-display-lg md:text-display-xl text-ink-700 mb-12 max-w-[20ch]"
      >
        <TextReveal>{title}</TextReveal>
      </h2>
      <div className="prose-rizal max-w-[65ch]">{children}</div>
    </section>
  );
}
```

`prose-rizal` is a custom Tailwind utility defined in `styles/globals.css` for body prose styling (drop-cap on first paragraph, indented continuations, etc.).

## Content rules

1. **No facts hardcoded in JSX.** Facts come from `@/data/*`. Sections are templates; data is content. This makes citation auditing possible.
2. **Every paragraph that asserts a historical claim ends with a `<Cite ids={[...]} />` chip.** Component lives in `@/components/ui/Cite`.
3. **Images:** always use `<Figure src caption sourceId />` (also in `ui/`) — never a bare `<img>`. The Figure component renders the caption and links to the reference in `data/references.ts`.
4. **No section may exceed ~250 lines.** If you're hitting that, you're mixing layers — extract subcomponents into `sections/_Internal/` (private to this folder) or, if reused, into `ui/`.

## HeroSection — opening shot

The single most important section. First impression.

**Composition:**
- Full viewport height (`min-h-[100svh]`).
- Centered title in `font-display`, with `<TextReveal>`. Subtitle in `font-serif-i italic`.
- A `<Parallax>`-wrapped period illustration drifts slowly behind the title (low opacity, sepia-toned).
- Below the title: a quote — Rizal's own words — in `font-script` cursive, suggesting a handwritten dedication.
- At the bottom: `<ScrollIndicator />` from `motion/`.
- Optional: a `<ThreeQuill />` (lazy-loaded) floating above the title. See `three/README.md`.

**Animation choreography (in order, on mount):**
1. Loading screen exits.
2. Background image fades in (1200ms).
3. Eyebrow + title `<TextReveal>` (700ms, word-stagger).
4. Subtitle slides up (delay 600ms).
5. Cursive quote fades in (delay 1100ms).
6. Scroll indicator fades in + bobs (delay 1500ms).

## ThesisSection — the academic anchor

This is where the "Thesis statement on the factors shaping his character and heroism" lives. Pulled directly from the assignment outline (I.B).

A single large pull-quote in `font-serif-i italic`, framed by ornamental fleurons (`❦`). Below it, a 3–4 sentence introductory paragraph in body prose.

## LifeExperiencesSection — the timeline gateway

This section is intentionally thin. It opens with a brief intro paragraph (1–2 sentences), then mounts the `<Timeline />` component from `@/components/timeline`. The Timeline component owns its own scroll choreography — this section just hosts it.

## CharacterAnalysisSection — two-column tension

The "Virtues vs Shortcomings" framing is naturally a two-column layout on desktop. Left column: virtues. Right column: shortcomings. On mobile: stacked, with virtues first.

Underneath both columns: a third subsection on "Evolution of character over time" — a horizontal swimlane showing how key traits shifted from boyhood to Dapitan.

## GuestbookSection — composition

This section is again thin:
- Section eyebrow: "Echoes of the Wall"
- Section title: "Words That Echo Always" (yes, lift the reference's poetry — it's appropriate)
- A short prose intro inviting the reader to leave a thought.
- `<Guestbook />` from `@/components/guestbook`.

## ReferencesSection — the citation list

Renders the full `references.ts` array as a numbered list, formatted in Chicago Author-Date or APA 7 (decide once, stick to it). Each entry shows the full bibliographic record. Anchor links (`#ref-palma1949`) so the `Cite` chips elsewhere can deep-link here.

A small "View bibliography" button can also open a side drawer showing the same list, for readers who want to consult it without scrolling all the way down.

## Section ordering in `App.tsx`

```tsx
<main>
  <HeroSection />
  <ThesisSection />
  <BiologicalFactorsSection />
  <EnvironmentalFactorsSection />
  <LifeExperiencesSection />     {/* contains <Timeline /> */}
  <CharacterAnalysisSection />
  <PitfallsAndHeroismSection />
  <LegacySection />
  <GuestbookSection />            {/* contains <Guestbook /> */}
  <ReferencesSection />
</main>
```

Don't reorder without updating MASTERPLAN §4 and the `Nav`'s anchor list.
