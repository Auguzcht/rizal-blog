"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";

/** Convert *italic* and _italic_ markdown to React <em> elements */
function formatInline(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (/^\*(.+)\*$/.test(part) || /^_(.+)_$/.test(part)) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

type ProseHoverProps = {
  children: string;
  proximity?: boolean;
};

export function ProseHover({ children, proximity }: ProseHoverProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!proximity) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
      const radius = 160;
      const f = Math.exp(-((dist / (radius / 2.5)) ** 2) / 2);

      el.style.background = `linear-gradient(135deg, 
        rgba(184, 134, 11, ${f * 0.18}) 0%, 
        rgba(184, 134, 11, ${f * 0.08}) 50%, 
        transparent 100%)`;
      el.style.boxShadow = f > 0.05
        ? `0 0 ${8 + f * 20}px rgba(184, 134, 11, ${f * 0.12})`
        : "none";
      el.style.color = `color-mix(in srgb, #1E1611 ${100 - f * 30}%, #7A5A3A)`;
    };

    const onLeave = () => {
      el.style.background = "";
      el.style.boxShadow = "none";
      el.style.color = "#1E1611";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [proximity]);

  const content = formatInline(children);

  if (proximity) {
    return (
      <p
        ref={ref}
        className="rounded-sm px-2 -mx-2 py-1 -my-1"
        style={{ color: "#1E1611" }}
      >
        {content}
      </p>
    );
  }

  return (
    <motion.p
      initial={{ color: "#1E1611" }}
      whileHover={{ color: "#B8860B" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {content}
    </motion.p>
  );
}
