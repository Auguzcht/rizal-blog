import { cn } from "@/lib/cn";

type PullQuoteProps = {
  children: React.ReactNode;
  author?: string;
  source?: string;
  sourceId?: string;
  className?: string;
};

export function PullQuote({
  children,
  author,
  source,
  sourceId,
  className,
}: PullQuoteProps) {
  return (
    <figure className={cn("my-16 text-center", className)}>
      <svg
        className="mx-auto mb-4 h-8 w-8 text-sepia-400"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
      </svg>
      <blockquote className="font-serif-i italic text-display-lg md:text-display-xl text-sepia-600 leading-relaxed max-w-[30ch] mx-auto">
        {children}
      </blockquote>
      {author && (
        <figcaption className="mt-6 font-display text-body text-ink-700">
          — {author}
          {source && (
            <cite className="block font-serif-i italic text-body text-sepia-600 mt-1 not-italic">
              {source}
              {sourceId && (
                <a
                  href={`#ref-${sourceId}`}
                  className="ml-2 text-gold-500 hover:text-blood-600 transition-colors no-underline text-sm"
                >
                  [{sourceId}]
                </a>
              )}
            </cite>
          )}
        </figcaption>
      )}
    </figure>
  );
}
