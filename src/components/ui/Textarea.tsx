import { cn } from "@/lib/cn";

type TextareaProps = React.ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-sm border border-sepia-400 bg-parchment-50 px-3 py-2 text-sm text-ink-900 placeholder:text-sepia-600/50 focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:border-gold-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className,
      )}
      {...props}
    />
  );
}
