import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Text and placeholder styling - using original text colors
        "text-foreground placeholder:text-muted-foreground",
        "selection:bg-[#D8BFD8] selection:text-foreground",

        // Paper-inspired styling - only bottom border
        "bg-transparent border-0 border-b-2 border-[#6A6A6A]/40 rounded-none",
        "font-['Patrick_Hand',_cursive]",

        // Dimensions and spacing
        "flex h-10 w-full min-w-0 px-2 py-2 text-base",

        // Animations and transitions
        "transition-all duration-200 ease-out outline-none",

        // Focus state - only highlight bottom border
        "focus:border-b-2 focus:border-[#E89A4F]",

        // Hover state
        "hover:border-[#6A6A6A]/60",

        // File input styling
        "file:inline-flex file:h-8 file:border-0 file:bg-transparent",
        "file:text-sm file:font-['Patrick_Hand',_cursive] file:text-foreground",

        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:border-muted-foreground/20",

        // Responsive text size
        "md:text-sm",

        className
      )}
      {...props}
    />
  );
}

export { Input };
