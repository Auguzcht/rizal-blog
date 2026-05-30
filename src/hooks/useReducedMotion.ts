import { useReducedMotion as useMotionReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const fromMotion = useMotionReducedMotion();
  const [native, setNative] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setNative(mq.matches);
    const handler = (e: MediaQueryListEvent) => setNative(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return fromMotion || native;
}
