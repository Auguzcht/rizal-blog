import { cn } from "@/lib/cn";

type OrnamentalDividerProps = {
  className?: string;
};

export function OrnamentalDivider({ className }: OrnamentalDividerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center py-8",
        className,
      )}
      aria-hidden="true"
    >
      <span className="font-script text-3xl text-sepia-400 select-none">
        ❦
      </span>
    </div>
  );
}
