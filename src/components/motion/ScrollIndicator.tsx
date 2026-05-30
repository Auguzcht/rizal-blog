import { motion } from "motion/react";
import { EASE_CINEMATIC } from "./constants";

type ScrollIndicatorProps = {
  className?: string;
};

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 1.5 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        <span className="font-caption text-caption uppercase tracking-[0.2em] text-sepia-400">
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          stroke="currentColor"
          className="text-sepia-400"
          strokeWidth="1.5"
        >
          <motion.rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="8"
            cy="8"
            r="2.5"
            fill="currentColor"
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
