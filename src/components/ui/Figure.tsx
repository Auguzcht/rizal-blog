import { cn } from "@/lib/cn";
import { useMemo } from "react";

type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  sourceId?: string;
  aspect?: "4/3" | "3/2" | "16/9" | "1/1";
  className?: string;
};

export function Figure({
  src,
  alt,
  caption,
  sourceId,
  aspect = "4/3",
  className,
}: FigureProps) {
  // Prevent layout shift by computing intrinsic dimensions from aspect ratio
  const dims = useMemo(() => {
    const [w, h] = aspect.split("/").map(Number);
    return { w: w * 100, h: h * 100 };
  }, [aspect]);

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
          className="w-full h-auto object-cover"
          style={{ aspectRatio: aspect }}
        />
      </div>
      <figcaption className="mt-2 md:mt-3 font-serif-i italic text-xs md:text-sm text-sepia-600">
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
