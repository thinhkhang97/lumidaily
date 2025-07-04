"use client";

import { Clock, BarChart2, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppNavbar() {
  return (
    <div className="border-b border-border/30 paper-shadow">
      <div className="container mx-auto flex h-16 items-center justify-between p-grid-2">
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-xl">LumiDaily</h1>
          <div className="text-xs text-secondary">Lumi is here to help!</div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Tasks">
            <Clock className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Insights">
            <BarChart2 className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="User profile">
            <User className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
