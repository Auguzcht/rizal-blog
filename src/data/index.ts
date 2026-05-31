/**
 * data/index.ts — Barrel export
 *
 * Import data through this barrel so folder-internal reorganization
 * doesn't require updating every consumer.
 *
 *   import { rizalTimeline, references, referencesById } from "@/data";
 */

export { rizalTimeline } from "./rizal-timeline";
export {
  references,
  referencesById,
  formatReferenceAPA,
} from "./references";
export {
  biologicalFactors,
  environmentalFactors,
  characterAnalysis,
  pitfallsAndHeroism,
  influences,
} from "./biographical-facts";
export { quotes, quotesById } from "./quotes";
export { images, imagesById, getImageDownloadChecklist } from "./images";
