import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "bg-transparent border-0 border-b-2 border-foreground/20 rounded-none",
        "flex h-10 w-full min-w-0 px-1 py-2 text-base",
        "transition-all duration-200 ease-out outline-none soft-focus",
        "focus:border-primary focus:bg-background/30",
        "hover:border-foreground/40",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:border-muted-foreground/20",
        "md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
