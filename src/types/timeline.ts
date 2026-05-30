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
  /** Grouping for era separators in the timeline. */
  era?: TimelineEra;
  title: string;
  /** Markdown. Will be parsed by a small inline parser, not full markdown. */
  body: string;
  image?: ImageRef;
  /** IDs into references.ts. Required; never empty. */
  sourceIds: [string, ...string[]];
  emphasis?: TimelineEmphasis;
};
