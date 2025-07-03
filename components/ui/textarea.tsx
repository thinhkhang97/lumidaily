import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Minimal design with underline - from guideline
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "bg-transparent border-0 border-b-2 border-foreground/20 rounded-none",
        "flex min-h-[80px] w-full resize-vertical px-1 py-2 text-base",
        "transition-all duration-200 ease-out outline-none soft-focus",
        "focus:border-primary focus:bg-background/30",
        "hover:border-foreground/40",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:border-muted-foreground/20",
        "md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
