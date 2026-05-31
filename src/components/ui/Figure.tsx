import { cn } from "@/lib/cn";
import { useMemo } from "react";
import { referencesById } from "@/data/references";

type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  sourceId?: string;
  aspect?: "4/3" | "3/2" | "16/9" | "1/1" | "3/4";
  objectPosition?: string;
  className?: string;
};

export function Figure({
  src,
  alt,
  caption,
  sourceId,
  aspect = "4/3",
  objectPosition,
  className,
}: FigureProps) {
  const dims = useMemo(() => {
    const [w, h] = aspect.split("/").map(Number);
    return { w: w * 100, h: h * 100 };
  }, [aspect]);

  const ref = sourceId ? referencesById[sourceId] : undefined;
  const pos = objectPosition ?? (aspect === "3/4" ? "top" : "center");

  return (
    <figure className={cn("my-8 md:my-12", className)}>
      <div className="overflow-hidden rounded-sm border border-sepia-400 shadow-paper">
        <img
          src={src}
          alt={alt}
          width={dims.w}
          height={dims.h}
          loading="lazy"
          decoding="async"
          className="w-full"
          style={{
            aspectRatio: aspect,
            objectFit: "cover",
            objectPosition: pos,
          }}
        />
      </div>
      <figcaption className="mt-2 md:mt-3 font-serif-i italic text-xs md:text-sm text-sepia-600">
        {caption}
        {ref && (
          <>
            {" — "}
            <a
              href={`#ref-${sourceId}`}
              className="underline decoration-dotted hover:text-gold-500 transition-colors"
            >
              {ref.shortLabel}
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
