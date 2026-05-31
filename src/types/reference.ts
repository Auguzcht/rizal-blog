/**
 * types/reference.ts
 */

export type ReferenceType =
  | "book"
  | "article"
  | "letter"
  | "primary"
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
  accessed?: string;
  license?: string;
  notes?: string;
};
