import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_CINEMATIC, DURATIONS } from "./constants";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type FadeInProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "span" | "section" | "article";
};

export function FadeIn({
  delay = 0,
  className,
  children,
  as = "div",
}: FadeInProps) {
  const reduced = useReducedMotion();
  const Tag = motion(as === "span" ? "span" : "div");

  return (
    <Tag
      className={className}
      variants={
        reduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
          : variants
      }
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: DURATIONS.entry,
        ease: EASE_CINEMATIC,
        delay,
      }}
    >
      {children}
    </Tag>
  );
}
