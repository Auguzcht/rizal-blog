"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useUIStore } from "@/store/useUIStore";
import { TextReveal, ScrollIndicator } from "@/components/motion";
import { EASE_CINEMATIC } from "@/components/motion/constants";
import { quotes } from "@/data/quotes";

export function HeroSection() {
  const loaded = useUIStore((s) => s.loaded);
  const [showContent, setShowContent] = useState(false);

  // Pick the Mi Último Adiós opening as the hero quote
  const heroQuote = quotes.find((q) => q.id === "ultimo-adios-farewell");

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
            <TextReveal>The Shaping of a Hero</TextReveal>
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

          {/* Script quote — Mi Último Adiós opening */}
          {heroQuote && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 1.1 }}
              className="mt-12"
            >
              <span className="font-script text-2xl md:text-3xl text-gold-500 block">
                &ldquo;{heroQuote.original}&rdquo;
              </span>
              <span className="font-caption text-caption text-sepia-600 mt-2 block">
                — {heroQuote.translation}
              </span>
            </motion.p>
          )}
        </motion.div>
      )}

      <ScrollIndicator className="absolute bottom-12 left-1/2 -translate-x-1/2" />
    </section>
  );
}
