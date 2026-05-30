# `lib/` — Utilities and External Integrations

> Pure functions and external service initialization. No React. No JSX. If you add `import React` to a file in this folder, it belongs somewhere else.

## Files

```
lib/
├── README.md           ← you are here
├── firebase.ts         ← Initializes Firebase app, exports auth + db handles
├── auth.ts             ← signInWithGoogle, signInWithGitHub, signOut wrappers
├── firestore.ts        ← Guestbook CRUD: listPosts, createPost, paginate
├── cn.ts               ← clsx + tailwind-merge classNames helper
├── format.ts           ← formatDate, formatRelative, formatReferenceAPA
└── hash.ts             ← hashString (used by guestbook cardPalette deterministic picker)
```

## firebase.ts — initialization

Single-import side-effect-free initialization. Other files import `auth` and `db` from here.

```ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!config.apiKey) {
  throw new Error(
    "Firebase env vars are missing. Copy .env.example to .env.local and fill in your project's keys."
  );
}

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
```

The throw on missing config is intentional — failing fast at startup beats a confusing error inside a click handler later.

## auth.ts — sign-in/out wrappers

Thin wrappers around Firebase Auth that translate errors into UI-friendly messages.

```ts
import { signInWithPopup, signOut as fbSignOut, type User } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "./firebase";

export async function signInWithGoogle(): Promise<User> {
  const { user } = await signInWithPopup(auth, googleProvider);
  return user;
}

export async function signInWithGithub(): Promise<User> {
  const { user } = await signInWithPopup(auth, githubProvider);
  return user;
}

export async function signOut() {
  return fbSignOut(auth);
}

export function isAuthError(e: unknown): e is { code: string; message: string } {
  return typeof e === "object" && e !== null && "code" in e;
}
```

Components handle errors with `try/catch` + `isAuthError` to format messages.

## firestore.ts — guestbook CRUD

All Firestore reads/writes for the guestbook live here. Components call these via hooks, never directly.

```ts
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  addDoc,
  serverTimestamp,
  getDocs,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type { GuestbookPost, GuestbookPostInput } from "@/types/guestbook";

const POSTS_PER_PAGE = 12;

export async function listPosts(cursor?: QueryDocumentSnapshot) {
  const base = query(
    collection(db, "guestbook"),
    orderBy("createdAt", "desc"),
    limit(POSTS_PER_PAGE)
  );
  const q = cursor ? query(base, startAfter(cursor)) : base;
  const snap = await getDocs(q);
  const posts: GuestbookPost[] = snap.docs.map(d => ({
    id: d.id,
    ...(d.data() as Omit<GuestbookPost, "id">),
  }));
  const nextCursor = snap.docs[snap.docs.length - 1];
  return { posts, nextCursor, hasMore: snap.docs.length === POSTS_PER_PAGE };
}

export async function createPost(input: GuestbookPostInput) {
  const ref = await addDoc(collection(db, "guestbook"), {
    ...input,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
```

## cn.ts — className helper

The shadcn-default utility. Combines `clsx` for conditional classes with `tailwind-merge` for conflict resolution.

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Used everywhere. The most-imported utility in the project.

## format.ts — formatters

Date, relative-time, and bibliographic formatters. Use Intl APIs where possible.

```ts
export function formatDate(date: Date | { toDate(): Date }) {
  const d = "toDate" in date ? date.toDate() : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatRelative(date: Date | { toDate(): Date }) {
  const d = "toDate" in date ? date.toDate() : date;
  const diff = (d.getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  const ranges: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, "second"], [3600, "minute"], [86400, "hour"], [2592000, "day"],
    [31536000, "month"], [Infinity, "year"],
  ];
  for (const [r, unit] of ranges) {
    if (Math.abs(diff) < r) {
      const divisor = ranges[ranges.findIndex(x => x[0] === r) - 1]?.[0] ?? 1;
      return rtf.format(Math.round(diff / divisor), unit);
    }
  }
  return "";
}
```

Bibliographic format function (APA 7 / Chicago — pick one in MASTERPLAN, implement here).

## What does NOT belong here

- React components — go to `components/`.
- Hooks — go to `hooks/`.
- Stateful logic — go to `store/` (Zustand) or hooks.
- Content — go to `data/`.
- Anything that imports from `components/`, `hooks/`, or `store/` (would create a cycle).
