"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MotionValue } from "motion/react";

type TimelineRailProps = {
  progress: MotionValue<number>;
};

export function TimelineRail({ progress }: TimelineRailProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative w-0.5 bg-parchment-200">
      {!reduced && (
        <motion.div
          className="absolute top-0 left-0 w-full bg-sepia-400 origin-top"
          style={{ height: progress }}
        />
      )}
    </div>
  );
}
