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
      <div
        className={`fixed top-1/2 -translate-y-1/2 transition-all duration-300 z-40 ${
          isFullScreen ? "right-2 sm:right-4" : "right-2 sm:right-4 md:right-6"
        } ${isFullScreen ? "block" : "hidden sm:block"}`}
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
    </TooltipProvider>
  );
}
