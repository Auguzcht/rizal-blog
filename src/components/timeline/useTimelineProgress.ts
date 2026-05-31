import { useScroll } from "motion/react";
import type { RefObject } from "react";

export function useTimelineProgress(ref: RefObject<HTMLDivElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  return scrollYProgress;
}
