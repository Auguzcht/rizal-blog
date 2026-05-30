# `data/` — Rizal Content as Typed Data

> **The most important folder for the grade.** Sections render templates; this folder supplies the truth. Every fact, date, image, and citation lives here.

## Files

```
data/
├── README.md                      ← you are here
├── index.ts                       ← Barrel
├── rizal-timeline.ts              ← Chronological timeline events
├── biographical-facts.ts          ← Family, education, physical description
├── influences.ts                  ← People who shaped him (parents, brothers, mentors)
├── works.ts                       ← Noli, Fili, key essays, key letters
├── character.ts                   ← Virtues, shortcomings, evolution markers
├── quotes.ts                      ← Notable quotes (original Spanish + English)
├── references.ts                  ← The full bibliography, keyed by ID
└── images.ts                      ← Image manifest: path, alt, caption, sourceId
```

## Why this matters for the grade

The rubric weights "Accuracy of Information" and "Integration of Information" heavily. The instructor will check whether claims are sourced and whether the sources are reputable. Keeping content in typed modules:

- Forces every fact to have a `sourceIds: string[]` field — citation is a compile-time requirement, not an afterthought.
- Makes it trivial to scan the project for unsourced claims (just look for `sourceIds: []`).
- Separates "what we say" from "how we display it" — useful when revising for accuracy without touching design.

## Sourcing standards

(Repeated from MASTERPLAN §7 — this is where it matters most.)

**Tier 1 — Primary sources.** Rizal's own letters and works.
- *Noli Me Tángere* (1887)
- *El Filibusterismo* (1891)
- *Mi Último Adiós* (1896)
- Correspondence with Blumentritt, Paciano, Hidalgo, his parents, the propagandists
- The Rizal-Pastells correspondence on faith and reason

**Tier 2 — Authoritative biographies.**
- Rafael Palma, *Biografía de Rizal* / *The Pride of the Malay Race* (1949)
- León María Guerrero, *The First Filipino* (1963)
- Austin Coates, *Rizal: Philippine Nationalist and Martyr* (1968)

**Tier 3 — Contemporary scholarship.**
- Ambeth Ocampo, *Rizal Without the Overcoat* (1990), *Looking Back* series
- John N. Schumacher, *The Propaganda Movement, 1880–1895* (1973)
- Philippine Studies journal articles

**Tier 4 — Official institutional sources.**
- National Historical Commission of the Philippines (NHCP) publications
- Project Gutenberg / Filipiniana digital archives for primary texts

**Avoid as citations** (use only as starting points): Wikipedia, blog posts, AI-generated summaries, sites without identifiable authors or institutional backing.

## Schemas

Defined in `@/types/*` and re-exported here for convenience. The key types:

### `TimelineEvent`

```ts
type TimelineEvent = {
  id: string;
  date: string;            // ISO 8601 if known
  displayDate: string;     // human-readable
  era?: "early" | "education" | "abroad" | "homeland" | "dapitan" | "trial";
  title: string;
  body: string;            // markdown
  image?: ImageRef;
  sourceIds: string[];
  emphasis?: "default" | "pivotal" | "tragic";
};
```

### `Reference`

```ts
type Reference = {
  id: string;                  // e.g., "palma1949"
  shortLabel: string;          // e.g., "Palma 1949" — what shows in tooltips
  type: "book" | "article" | "letter" | "primary" | "web" | "image";
  authors: string[];
  title: string;
  year?: number;
  publisher?: string;
  journal?: string;            // for articles
  volume?: string;
  pages?: string;
  url?: string;
  accessed?: string;           // ISO date if a web source
  license?: string;            // for images: "Public Domain", "CC BY 4.0", etc.
  notes?: string;
};
```

### `Image` (in images.ts)

```ts
type Image = {
  id: string;
  src: string;                 // /images/rizal/...
  alt: string;
  caption: string;
  sourceId: string;            // references.ts entry
  aspect?: "4/3" | "3/2" | "16/9" | "1/1";
};
```

## Seed content checklist

The minimum content required for the project to feel substantive. **Build this list before building components — it sizes the project realistically.**

### Timeline events (target: 25–30)

- [ ] Birth (Jun 19, 1861, Calamba)
- [ ] Baptism (Jun 22, 1861)
- [ ] Early home schooling under mother Teodora
- [ ] First teacher Maestro Justiniano Aquino Cruz, Biñan (1869–1870)
- [ ] Death of mother's freedom — Teodora imprisoned (1871, Rizal age 10) [pivotal influence]
- [ ] Ateneo Municipal de Manila — enrolled 1872
- [ ] Ateneo graduation, Sobresaliente (1877)
- [ ] University of Santo Tomas — medicine + philosophy (1877–1882)
- [ ] Secret departure for Spain (May 1882)
- [ ] Universidad Central de Madrid — Licentiate in Medicine (1884)
- [ ] Licentiate in Philosophy and Letters (1885)
- [ ] Study tour: Paris, Heidelberg, Leipzig, Berlin (1885–1887)
- [ ] Noli Me Tángere published in Berlin (Mar 1887) [pivotal]
- [ ] Return to Calamba (Aug 1887)
- [ ] Harassment of his family by friars; departure again (Feb 1888)
- [ ] Second European sojourn: London (Rizal annotates Morga), Paris, Brussels
- [ ] El Filibusterismo published in Ghent (Sep 1891) [pivotal]
- [ ] Hong Kong (1891–1892), medical practice
- [ ] Return to Manila (Jun 1892)
- [ ] Founding of La Liga Filipina (Jul 3, 1892) [pivotal]
- [ ] Arrest and exile to Dapitan (Jul 1892)
- [ ] Life in Dapitan: school, waterworks, scientific work, romance with Josephine Bracken
- [ ] Volunteer for Cuba (1896)
- [ ] Arrest at sea, return to Manila (Sep 1896)
- [ ] Trial at Fort Santiago (Dec 26, 1896)
- [ ] Mi Último Adiós composed
- [ ] Execution at Bagumbayan (Dec 30, 1896) [tragic]

Each gets a body of 2–4 sentences, ≥1 `sourceId`, and an `image` where available.

### Biographical facts

- [ ] Family: parents, siblings (Saturnina through Soledad — 11 children)
- [ ] Genealogy: Chinese, Spanish, Malay heritage
- [ ] Physical description: height (~4'11"), build, languages spoken (~22 claimed)
- [ ] Personality observations from contemporaries

### Influences (5–8 figures)

- [ ] Teodora Alonso (mother)
- [ ] Paciano Rizal (older brother)
- [ ] Fr. Leoncio López (early mentor)
- [ ] Ferdinand Blumentritt (Austrian scholar, lifelong correspondent)
- [ ] Marcelo H. del Pilar (Propaganda Movement)
- [ ] Antonio Maria Regidor
- [ ] Josephine Bracken (Dapitan)

### Works (4–6 entries)

- [ ] *Noli Me Tángere* — synopsis, themes, reception
- [ ] *El Filibusterismo* — synopsis, themes, reception
- [ ] *Mi Último Adiós* — context of composition, key stanzas
- [ ] "Sobre la Indolencia de los Filipinos" — essay
- [ ] "Filipinas Dentro de Cien Años" — essay
- [ ] Annotations to Morga's *Sucesos de las Islas Filipinas*

### Character analysis pillars

**Virtues:** intellectual breadth, courage, patriotism, compassion (Dapitan medical practice), discipline, faith.

**Shortcomings (with care — these are debated):**
- Some scholars cite stubbornness in personal disagreements (with Marcelo H. del Pilar over Propaganda leadership)
- Class-based blind spots — Rizal's reformism vs. the more radical Katipunan
- Romantic complications (multiple loves, the Josephine Bracken question)

This section requires the most careful sourcing — the rubric rewards nuance.

### Notable quotes (8–12)

Render with original Spanish + English translation. Examples:
- "Para sa Inang Bayan"
- "Ang hindi marunong lumingon sa pinanggalingan..." (from "El Amor Patrio" — though disputed origin)
- The opening lines of *Mi Último Adiós*

Vet every quote — apocryphal Rizal quotes circulate widely. Ocampo's *Rizal Without the Overcoat* has an entire chapter on this.

## Reference IDs — naming convention

`lastname` + `year`, lowercase, no punctuation. Disambiguate with letter suffix if multiple.

- `palma1949`
- `guerrero1963`
- `ocampo1990`
- `ocampo1990a` (if a second 1990 work)
- `nhcp-rizal-life-page` (for web/institutional)
- `rizal-letters-blumentritt-1887` (for primary correspondence, more descriptive)

## Image sourcing

All images must be:
1. **Public domain** (most pre-1923 photographs are) OR
2. **CC0 / CC BY / CC BY-SA** (with attribution rendered in the figure caption) OR
3. **Used under fair use for academic commentary**, with a clear citation.

Good sources for Rizal-era imagery:
- NHCP digital archive
- Filipinas Heritage Library
- Wikimedia Commons (verify original source, not just the Wikipedia link)
- Project Gutenberg (for plates from Rizal's books)

Save originals to `public/images/<category>/` and add an entry in `images.ts`. Never inline base64 — it bloats the bundle.

## What does NOT belong here

- JSX. This folder is pure data.
- Computed/derived values that depend on UI state. Compute them in components or hooks.
- Anything that imports from `components/`, `hooks/`, `store/`, or `lib/`. Data is a leaf.
