import {
  signInWithPopup,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
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

export function isAuthError(
  e: unknown,
): e is { code: string; message: string } {
  return typeof e === "object" && e !== null && "code" in e;
}
