import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Maximize, Minimize, Music, ListMusic } from "lucide-react";

interface ToolbarProps {
  isFullScreen: boolean;
  showPlaylistPanel: boolean;
  hasPlaylist: boolean;
  onToggleFullScreen: () => void;
  onTogglePlaylist: () => void;
}

export function Toolbar({
  isFullScreen,
  showPlaylistPanel,
  hasPlaylist,
  onToggleFullScreen,
  onTogglePlaylist,
}: ToolbarProps) {
  return (
    <TooltipProvider>
      {/* Desktop Toolbar - Vertical on the right */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 transition-all duration-300 z-40 hidden md:block ${
          isFullScreen ? "right-2 lg:right-4" : "right-2 lg:right-4 xl:right-6"
        }`}
      >
        <div className="flex flex-col gap-2 p-2 bg-card/80 backdrop-blur-sm border rounded-lg shadow-lg">
          {/* Fullscreen Toggle Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFullScreen}
                className="h-9 w-9 hover:bg-accent transition-colors"
              >
                {isFullScreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
            </TooltipContent>
          </Tooltip>

          {/* Music Playlist Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={showPlaylistPanel ? "default" : "ghost"}
                size="icon"
                onClick={onTogglePlaylist}
                className={`h-9 w-9 transition-colors relative ${
                  showPlaylistPanel
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-accent"
                }`}
              >
                {hasPlaylist ? (
                  <ListMusic className="h-4 w-4" />
                ) : (
                  <Music className="h-4 w-4" />
                )}
                {/* Indicator dot for active playlist */}
                {hasPlaylist && !showPlaylistPanel && (
                  <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-primary rounded-full border border-card" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {showPlaylistPanel
                ? "Close Playlist"
                : hasPlaylist
                ? "Open Playlist"
                : "Music Playlist"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Toolbar - Horizontal at the bottom */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 z-40 md:hidden ${
          isFullScreen ? "block" : "block"
        }`}
      >
        <div className="flex gap-3 p-3 bg-card/90 backdrop-blur-md border rounded-2xl shadow-xl">
          {/* Music Playlist Button */}
          <Button
            variant={showPlaylistPanel ? "default" : "ghost"}
            size="icon"
            onClick={onTogglePlaylist}
            className={`h-12 w-12 transition-colors relative rounded-xl ${
              showPlaylistPanel
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent"
            }`}
          >
            {hasPlaylist ? (
              <ListMusic className="h-5 w-5" />
            ) : (
              <Music className="h-5 w-5" />
            )}
            {/* Indicator dot for active playlist */}
            {hasPlaylist && !showPlaylistPanel && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-card" />
            )}
          </Button>

          {/* Fullscreen Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFullScreen}
            className="h-12 w-12 hover:bg-accent transition-colors rounded-xl"
          >
            {isFullScreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
