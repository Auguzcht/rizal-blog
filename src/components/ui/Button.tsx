import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ink-700 text-parchment-50 hover:bg-ink-900 shadow-paper",
        secondary: "bg-parchment-100 text-ink-900 hover:bg-parchment-200 border border-sepia-400",
        accent: "bg-gold-500 text-ink-900 hover:bg-gold-500/90 shadow-paper",
        destructive: "bg-blood-600 text-parchment-50 hover:bg-blood-600/90",
        ghost: "text-sepia-600 hover:text-ink-700 hover:bg-parchment-100",
        outline: "border border-sepia-400 bg-transparent text-ink-700 hover:bg-parchment-100",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-5",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
