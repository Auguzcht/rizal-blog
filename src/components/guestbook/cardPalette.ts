import { hashString } from "@/lib/hash";

// Warm, parchment-friendly art palette — soft watercolor tones
export const CARD_PALETTE = [
  { bg: "#FFF1E6", border: "#E8C4A0", text: "#3A2A1F", accent: "#D4A373" },
  { bg: "#F0F3E8", border: "#C4CFB0", text: "#3A2A1F", accent: "#8A9A6C" },
  { bg: "#FDF4E3", border: "#E8D5B0", text: "#3A2A1F", accent: "#C4A265" },
  { bg: "#EDE7F6", border: "#C4B8D9", text: "#3A2A1F", accent: "#9B87B8" },
  { bg: "#FBE8EC", border: "#E0B3BC", text: "#3A2A1F", accent: "#C48794" },
  { bg: "#E6F0F0", border: "#B0C8C8", text: "#3A2A1F", accent: "#77A8A8" },
  { bg: "#F5EDE0", border: "#D4C4AD", text: "#3A2A1F", accent: "#B8A07A" },
  { bg: "#F0E8E0", border: "#D0C0B0", text: "#3A2A1F", accent: "#A89078" },
  { bg: "#FFF8E8", border: "#E8DCC0", text: "#3A2A1F", accent: "#D4BE8A" },
  { bg: "#EBF0E6", border: "#C0CCB0", text: "#3A2A1F", accent: "#8CA878" },
] as const;

const DOODLES = ["✦", "✧", "♡", "★", "✿", "⚡", "◆", "✶", "☾", "✎"];

export function paletteFor(postId: string, index?: number) {
  const idx = index !== undefined
    ? index % CARD_PALETTE.length
    : hashString(postId) % CARD_PALETTE.length;
  return CARD_PALETTE[idx];
}

export function doodleFor(postId: string) {
  const idx = hashString(postId) % DOODLES.length;
  return DOODLES[idx];
}

/** Slight rotation based on card index for the art-wall feel */
export function tiltFor(index: number): number {
  const tilts = [-1.2, 0.8, -0.5, 1.5, -1.8, 0.3, -0.9, 1.1, -0.3, 0.6];
  return tilts[index % tilts.length];
}
