"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useLenis } from "@/components/layout/LenisProvider";

export function BackToTop() {
  const lenis = useLenis();
  const { scrollY } = useScroll();

  // Gradual fade-in + slide-up between 200px and 600px scroll
  const opacity = useTransform(scrollY, [200, 600], [0, 1]);
  const y = useTransform(scrollY, [200, 600], [12, 0]);

  function scrollToTop() {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 3) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <motion.button
      onClick={scrollToTop}
      style={{ opacity, y }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-ink-700 text-parchment-50 shadow-paper-lg hover:bg-gold-500 hover:text-ink-900 transition-colors"
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </motion.button>
  );
}
