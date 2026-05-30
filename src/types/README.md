# `types/` — Shared TypeScript Types

> Cross-folder type contracts. If a type is used by exactly one component or one file, define it where it's used. If two or more folders share it, it belongs here.

## Files

```
types/
├── README.md            ← you are here
├── index.ts             ← Barrel
├── timeline.ts          ← TimelineEvent, TimelineEra
├── guestbook.ts         ← GuestbookPost, GuestbookPostInput
├── reference.ts         ← Reference, ReferenceType
├── image.ts             ← Image, ImageRef
├── user.ts              ← AppUser (decoupled from Firebase User)
└── content.ts           ← BiographicalFact, Influence, Work, CharacterTrait
```

## Conventions

- **`type` over `interface`** unless declaration merging is needed (it isn't here).
- **Avoid `enum`** — use `as const` union types instead.
- **No runtime behavior.** Types only. Helpers that *use* the types go to `lib/` or to the appropriate component folder.
- **Document the schema** with JSDoc when a field needs explanation.

## Example — `timeline.ts`

```ts
import type { ImageRef } from "./image";

export type TimelineEra =
  | "early"
  | "education"
  | "abroad"
  | "homeland"
  | "dapitan"
  | "trial";

export type TimelineEmphasis = "default" | "pivotal" | "tragic";

export type TimelineEvent = {
  /** Stable slug for React keys and URL anchors. kebab-case. */
  id: string;

  /** ISO 8601 if known precisely. "1872" or "Spring 1882" if approximate. */
  date: string;

  /** Human-readable, e.g., "June 19, 1861". */
  displayDate: string;

  /** Grouping for era separators in the timeline. Optional. */
  era?: TimelineEra;

  title: string;

  /** Markdown. Will be parsed by a small inline parser, not full markdown. */
  body: string;

  image?: ImageRef;

  /** IDs into references.ts. Required; never empty. */
  sourceIds: [string, ...string[]];

  emphasis?: TimelineEmphasis;
};
```

Notice the `sourceIds` type — it's a non-empty tuple. TypeScript will reject `sourceIds: []` at the data definition site. This is the citation-as-compile-time-requirement working.

## Example — `guestbook.ts`

```ts
import type { Timestamp } from "firebase/firestore";

export type GuestbookProvider = "google.com" | "github.com";

/** As stored in Firestore. */
export type GuestbookPost = {
  id: string;
  uid: string;
  name: string;
  attribution?: string;
  message: string;
  avatarUrl?: string;
  provider: GuestbookProvider;
  createdAt: Timestamp;
};

/** Input shape when creating a post — server fills createdAt. */
export type GuestbookPostInput = Omit<GuestbookPost, "id" | "createdAt">;

/** Optimistic post — id starts with "temp-" until the real Firestore ID arrives. */
export type OptimisticGuestbookPost = GuestbookPost & {
  id: `temp-${string}`;
};
```

## Example — `reference.ts`

```ts
export type ReferenceType =
  | "book"
  | "article"
  | "letter"
  | "primary"   // Rizal's own works
  | "web"
  | "image";

export type Reference = {
  id: string;
  shortLabel: string;
  type: ReferenceType;
  authors: string[];
  title: string;
  year?: number;
  publisher?: string;
  journal?: string;
  volume?: string;
  pages?: string;
  url?: string;
  accessed?: string;        // ISO date
  license?: string;
  notes?: string;
};
```

## Why decouple `AppUser` from Firebase `User`

```ts
// user.ts
export type AppUser = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  provider: "google.com" | "github.com" | null;
};
```

The Firebase `User` type is huge (metadata, tokens, methods). Storing it in Zustand causes serialization issues and tangles the auth layer with the UI layer. `AppUser` is a thin projection of the fields we actually consume. The mapping happens in `useFirebaseAuth` via `toAppUser(fbUser)`.

## What does NOT belong here

- Component prop types — they belong on the component.
- Hook return types — they belong on the hook.
- Internal helper types that aren't crossing folder boundaries.
- Runtime code of any kind.
