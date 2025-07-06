import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FullScreenElement, FullScreenDocument } from "./types";

interface FullScreenManagerProps {
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
  children: React.ReactNode;
}

export function FullScreenManager({
  isFullScreen,
  setIsFullScreen,
  children,
}: FullScreenManagerProps) {
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press to exit full-screen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        exitFullScreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen]);

  const exitFullScreen = () => {
    const doc = document as FullScreenDocument;
    if (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement
    ) {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
    setIsFullScreen(false);
  };

  return (
    <div
      ref={fullScreenContainerRef}
      className={`flex flex-col items-center justify-center ${
        isFullScreen ? "fixed inset-0 bg-background z-50" : ""
      }`}
    >
      {isFullScreen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={exitFullScreen}
        >
          <X className="h-6 w-6" />
        </Button>
      )}
      {children}
    </div>
  );
}

// Export utility functions for parent components to use
export function useFullScreen() {
  const enterFullScreen = (element: FullScreenElement) => {
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      return true;
    }
    return false;
  };

  return { enterFullScreen };
}
