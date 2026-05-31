"use client";

import { useRef } from "react";
import { rizalTimeline } from "@/data/rizal-timeline";
import { useTimelineProgress } from "./useTimelineProgress";
import { TimelineRail } from "./TimelineRail";
import { TimelineEntry } from "./TimelineEntry";
import { TimelineEra } from "./TimelineEra";
import type { TimelineEra as TimelineEraType } from "@/types/timeline";

function groupEras() {
  const eras: Array<{ era: TimelineEraType; eventIds: string[] }> = [];
  let currentEra: TimelineEraType | null = null;

  rizalTimeline.forEach((event) => {
    const era = event.era ?? "early";
    if (era !== currentEra) {
      eras.push({ era, eventIds: [event.id] });
      currentEra = era;
    } else {
      eras[eras.length - 1].eventIds.push(event.id);
    }
  });

  return eras;
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useTimelineProgress(ref);
  const eraGroups = groupEras();

  // Build flat ordered list with era marker positions
  const eraMarkerIds = new Set(eraGroups.map((g) => g.eventIds[0]));

  return (
    <div ref={ref} className="relative mt-24 grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-12">
      <TimelineRail progress={progress} />

      <div className="space-y-16 md:space-y-24">
        {rizalTimeline.map((event, i) => (
          <div key={event.id}>
            {eraMarkerIds.has(event.id) && event.era && (
              <TimelineEra era={event.era} />
            )}
            <TimelineEntry event={event} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
