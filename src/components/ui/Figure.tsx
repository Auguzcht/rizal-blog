import { cn } from "@/lib/cn";

type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  sourceId?: string;
  aspect?: "4/3" | "3/2" | "16/9" | "1/1";
  className?: string;
};

const ASPECT_RATIOS = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-[1/1]",
} as const;

export function Figure({
  src,
  alt,
  caption,
  sourceId,
  aspect = "4/3",
  className,
}: FigureProps) {
  return (
    <figure className={cn("my-12", className)}>
      <div className="overflow-hidden rounded-sm border border-sepia-400 shadow-paper">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn("w-full object-cover", ASPECT_RATIOS[aspect])}
        />
      </div>
      <figcaption className="mt-3 font-serif-i italic text-caption text-sepia-600">
        {caption}
        {sourceId && (
          <>
            {" — "}
            <a
              href={`#ref-${sourceId}`}
              className="underline decoration-dotted hover:text-gold-500 transition-colors"
            >
              {sourceId}
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
