import { cn } from "@/lib/cn";

type DropCapProps = {
  children: string;
  className?: string;
};

export function DropCap({ children, className }: DropCapProps) {
  return (
    <p className={cn("prose-rizal [&:first-of-type]:[&:first-letter]:float-left [&:first-of-type]:[&:first-letter]:font-display [&:first-of-type]:[&:first-letter]:text-6xl [&:first-of-type]:[&:first-letter]:leading-[0.85] [&:first-of-type]:[&:first-letter]:mr-[0.08em] [&:first-of-type]:[&:first-letter]:mt-[0.06em] [&:first-of-type]:[&:first-letter]:text-ink-700", className)}>
      {children}
    </p>
  );
}
