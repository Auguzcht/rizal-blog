import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/motion/FadeIn";
import { TextReveal } from "@/components/motion/TextReveal";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  full,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative mx-auto w-full max-w-screen-xl px-4 md:px-6 py-20 md:py-40",
        className,
      )}
    >
      {eyebrow && (
        <FadeIn>
          <p className="font-caption text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
            {eyebrow}
          </p>
        </FadeIn>
      )}
      <h2
        id={`${id}-heading`}
        className="font-display text-display-lg md:text-display-xl text-ink-700 mb-12 max-w-[20ch]"
      >
        <TextReveal>{title}</TextReveal>
      </h2>
      {full ? (
        children
      ) : (
        <div className="prose-rizal max-w-[65ch]">{children}</div>
      )}
    </section>
  );
}
