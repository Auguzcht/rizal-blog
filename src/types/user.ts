export type AppUser = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  provider: "google.com" | "github.com" | null;
};
