import { cn } from "@/lib/cn";

type CardProps = React.ComponentProps<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-sepia-400 bg-parchment-100 shadow-paper",
        className,
      )}
      {...props}
    />
  );
}

type CardHeaderProps = React.ComponentProps<"div">;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("p-6 pb-0", className)} {...props} />;
}

type CardTitleProps = React.ComponentProps<"h3">;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("font-display text-display-lg text-ink-700", className)}
      {...props}
    />
  );
}

type CardContentProps = React.ComponentProps<"div">;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-4", className)} {...props} />;
}

type CardFooterProps = React.ComponentProps<"div">;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0 gap-4", className)}
      {...props}
    />
  );
}
