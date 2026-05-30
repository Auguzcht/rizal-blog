import { motion, useReducedMotion } from "motion/react";
import { EASE_CINEMATIC, DURATIONS, STAGGER } from "./constants";

type StaggerChildrenProps = {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
};

export function StaggerChildren({
  children,
  className,
  staggerDelay = STAGGER.sibling,
}: StaggerChildrenProps) {
  const reduced = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: reduced ? 0 : staggerDelay,
        delayChildren: 0,
      },
    },
  };

  const childVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.entry, ease: EASE_CINEMATIC },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
