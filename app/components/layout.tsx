import React from "react";
import Link from "next/link";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link
              className="mr-6 flex items-center space-x-2 font-bold"
              href="/"
            >
              <span>DailyPomo</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                className="transition-colors hover:text-foreground/80"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-foreground transition-colors hover:text-foreground/80"
                href="/components"
              >
                Components
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
