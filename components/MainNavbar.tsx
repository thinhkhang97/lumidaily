"use client";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/lib/components/ThemeSwitcher";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ConfigDialog } from "@/components/ConfigDialog";

export function MainNavbar() {
  const pathname = usePathname();
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);

  // Determine if we're in the app section
  useEffect(() => {
    setIsLandingPage(pathname === "/");
  }, [pathname]);

  return (
    <header className="border-b border-border/30 paper-shadow">
      <div className="container mx-auto flex h-16 items-center justify-between p-grid-2">
        {/* Left side */}
        <div className="flex items-center gap-grid-3">
          <Link
            href="/"
            className="font-heading text-xl font-normal gentle-hover gentle-wobble"
          >
            LumiDaily
          </Link>

          {/* Conditional navigation */}
          <nav className="flex space-x-6">
            <Link
              href="/"
              className={`hover:text-primary transition-colors duration-200 ease-out ${
                pathname === "/" ? "text-primary" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/app"
              className={`hover:text-primary transition-colors duration-200 ease-out ${
                pathname.startsWith("/app") ? "text-primary" : ""
              }`}
            >
              App
            </Link>

            {/* Only show Insights link in app pages */}
            {/* {!isLandingPage && (
              <Link
                href="/insights"
                className={`hover:text-primary transition-colors duration-200 ease-out ${
                  pathname === "/insights" ? "text-primary" : ""
                }`}
              >
                Insights
              </Link>
            )} */}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Only show these buttons in app pages */}
          {!isLandingPage && (
            <>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Settings"
                onClick={() => setConfigDialogOpen(true)}
              >
                <Settings className="size-5" />
              </Button>
              {/* <Button variant="ghost" size="icon" aria-label="User profile">
                <User className="size-5" />
              </Button> */}
            </>
          )}

          {/* Theme switcher always visible */}
          <ThemeSwitcher />
        </div>
      </div>

      {/* Configuration Dialog */}
      <ConfigDialog
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
      />
    </header>
  );
}
