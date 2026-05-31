"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useLenis } from "@/components/layout/LenisProvider";

export function BackToTop() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 500], [0, 1]);

  function scrollToTop() {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <motion.button
      onClick={scrollToTop}
      style={{ opacity }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-ink-700 text-parchment-50 shadow-paper-lg hover:bg-gold-500 hover:text-ink-900 transition-colors"
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </motion.button>
  );
}
