import type { Easing } from "motion/react";

/** Soft easeOutQuart — the signature easing for all cinematic animations. */
export const EASE_CINEMATIC: Easing = [0.22, 1, 0.36, 1];

export const DURATIONS = {
  entry: 0.7,
  parallax: 1.2,
  exit: 0.5,
} as const;

export const STAGGER = {
  sibling: 0.08,
  word: 0.025,
} as const;
