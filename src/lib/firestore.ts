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
    limit(POSTS_PER_PAGE),
  );
  const q = cursor ? query(base, startAfter(cursor)) : base;
  const snap = await getDocs(q);
  const posts: GuestbookPost[] = snap.docs.map((d) => ({
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
