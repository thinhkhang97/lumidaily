"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// This component safely uses useSearchParams inside Suspense
function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
