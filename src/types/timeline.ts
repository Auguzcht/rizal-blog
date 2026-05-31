/**
 * types/timeline.ts
 */

import type { ImageRef } from "./image";

export type TimelineEra =
  | "early"
  | "education"
  | "abroad"
  | "homeland"
  | "dapitan"
  | "trial";

export type TimelineEmphasis = "default" | "pivotal" | "tragic";

export type TimelineEvent = {
  /** Stable slug for React keys and URL anchors. kebab-case. */
  id: string;

  /** ISO 8601 if known precisely. "1872" or "Spring 1882" if approximate. */
  date: string;

  /** Human-readable, e.g., "June 19, 1861". */
  displayDate: string;

  era?: TimelineEra;
  title: string;

  /** Markdown prose. Inline parser handles *italic*, **bold**, and line breaks. */
  body: string;

  image?: ImageRef;

  /** At least one source required. TypeScript enforces non-empty. */
  sourceIds: [string, ...string[]];

  emphasis?: TimelineEmphasis;
};

export const ERA_LABELS: Record<TimelineEra, string> = {
  early: "Early Life",
  education: "Education in Manila",
  abroad: "Years Abroad",
  homeland: "Return to the Philippines",
  dapitan: "Exile in Dapitan",
  trial: "Arrest, Trial & Execution",
};
