"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: "default" | "lavender" | "amber" | "sage" | "cream";
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-variant={variant}
      className={cn("flex flex-col gap-grid-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-background/50 text-muted-foreground inline-flex h-11 w-fit items-center justify-center rounded-xl p-1 group paper-texture paper-shadow gentle-hover",
        // Variants using design system variables
        "[.group[data-variant=lavender]_&]:bg-background/80",
        "[.group[data-variant=amber]_&]:bg-background/80",
        "[.group[data-variant=sage]_&]:bg-background/80",
        "[.group[data-variant=cream]_&]:bg-card/80",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background data-[state=active]:text-foreground soft-focus text-foreground",
        "inline-flex h-[calc(100%-2px)] flex-1 items-center justify-center gap-grid-1 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap",
        "transition-all duration-200 ease-out outline-none gentle-hover gentle-wobble",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "hover:bg-background/50 data-[state=active]:paper-shadow",
        // Variants using design system variables
        "[.group[data-variant=lavender]_&[data-state=active]]:bg-secondary [.group[data-variant=lavender]_&[data-state=active]]:text-secondary-foreground [.group[data-variant=lavender]_&[data-state=active]]:soft-glow",
        "[.group[data-variant=amber]_&[data-state=active]]:bg-primary [.group[data-variant=amber]_&[data-state=active]]:text-primary-foreground",
        "[.group[data-variant=sage]_&[data-state=active]]:bg-accent [.group[data-variant=sage]_&[data-state=active]]:text-accent-foreground",
        "[.group[data-variant=cream]_&[data-state=active]]:bg-card [.group[data-variant=cream]_&[data-state=active]]:text-card-foreground",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none soft-fade-in space-grid-3 mt-grid-2",
        // Subtle borders using design system variables
        "[.group[data-variant=lavender]_&]:border-secondary/20",
        "[.group[data-variant=amber]_&]:border-primary/20",
        "[.group[data-variant=sage]_&]:border-accent/20",
        "[.group[data-variant=cream]_&]:border-card/20",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
