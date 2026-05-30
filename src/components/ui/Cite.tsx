import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

// Placeholder reference resolver — will be replaced when data/references.ts is built
const referencesById: Record<string, { shortLabel: string }> = {};

type CiteProps = { ids: string[] };

export function Cite({ ids }: CiteProps) {
  return (
    <span className="inline-flex gap-1 align-super text-xs">
      {ids.map((id, i) => {
        const ref = referencesById[id];
        return (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <a
                href={`#ref-${id}`}
                className="rounded-sm bg-parchment-200 px-1.5 py-0.5 text-sepia-600 hover:bg-gold-500/20 no-underline"
              >
                [{ref?.shortLabel ?? `?${i + 1}`}]
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-sm text-sm">{id}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </span>
  );
}
