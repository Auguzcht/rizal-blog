# `components/ui/` — shadcn Primitives + Custom UI Atoms

> The lowest layer of components. shadcn primitives (Button, Card, Dialog, etc.) copied into the repo and restyled to the parchment theme, plus a handful of project-specific atoms (`Cite`, `Figure`, `PullQuote`, `OrnamentalDivider`).

## Philosophy

shadcn isn't a library — it's source code we own. That means we *restyle* the primitives at the source rather than fighting Tailwind classes from the outside. When a Button doesn't fit the parchment palette, edit `Button.tsx`. Don't wrap it.

## Files

```
ui/
├── README.md                 ← you are here
├── index.ts                  ← Barrel
│
├── (shadcn-installed, restyled)
├── Button.tsx
├── Card.tsx
├── Dialog.tsx
├── Input.tsx
├── Textarea.tsx
├── Avatar.tsx
├── Skeleton.tsx
├── Tooltip.tsx
│
├── (project-specific atoms)
├── Cite.tsx                  ← Citation chip → opens tooltip with full reference
├── Figure.tsx                ← Image + caption + source link
├── PullQuote.tsx             ← Large italicized quote with attribution
├── OrnamentalDivider.tsx     ← The ❦ fleuron divider
└── DropCap.tsx               ← First-letter ornament for opening paragraphs
```

## Installation

```bash
pnpm dlx shadcn@latest init
# answer prompts: TypeScript yes, style "default", base color "neutral",
# CSS variables yes, components dir "@/components/ui"

pnpm dlx shadcn@latest add button card dialog input textarea avatar skeleton tooltip
```

Then restyle each primitive — typically the Button needs the most rework. Replace the default neutral palette references with our parchment/sepia/ink tokens.

## Restyle pattern — Button example

The shadcn Button uses `bg-primary`, `bg-secondary`, etc. Our `tailwind.config.ts` maps those CSS variables to our parchment palette so the variants compose naturally:

```ts
// tailwind.config.ts (excerpt)
extend: {
  colors: {
    primary: { DEFAULT: "var(--ink-700)", foreground: "var(--parchment-50)" },
    secondary: { DEFAULT: "var(--parchment-100)", foreground: "var(--ink-900)" },
    accent: { DEFAULT: "var(--gold-500)", foreground: "var(--ink-900)" },
    destructive: { DEFAULT: "var(--blood-600)", foreground: "var(--parchment-50)" },
    muted: { DEFAULT: "var(--parchment-200)", foreground: "var(--sepia-600)" },
    border: "var(--sepia-400)",
  },
},
```

Now `<Button variant="default">` renders ink-on-parchment without touching the Button source. Override the Button only when the *shape* (radius, padding, type scale) needs changing — give it `rounded-sm` (less bubbly) and a slightly heavier letter-spacing for the historical feel.

## Cite — citation chip

The most-used custom atom. Renders a superscript-style chip after a paragraph that, on hover/focus, shows a tooltip with the full bibliographic reference. Clicking jumps to the entry in the References section.

```tsx
type CiteProps = { ids: string[] };

export function Cite({ ids }: CiteProps) {
  return (
    <span className="inline-flex gap-1 align-super text-xs">
      {ids.map((id, i) => {
        const ref = referencesById[id];
        return (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <a
                href={`#ref-${id}`}
                className="rounded-sm bg-parchment-200 px-1.5 py-0.5 text-sepia-600 hover:bg-gold-500/20"
              >
                [{ref.shortLabel ?? i + 1}]
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-sm text-sm">{formatReference(ref)}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </span>
  );
}
```

Resolves IDs against `@/data/references.ts`. If an ID is missing, throws in dev, logs a warning in prod.

## Figure — captioned image

```tsx
type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  sourceId: string;     // → references.ts
  aspect?: "4/3" | "3/2" | "16/9" | "1/1";
};

export function Figure({ src, alt, caption, sourceId, aspect = "4/3" }: FigureProps) {
  const ref = referencesById[sourceId];
  return (
    <figure className="my-12">
      <div className="overflow-hidden rounded-sm border border-sepia-400 shadow-paper">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full aspect-[${aspect}] object-cover`}
        />
      </div>
      <figcaption className="mt-3 text-caption font-serif-i italic text-sepia-600">
        {caption}
        {ref && (
          <>
            {" — "}
            <a href={`#ref-${sourceId}`} className="underline decoration-dotted">
              {ref.shortLabel}
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
```

Every historical image on the site goes through this component. No bare `<img>` tags in sections.

## PullQuote — emphasized quote

A large italicized block quote in `font-serif-i`, with ornamental quotation marks rendered as SVG (curly serifs, sized large, in `--sepia-400`). Used for Rizal's own words and for scholarly assessments.

```tsx
<PullQuote
  author="José Rizal"
  source="Letter to Mariano Ponce, March 12, 1889"
  sourceId="rizal-letters-1889"
>
  El que no sabe amar a su propia lengua, es peor que cualquier animal.
</PullQuote>
```

The component handles original-language + translation display when both are provided.

## DropCap — opening paragraph ornament

The first paragraph of each section's body prose gets a four-line drop cap. Implemented with CSS `::first-letter` and applied via a `.prose-rizal > p:first-of-type` selector in `globals.css`, NOT as a component — but a `<DropCap>` component exists for cases where you want one mid-section (e.g., after a Figure breaks the prose flow).

## What's NOT allowed in this folder

- Business logic. The most a `ui/` component knows is its own visual state.
- Direct imports from `data/` (with one exception: `Cite` and `Figure` resolve reference IDs — they import `referencesById` from `data/references.ts`).
- Imports from `sections/`, `timeline/`, `guestbook/`, `three/`.
- State management beyond local `useState`.
