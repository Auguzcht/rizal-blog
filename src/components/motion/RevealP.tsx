"use client";

import { ScrollReveal } from "./ScrollReveal";

type RevealPProps = {
  children: string;
  className?: string;
};

export function RevealP({ children, className }: RevealPProps) {
  return (
    <ScrollReveal
      baseOpacity={0.08}
      baseRotation={1.5}
      blurStrength={3}
      rotationEnd="center center"
      wordAnimationEnd="center center"
      as="p"
      containerClassName={className ?? ""}
    >
      {children}
    </ScrollReveal>
  );
}
