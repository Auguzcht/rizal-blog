import type { TimelineEra as TimelineEraType } from "@/types/timeline";
import { ERA_LABELS } from "@/types/timeline";

type TimelineEraProps = {
  era: TimelineEraType;
};

export function TimelineEra({ era }: TimelineEraProps) {
  return (
    <div className="relative my-16 first:mt-0">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-sepia-400/40" />
        <span className="font-caption text-caption uppercase tracking-[0.25em] text-sepia-600 whitespace-nowrap">
          {ERA_LABELS[era]}
        </span>
        <div className="h-px flex-1 bg-sepia-400/40" />
      </div>
    </div>
  );
}
