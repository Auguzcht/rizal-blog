"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Figure } from "@/components/ui/Figure";
import { EASE_CINEMATIC } from "@/components/motion/constants";

/** Convert *italic* and _italic_ markdown to React <em> elements */
function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (/^\*(.+)\*$/.test(part) || /^_(.+)_$/.test(part)) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
import type { TimelineEvent } from "@/types/timeline";

type TimelineEntryProps = {
  event: TimelineEvent;
  index: number;
};

export function TimelineEntry({ event, index }: TimelineEntryProps) {
  const reduced = useReducedMotion();

  const dotColor =
    event.emphasis === "tragic"
      ? "border-blood-600 bg-blood-600"
      : event.emphasis === "pivotal"
        ? "border-gold-500 bg-gold-500"
        : "border-sepia-400 bg-parchment-50";

  const titleColor =
    event.emphasis === "tragic"
      ? "text-blood-600"
      : event.emphasis === "pivotal"
        ? "text-gold-500"
        : "text-ink-700";

  return (
    <motion.article
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={
        reduced ? { opacity: 1 } : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: EASE_CINEMATIC,
        delay: index * 0.04,
      }}
      className="relative pl-6 md:pl-10"
    >
      {/* Dot on rail */}
      <div
        className={cn(
          "absolute left-[-13px] md:left-[-17px] top-2 z-10 h-4 w-4 rounded-full border-2",
          dotColor,
        )}
      />

      {/* Date */}
      <p className="font-serif-i italic text-caption text-sepia-600 mb-1">
        {event.displayDate}
      </p>

      {/* Title */}
      <h3 className={cn("font-display text-display-lg mb-4", titleColor)}>
        {event.emphasis === "pivotal" && (
          <span className="mr-2 font-script text-xl" aria-hidden="true">
            ❦
          </span>
        )}
        {event.title}
      </h3>

      {/* Body */}
      <div className="prose-rizal max-w-[65ch]">
        {event.body.split("\n\n").map((paragraph, j) => (
          <p key={j}>{formatInline(paragraph)}</p>
        ))}
      </div>

      {/* Image */}
      {event.image && (
        <Figure
          src={event.image.src}
          alt={event.image.alt}
          caption={event.image.caption}
          sourceId={event.image.sourceId}
          className="mt-8"
        />
      )}
    </motion.article>
  );
}
