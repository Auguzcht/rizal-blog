# `components/guestbook/` — "Echoes of the Wall"

> The site's only multi-user feature. Visitors authenticate with Google or GitHub, leave a message, and join a persistent wall of thoughts about Rizal. Inspired by the "Words That Echo Always" reference the student shared.

## What the user sees

A gridded wall of color-randomized cards, most recent first. The first card in the grid is the "Join the wall" composer — when signed out it shows sign-in chips, when signed in it shows a "Write a message" button that opens a compose modal. Other cards display: message, name, avatar, date, share button.

Pagination is "Load more" — no infinite scroll (it conflicts with the Lenis-driven scroll choreography of the rest of the page).

## Files

```
guestbook/
├── README.md                 ← you are here
├── index.ts                  ← Exports <Guestbook />
├── Guestbook.tsx             ← Top-level: composer card + grid of posts + load-more
├── GuestbookComposer.tsx     ← The "Join the wall" first card (signed-in or signed-out states)
├── GuestbookCard.tsx         ← Single post card
├── GuestbookComposeDialog.tsx← Modal: sign-in step + compose step
├── GuestbookSignInButtons.tsx← Google + GitHub sign-in chips
├── useGuestbookPosts.ts      ← Fetch + paginate posts from Firestore
├── usePostGuestbookEntry.ts  ← Mutation hook with optimistic update
├── moderation.ts             ← Pure profanity filter + length validation
└── cardPalette.ts            ← Deterministic color palette for cards
```

## Card palette (matches the reference)

The reference design uses bright, varied card colors. We do the same but anchored on our parchment-warm palette so it doesn't look like a different site.

```ts
// cardPalette.ts
export const CARD_GRADIENTS = [
  { from: "#5B2A86", to: "#3D1B5A", text: "#FFFFFF" },  // deep violet
  { from: "#7FE7C4", to: "#FFE08A", text: "#1E1611" },  // teal-gold
  { from: "#C8A2FF", to: "#FFC2DE", text: "#1E1611" },  // lavender-rose
  { from: "#FF6B6B", to: "#FFA8A8", text: "#1E1611" },  // coral
  { from: "#7DD3FC", to: "#BFDBFE", text: "#1E1611" },  // sky
  { from: "#A7F3D0", to: "#D9F99D", text: "#1E1611" },  // mint
  { from: "#FCD34D", to: "#FBBF24", text: "#1E1611" },  // gold (echoes our --gold-500)
] as const;

export function paletteFor(postId: string) {
  // Deterministic: same post always same color.
  const idx = hashString(postId) % CARD_GRADIENTS.length;
  return CARD_GRADIENTS[idx];
}
```

Each card also has a faint hand-drawn doodle in the corner (a lightning bolt, sparkle, smiley, heart) — pick deterministically from a small SVG set the same way.

## Firestore schema

Single collection: `guestbook`. Each document:

```ts
type GuestbookPost = {
  id: string;              // Firestore-generated
  uid: string;             // Firebase auth user ID
  name: string;            // Display name (editable, defaults from auth)
  attribution?: string;    // Optional "BS CS, Mapúa MCM" or similar
  message: string;         // Max 240 chars
  avatarUrl?: string;      // Provider photo URL
  provider: "google.com" | "github.com";
  createdAt: Timestamp;    // Server timestamp on write
};
```

No `updatedAt`. Posts are immutable from the client. (Delete-by-author is a Phase 6 enhancement.)

## Firestore Security Rules

Critical — these are what prevent abuse. Deploy these *before* the site goes live.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guestbook/{postId} {
      allow read: if true;

      allow create: if
        request.auth != null &&
        request.resource.data.uid == request.auth.uid &&
        request.resource.data.message is string &&
        request.resource.data.message.size() > 0 &&
        request.resource.data.message.size() <= 240 &&
        request.resource.data.name is string &&
        request.resource.data.name.size() > 0 &&
        request.resource.data.name.size() <= 60 &&
        request.resource.data.createdAt == request.time;

      allow update, delete: if false;  // Author-self-delete is Phase 6.
    }
  }
}
```

Rate limiting is not enforceable in Firestore rules alone. Client-side, we disable the submit button for 5 minutes after a successful post and store the lockout timestamp in localStorage. A determined abuser bypasses this trivially — accept the limitation for an academic project.

## Composition flow

```
GuestbookSection (in sections/)
    └── <Guestbook />
            ├── <GuestbookComposer />          ← First grid cell
            │     ├─ [signed out] <GuestbookSignInButtons />
            │     └─ [signed in]  "Write a message" button → opens dialog
            ├── posts.map(p => <GuestbookCard key={p.id} post={p} />)
            └── <Button>Load more</Button>      ← Visible when more pages exist

(modal portal)
    └── <GuestbookComposeDialog />
            ├─ name input (auth-prefilled)
            ├─ attribution input
            └─ message textarea + char counter + submit
```

## State, where it lives

| State                             | Lives in                       |
| --------------------------------- | ------------------------------ |
| Current Firebase user             | `useAuthStore` (Zustand)       |
| Posts list + pagination cursor    | `useGuestbookStore` (Zustand)  |
| Draft message (persisted)         | `useGuestbookStore` (persisted)|
| Dialog open/closed                | local `useState` in `<Guestbook />` |
| Compose form fields               | local `useState` in `<GuestbookComposeDialog />` |
| Submitting state, error           | local `useState`               |

The draft message persists in localStorage so the student doesn't lose their text if they accidentally close the dialog.

## Pagination strategy

Use Firestore's cursor-based pagination: `orderBy("createdAt", "desc").limit(12)`, then on "Load more" call again with `startAfter(lastDoc)`. Stored in `useGuestbookStore.cursor`. No infinite scroll.

## Optimistic updates

When the user submits a post:
1. Add it to the Zustand store at the top of the list with a temporary id (`temp-${uuid()}`).
2. Fire the Firestore write.
3. On success: replace the temp post with the real one (matched by temp id).
4. On failure: remove the temp post, surface an error toast, restore the draft text.

This makes the wall feel instantaneous despite the network round-trip.

## Animation polish

- New post: when the optimistic insert happens, the new card mounts with a scale-in (Motion `layout` API for the grid reflow).
- Card hover: subtle Y -2px translate + shadow lift. Cinematic, not bouncy.
- Sign-in chips: a soft pulse on initial render to draw attention. Stops after 5 seconds.

## Reduced motion

Card mount animations collapse to instant insertion. Hover translate disappears. The grid reflow still happens (it's a layout change, not an animation) but without the spring.

## Accessibility

- The dialog is built on `Dialog` from `ui/` (shadcn primitive), which handles focus trap + ESC close + ARIA role.
- The sign-in buttons announce their provider: `aria-label="Sign in with Google"`.
- Cards are not interactive by default (just text). The share button is the only focusable element inside a card.

## Moderation — moderation.ts

A small, vendored profanity list (English + Tagalog top-50). On submit:

```ts
export function isAllowed(message: string): { ok: boolean; reason?: string } {
  if (message.trim().length === 0) return { ok: false, reason: "empty" };
  if (message.length > 240) return { ok: false, reason: "too_long" };
  if (containsProfanity(message)) return { ok: false, reason: "profanity" };
  return { ok: true };
}
```

This is intentionally simple. Sophisticated moderation is out of scope. The instructor can delete bad entries from the Firebase console if needed.

## Things to test before submission

1. Sign in with Google works.
2. Sign in with GitHub works (if GitHub provider is enabled in Firebase — see `lib/firebase.ts`).
3. Sign out, then post — fails (rules block).
4. Sign in, post a 241-character message — fails client-side.
5. Sign in, post on a slow network — optimistic insert appears immediately.
6. Refresh page — posts persist, signed-in state persists.
7. Open on a phone — composer card adapts, dialog is reachable.
8. Reduced motion — no animation jank.
