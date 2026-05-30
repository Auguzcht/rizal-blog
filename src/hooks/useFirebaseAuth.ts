import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import type { AppUser } from "@/types/user";

function toAppUser(fbUser: {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerData: Array<{ providerId: string } | null>;
}): AppUser {
  return {
    uid: fbUser.uid,
    name: fbUser.displayName,
    email: fbUser.email,
    photoURL: fbUser.photoURL,
    provider: (fbUser.providerData[0]?.providerId as AppUser["provider"]) ?? null,
  };
}

export function useFirebaseAuth() {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user ? toAppUser(user) : null);
      setLoading(false);
    });
    return unsub;
  }, [setUser, setLoading]);
}
