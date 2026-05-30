"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useUIStore } from "@/store/useUIStore";
import { TextReveal, Parallax, ScrollIndicator } from "@/components/motion";
import { EASE_CINEMATIC } from "@/components/motion/constants";

export function HeroSection() {
  const loaded = useUIStore((s) => s.loaded);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background parallax layer */}
      <Parallax range={["-5%", "5%"]} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-parchment-100/50 to-parchment-50" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_var(--color-sepia-400)_0%,_transparent_70%)]" />
      </Parallax>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
          className="text-center px-6 max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.2 }}
            className="font-caption text-caption uppercase tracking-[0.2em] text-sepia-600 mb-6"
          >
            SS038 — The Life and Works of Rizal
          </motion.p>

          {/* Main title */}
          <h1 className="font-display text-display-2xl text-ink-700 mb-6 leading-[1.05]">
            <TextReveal>
              The Shaping of a Hero
            </TextReveal>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.6 }}
            className="font-serif-i italic text-display-lg text-sepia-600 max-w-2xl mx-auto"
          >
            José Rizal&apos;s Character Development in the Context of Family,
            Nation, and History
          </motion.p>

          {/* Script quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 1.1 }}
            className="font-script text-3xl text-gold-500 mt-12"
          >
            Para sa Inang Bayan
          </motion.p>
        </motion.div>
      )}

      <ScrollIndicator className="absolute bottom-12 left-1/2 -translate-x-1/2" />
    </section>
  );
}
