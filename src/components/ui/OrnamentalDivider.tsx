import { cn } from "@/lib/cn";

type OrnamentalDividerProps = {
  className?: string;
};

export function OrnamentalDivider({ className }: OrnamentalDividerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 md:gap-6 py-4 md:py-8",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-gradient-to-l from-sepia-400/50 to-transparent" />
      <span className="font-script text-xl md:text-3xl text-sepia-400 select-none shrink-0">
        ❦
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-sepia-400/50 to-transparent" />
    </div>
  );
}
