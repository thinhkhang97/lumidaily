import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
  {
    variants: {
      variant: {
        // Primary button - Soft Amber
        default: "bg-primary text-primary-foreground hover:bg-primary/90",

        // Destructive button - Dusty Rose
        destructive: "bg-destructive text-white hover:bg-destructive/90",

        // Outline button - Border with Soft Amber hover
        outline:
          "border border-input bg-background hover:bg-primary/10 hover:text-primary",

        // Secondary button - Lumi Lavender
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        // Sage button - Sage Green
        sage: "bg-[#B8D1B8] text-[#6A6A6A] hover:bg-[#B8D1B8]/80",

        // Cream button - Parchment Cream
        cream: "bg-[#F8E9D4] text-[#6A6A6A] hover:bg-[#F8E9D4]/80",

        // Ghost button - Transparent with hover effect
        ghost: "hover:bg-muted hover:text-foreground",

        // Link button - Text only with underline on hover
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
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
