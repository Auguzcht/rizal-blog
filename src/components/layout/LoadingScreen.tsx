"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useUIStore } from "@/store/useUIStore";
import { EASE_CINEMATIC } from "@/components/motion/constants";

type LoadingState = "loading" | "ready" | "exited";

export function LoadingScreen() {
  const [state, setState] = useState<LoadingState>("loading");
  const setLoaded = useUIStore((s) => s.setLoaded);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, 1200));
    const fontsReady = document.fonts.ready;
    Promise.all([minDelay, fontsReady]).then(() => setState("ready"));
  }, []);

  useEffect(() => {
    if (state === "ready") {
      const timer = setTimeout(() => {
        setState("exited");
        setLoaded(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [state, setLoaded]);

  if (state === "exited") return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-parchment-50"
      initial={{ opacity: 1 }}
      animate={
        state === "ready" ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
    >
      {/* Logo — ramps up with a slight bounce */}
      <motion.img
        src="/Rizal-Logo-Transparent.png"
        alt="Rizal Logo"
        className="w-32 h-32 md:w-40 md:h-40 object-contain mb-6"
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{
          opacity: state === "loading" ? 1 : 0.5,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* Title — gentle blur-in, different from logo's bounce */}
      <motion.h1
        className="font-display text-3xl md:text-display-2xl text-ink-700 text-center px-6 max-w-full"
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        Life of Rizal
      </motion.h1>

      {/* Subtitle — gentle rise + fade */}
      <motion.p
        className="font-script text-xl md:text-3xl text-sepia-600 mt-4 md:mt-6 px-4 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: state === "loading" ? 1 : 0,
          y: 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
      >
        Para sa Inang Bayan...
      </motion.p>

      {/* Animated underline */}
      <svg
        className="mt-6 md:mt-8 h-1 w-40 md:w-64 max-w-[80vw]"
        viewBox="0 0 256 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 0 2 H 256"
          stroke="currentColor"
          className="text-gold-500"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: state === "loading" ? 0.3 : 1 }}
          transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
        />
      </svg>
    </motion.div>
  );
}
