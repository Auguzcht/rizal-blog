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
      <h1 className="font-display text-display-xl md:text-display-2xl text-ink-700 text-center px-4">
        The Shaping of a Hero
      </h1>
      <p className="font-script text-2xl md:text-3xl text-sepia-600 mt-6">
        Para sa Inang Bayan...
      </p>

      {/* Animated quill underline */}
      <svg
        className="mt-8 h-1 w-48 md:w-64"
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
          transition={{
            duration: 1.2,
            ease: EASE_CINEMATIC,
          }}
        />
      </svg>
    </motion.div>
  );
}
