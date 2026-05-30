import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_CINEMATIC, DURATIONS } from "./constants";

const variants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

type SlideUpProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
};

export function SlideUp({
  delay = 0,
  className,
  children,
  as = "div",
}: SlideUpProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={
        reduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
          : variants
      }
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: DURATIONS.entry,
        ease: EASE_CINEMATIC,
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
