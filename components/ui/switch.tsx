"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted/50",
        "data-[state=unchecked]:border-2 data-[state=unchecked]:border-foreground/30",
        "soft-focus inline-flex h-6 w-11 shrink-0 items-center rounded-full",
        "transition-all duration-200 ease-out outline-none gentle-hover",
        "hover:data-[state=unchecked]:bg-muted/70 hover:data-[state=unchecked]:border-foreground/50",
        "paper-shadow data-[state=checked]:paper-shadow-lg",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background data-[state=checked]:bg-primary-foreground",
          "pointer-events-none block size-5 rounded-full paper-shadow",
          "transition-all duration-200 ease-out",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
