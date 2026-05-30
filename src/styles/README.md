# `styles/` — Global CSS, Fonts, Tailwind Layer Additions

> Everything CSS that isn't a Tailwind utility. Variables, font imports, custom utility classes, the prose styling for body content.

## Files

```
styles/
├── README.md              ← you are here
├── globals.css            ← Tailwind imports + CSS variables + custom layers
├── fonts.css              ← @font-face declarations (only if self-hosting)
└── prose.css              ← The .prose-rizal class for body content (split from globals for clarity)
```

If self-hosting is deferred (Phase 1), `fonts.css` doesn't need to exist — just preconnect to Google Fonts from `index.html`. The split is here for when we eventually self-host for production.

## globals.css — structure

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Design tokens ─── */
:root {
  /* parchment */
  --parchment-50: #FBF7EC;
  --parchment-100: #F4EBD3;
  --parchment-200: #E8DABC;

  /* sepia */
  --sepia-400: #B08A5B;
  --sepia-600: #7A5A3A;

  /* ink */
  --ink-900: #1E1611;
  --ink-700: #3A2A1F;

  /* accents */
  --blood-600: #8B1E2A;
  --gold-500: #B8860B;

  /* fonts */
  --font-display: "Playfair Display", Georgia, serif;
  --font-serif-i: "Cormorant Garamond", Georgia, serif;
  --font-body: "Crimson Pro", Georgia, serif;
  --font-script: "Tangerine", cursive;

  /* shadows */
  --shadow-paper: 0 8px 32px -8px rgba(30, 22, 17, 0.12);
  --shadow-paper-lg: 0 16px 48px -12px rgba(30, 22, 17, 0.16);
}

/* ─── Base ─── */
@layer base {
  html { color-scheme: light; }
  body {
    background-color: var(--parchment-50);
    color: var(--ink-900);
    font-family: var(--font-body);
    font-size: 1.0625rem;
    line-height: 1.75;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  ::selection {
    background: var(--gold-500);
    color: var(--ink-900);
  }
  /* Paper grain overlay — fixed, low opacity, multiplies onto everything */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background-image: url("/textures/paper-grain.svg");
    opacity: 0.04;
    mix-blend-mode: multiply;
  }
}

/* ─── Custom utilities ─── */
@layer utilities {
  .font-display { font-family: var(--font-display); }
  .font-serif-i { font-family: var(--font-serif-i); }
  .font-body { font-family: var(--font-body); }
  .font-script { font-family: var(--font-script); }
  .font-caption { font-family: var(--font-display); font-weight: 500; }

  .text-display-2xl { font-size: 4.5rem; line-height: 1.05; letter-spacing: -0.02em; }
  .text-display-xl { font-size: 3.5rem; line-height: 1.1; letter-spacing: -0.015em; }
  .text-display-lg { font-size: 2.5rem; line-height: 1.15; letter-spacing: -0.01em; }
  .text-body-lg { font-size: 1.25rem; line-height: 1.7; }
  .text-caption { font-size: 0.875rem; line-height: 1.5; letter-spacing: 0.05em; }

  .shadow-paper { box-shadow: var(--shadow-paper); }
  .shadow-paper-lg { box-shadow: var(--shadow-paper-lg); }
}

/* ─── Components ─── */
@layer components {
  /* See prose.css for .prose-rizal */
}
```

## prose.css — body content styling

```css
@layer components {
  .prose-rizal {
    max-width: 65ch;
    font-family: var(--font-body);
    font-size: 1.0625rem;
    line-height: 1.75;
    color: var(--ink-900);
  }

  .prose-rizal > p { margin-block: 1.25em; }

  /* Drop cap on first paragraph */
  .prose-rizal > p:first-of-type::first-letter {
    font-family: var(--font-display);
    font-size: 4.2em;
    line-height: 0.85;
    float: left;
    margin-right: 0.08em;
    margin-top: 0.06em;
    color: var(--ink-700);
  }

  /* Continuation indent: every paragraph after the first gets a small indent */
  .prose-rizal > p:not(:first-of-type) {
    text-indent: 1.5em;
  }

  .prose-rizal strong { color: var(--ink-700); font-weight: 600; }
  .prose-rizal em { font-family: var(--font-serif-i); font-style: italic; }

  .prose-rizal a {
    color: var(--ink-700);
    text-decoration: underline;
    text-decoration-color: var(--gold-500);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    transition: text-decoration-color 200ms;
  }
  .prose-rizal a:hover { text-decoration-color: var(--blood-600); }

  /* Block quote */
  .prose-rizal blockquote {
    font-family: var(--font-serif-i);
    font-style: italic;
    font-size: 1.25em;
    line-height: 1.5;
    color: var(--sepia-600);
    border-left: 2px solid var(--sepia-400);
    padding-left: 1.5em;
    margin-block: 1.75em;
  }
}
```

## Tailwind config — what to extend

```ts
// tailwind.config.ts (excerpt)
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // shadcn semantic mapping
        primary: { DEFAULT: "var(--ink-700)", foreground: "var(--parchment-50)" },
        secondary: { DEFAULT: "var(--parchment-100)", foreground: "var(--ink-900)" },
        accent: { DEFAULT: "var(--gold-500)", foreground: "var(--ink-900)" },
        destructive: { DEFAULT: "var(--blood-600)", foreground: "var(--parchment-50)" },
        muted: { DEFAULT: "var(--parchment-200)", foreground: "var(--sepia-600)" },
        border: "var(--sepia-400)",

        // raw palette also exposed for direct use
        parchment: { 50: "var(--parchment-50)", 100: "var(--parchment-100)", 200: "var(--parchment-200)" },
        sepia: { 400: "var(--sepia-400)", 600: "var(--sepia-600)" },
        ink: { 700: "var(--ink-700)", 900: "var(--ink-900)" },
        blood: { 600: "var(--blood-600)" },
        gold: { 500: "var(--gold-500)" },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        "serif-i": ["var(--font-serif-i)"],
        body: ["var(--font-body)"],
        script: ["var(--font-script)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

## Fonts in index.html

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Cormorant+Garamond:ital,wght@1,400;1,600&family=Crimson+Pro:wght@400;500;600&family=Tangerine:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

Only load the weights actually used. Subsetting further (only Latin) would require self-hosting — defer to Phase 5/6.

## Paper grain SVG

A simple SVG noise pattern. Save to `public/textures/paper-grain.svg`:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" />
    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#n)" />
</svg>
```

Tune `baseFrequency` (higher = finer grain) and the alpha multiplier to taste. Output sits as a fixed overlay, multiply blend.
