import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none soft-focus gentle-hover gentle-wobble paper-shadow",
  {
    variants: {
      variant: {
        // Primary button - Soft Amber with White text (from guideline)
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:paper-shadow-lg border border-primary/20",

        // Secondary button - Outlined with Deep Slate text (from guideline)
        secondary:
          "border-2 border-foreground/30 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/50",

        // Success variant - Sage Green
        success:
          "bg-accent text-accent-foreground hover:bg-accent/90 border border-accent/20",

        // Warning/Info variant - Dusty Rose
        warning:
          "bg-destructive text-white hover:bg-destructive/90 border border-destructive/20",

        // Brand variant - Lumi Lavender with soft glow
        brand:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 soft-glow border border-secondary/20",

        // Ghost button - Minimal with gentle hover
        ghost:
          "hover:bg-foreground/5 text-foreground border border-transparent hover:border-foreground/10",

        // Link button - Text only with handwritten feel
        link: "text-primary underline-offset-4 hover:underline bg-transparent border-none shadow-none p-0 h-auto gentle-wobble",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-xs rounded-lg gap-1.5 has-[>svg]:px-2.5",
        default: "h-10 px-4 py-2 text-sm rounded-xl gap-2 has-[>svg]:px-3",
        lg: "h-12 px-6 py-3 text-base rounded-xl gap-2.5 has-[>svg]:px-4",
        icon: "size-10 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
