import type { ImageRef } from "./image";

export type BiographicalFact = {
  id: string;
  category: "family" | "physique" | "personality" | "genealogy";
  title: string;
  body: string;
  sourceIds: [string, ...string[]];
  image?: ImageRef;
};

export type Influence = {
  id: string;
  name: string;
  relationship: string;
  significance: string;
  sourceIds: [string, ...string[]];
  image?: ImageRef;
};

export type Work = {
  id: string;
  title: string;
  year: number;
  type: "novel" | "essay" | "poem" | "letter" | "annotation";
  synopsis: string;
  themes: string[];
  sourceIds: [string, ...string[]];
  image?: ImageRef;
};

export type CharacterTrait = {
  id: string;
  trait: string;
  category: "virtue" | "shortcoming";
  description: string;
  sourceIds: [string, ...string[]];
};

export type Quote = {
  id: string;
  original: string;
  translation?: string;
  context: string;
  sourceIds: [string, ...string[]];
};
