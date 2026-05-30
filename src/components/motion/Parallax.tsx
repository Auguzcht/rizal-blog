import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Y range as percentage, e.g., ["-10%", "10%"]. Default ±10%. Max ±20%. */
  range?: [string, string];
};

export function Parallax({
  children,
  className,
  range = ["-10%", "10%"],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], range);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
