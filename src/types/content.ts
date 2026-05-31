/**
 * types/content.ts
 * Types for biographical-facts.ts and quotes.ts
 */

export type CharacterTrait = {
  trait: string;
  body: string;
  sourceIds: [string, ...string[]];
};

export type FamilyMember = {
  id: string;
  name: string;
  relationship: string;
  body: string;
  sourceIds: [string, ...string[]];
  imageId?: string;
};

export type Quote = {
  id: string;
  original: string;         // In the original language (usually Spanish)
  translation: string;      // English translation
  source: string;           // Human-readable source description, e.g. "Noli Me Tángere, Ch. 1 (1887)"
  sourceId: string;         // → references.ts
  context?: string;         // Editorial context explaining the quote's significance
  language: "es" | "tl" | "de" | "fr" | "en";
};
