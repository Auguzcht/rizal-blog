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
