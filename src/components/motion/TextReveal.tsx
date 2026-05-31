import { motion, useReducedMotion } from "motion/react";
import { EASE_CINEMATIC, DURATIONS, STAGGER } from "./constants";

type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DURATIONS.entry, ease: EASE_CINEMATIC, delay }}
        >
          {children}
        </motion.span>
      </Tag>
    );
  }

  const words = children.split(/(\s+)/);

  return (
    <Tag className={className}>
      {words.map((word, i) =>
        word.match(/^\s+$/) ? (
          <span key={`s-${i}`}>&nbsp;</span>
        ) : (
          <motion.span
            key={`w-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: DURATIONS.entry * 0.6,
              ease: EASE_CINEMATIC,
              delay: delay + i * STAGGER.word,
            }}
          >
            {word}
          </motion.span>
        ),
      )}
    </Tag>
  );
}
