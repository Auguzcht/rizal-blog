# `components/timeline/` — The Living Timeline

> The signature interactive of the site. Rizal's life renders as a vertical, scroll-scrubbed timeline. Dates pin to the left edge, illustrations and prose reveal on the right as the user descends.

## Visual concept

```
│
●───────  June 19, 1861       Born in Calamba, Laguna
│         ┌────────────────────────────┐
│         │  [portrait of young Rizal] │
│         │  Body paragraph about his  │
│         │  birth and early home...   │
│         └────────────────────────────┘
│
●───────  1864–1869            Early education at home
│         ...
│
●═══════  Dec 30, 1896         Execution at Bagumbayan
│         (rendered in --blood-600, full-bleed treatment)
```

A continuous vertical line on the left, with dots marking events. The line *draws itself* as the user scrolls — its filled length reflects scroll progress through the timeline.

## Why a dedicated folder

The timeline has 4–5 internal components and its own scroll-progress logic. Putting it under `sections/` would bloat that folder. Putting it under `motion/` confuses primitives with features. It earns its own home.

## Files

```
timeline/
├── README.md                 ← you are here
├── index.ts                  ← Exports <Timeline /> only
├── Timeline.tsx              ← Outer component. Owns the scroll ref, renders rail + entries.
├── TimelineRail.tsx          ← The vertical line + progress fill + animated dots
├── TimelineEntry.tsx         ← One event: date, title, body, optional image
├── TimelineEra.tsx           ← Optional era separator (e.g., "Years Abroad, 1882–1887")
└── useTimelineProgress.ts    ← Hook: returns scroll progress relative to the timeline's bounding box
```

## Data source

The timeline reads from `@/data/rizal-timeline.ts`. That file exports a typed array of `TimelineEvent` objects (see `@/types/timeline.ts`).

```ts
type TimelineEvent = {
  id: string;                    // stable slug, used for React keys + URL anchors
  date: string;                  // ISO 8601 if known; "1872" or "Spring 1882" if vague
  displayDate: string;           // human-readable rendering, e.g., "June 19, 1861"
  era?: "early" | "education" | "abroad" | "homeland" | "dapitan" | "trial";
  title: string;
  body: string;                  // markdown, rendered via a tiny inline parser
  image?: {
    src: string;
    alt: string;
    caption: string;
    sourceId: string;            // → references.ts
  };
  sourceIds: string[];           // citations for the claims in body
  emphasis?: "default" | "pivotal" | "tragic";  // styles the entry dot + text accent
};
```

The Timeline component does not filter or sort — `rizal-timeline.ts` is the source of truth and is exported pre-sorted chronologically.

## Scroll choreography

Three layered behaviors:

1. **Rail progress.** The left line fills from 0% to 100% as the user scrolls from the top of the Timeline component to the bottom. Implemented via `useScroll({ target: timelineRef, offset: ["start center", "end center"] })` and a `motion.div` with `height` driven by the progress.

2. **Dot activation.** Each event dot has a scroll progress range derived from its index. As the rail's progress crosses a dot's range midpoint, the dot scales from 0.6→1.0 and changes fill color. Implemented with `useTransform` per-dot, or — preferred — with `useInView` per-entry for simplicity.

3. **Entry reveal.** Each `<TimelineEntry>` fades + slides in (`FadeIn` from `motion/`) when it enters the viewport. Default amount: 0.4. Images reveal with a slight parallax via `<Parallax>`.

## Mobile considerations

- The rail moves from 24px to 16px left inset on small screens.
- Entry images stack above the body instead of beside it.
- Era separators become small full-width chips instead of side labels.
- Reduced-motion: dots still fill but skip the scale animation. Entries fade only, no slide.

## Pivotal events get special treatment

Three events earn enhanced styling via `emphasis: "pivotal"`:

- The publication of *Noli Me Tángere* (1887)
- Arrival in Dapitan (1892)
- Founding of La Liga Filipina (1892)

And one event uses `emphasis: "tragic"`:

- Execution at Bagumbayan (December 30, 1896)

Pivotal: dot becomes gold (`--gold-500`), title gets a small ornament prefix.
Tragic: dot becomes `--blood-600`, surrounding card has a subtle crimson tint, the date is set in `font-script` cursive.

These styles are defined in `TimelineEntry.tsx`, not in the data file. The data only tags the emphasis level.

## Performance notes

- Roughly 25–35 events on the timeline. Each entry mounts a `motion.div` and possibly an `<img>`. That's fine without virtualization.
- Images are `loading="lazy"` and ship `width`/`height` to prevent layout shift.
- The progress fill animates a `height` property, which causes layout — for 1 element that's acceptable. Don't expand this pattern to many elements.

## Component contract

```tsx
// Timeline.tsx (skeleton)
export function Timeline() {
  const events = rizalTimeline;            // imported from @/data
  const ref = useRef<HTMLDivElement>(null);
  const progress = useTimelineProgress(ref);

  return (
    <div ref={ref} className="relative grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-12">
      <TimelineRail progress={progress} eventCount={events.length} />
      <div className="space-y-32">
        {events.map((event, i) => (
          <TimelineEntry key={event.id} event={event} index={i} total={events.length} />
        ))}
      </div>
    </div>
  );
}
```

## Things this folder must *not* do

- Render section eyebrows, headings, or surrounding prose. That's `LifeExperiencesSection`'s job.
- Fetch data — the timeline reads a static import.
- Own the navigation. Nav links to `#timeline` (the section ID), not into individual events. (Individual event anchors are a nice-to-have for Phase 6.)
