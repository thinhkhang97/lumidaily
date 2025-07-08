"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  X,
  Plus,
  Play,
  Pause,
  Trash2,
  Music,
  ExternalLink,
} from "lucide-react";
import { MusicTrack, Playlist } from "@/lib/types";
import { MusicService } from "@/lib/services/MusicService";

interface PlaylistPanelProps {
  isOpen: boolean;
  currentTrack: MusicTrack | null;
  isMusicPlaying: boolean;
  onClose: () => void;
  onTrackSelect: (track: MusicTrack) => void;
  onPlayPause: () => void;
  onAddTrack: (url: string) => void;
}

export function PlaylistPanel({
  isOpen,
  currentTrack,
  isMusicPlaying,
  onClose,
  onTrackSelect,
  onPlayPause,
  onAddTrack,
}: PlaylistPanelProps) {
  const [playlist, setPlaylist] = useState<Playlist>(
    MusicService.getPlaylistFromLocalStorage()
  );
  const [newTrackUrl, setNewTrackUrl] = useState("");
  const [isAddingTrack, setIsAddingTrack] = useState(false);

  // Update playlist when component opens or localStorage changes
  useEffect(() => {
    if (isOpen) {
      setPlaylist(MusicService.getPlaylistFromLocalStorage());
    }
  }, [isOpen]);

  // Listen for storage changes (if multiple tabs are open)
  useEffect(() => {
    const handleStorageChange = () => {
      setPlaylist(MusicService.getPlaylistFromLocalStorage());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAddTrack = async () => {
    if (!newTrackUrl.trim()) return;

    setIsAddingTrack(true);
    try {
      await onAddTrack(newTrackUrl.trim());
      setNewTrackUrl("");
      // Refresh playlist after adding
      setPlaylist(MusicService.getPlaylistFromLocalStorage());
    } catch (error) {
      console.error("Error adding track:", error);
    } finally {
      setIsAddingTrack(false);
    }
  };

  const handleRemoveTrack = (trackId: string) => {
    MusicService.removeTrackFromPlaylist(trackId);
    setPlaylist(MusicService.getPlaylistFromLocalStorage());
  };

  const handleTrackClick = (track: MusicTrack) => {
    onTrackSelect(track);
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const isCurrentTrack = (track: MusicTrack) => {
    return currentTrack?.id === track.id;
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      {/* Panel - Full width on mobile, sidebar on desktop */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-card border-l shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-4 border-b bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Music className="h-5 w-5 sm:h-5 sm:w-5" />
              <h2 className="text-lg sm:text-lg font-semibold">
                Music Playlist
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 sm:h-8 sm:w-8 rounded-lg"
            >
              <X className="h-5 w-5 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {/* Add Track Section */}
          <div className="p-4 sm:p-4 border-b space-y-3 bg-card/30">
            <div className="flex gap-3 sm:gap-2">
              <Input
                type="text"
                placeholder="Enter YouTube URL"
                value={newTrackUrl}
                onChange={(e) => setNewTrackUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTrack()}
                className="flex-1 h-12 sm:h-10 text-base sm:text-sm"
                disabled={isAddingTrack}
              />
              <Button
                onClick={handleAddTrack}
                size="icon"
                disabled={!newTrackUrl.trim() || isAddingTrack}
                className="h-12 w-12 sm:h-10 sm:w-10 rounded-xl sm:rounded-lg shrink-0"
              >
                {isAddingTrack ? (
                  <div className="h-5 w-5 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
                ) : (
                  <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs sm:text-xs text-muted-foreground">
              Add YouTube music videos to your playlist
            </p>
          </div>

          {/* Playlist */}
          <div className="flex-1 overflow-hidden">
            {playlist.tracks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Music className="h-16 w-16 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl sm:text-lg font-medium mb-2">
                  No music yet
                </h3>
                <p className="text-base sm:text-sm text-muted-foreground max-w-xs">
                  Add your first YouTube music video to start building your
                  playlist
                </p>
              </div>
            ) : (
              <div className="h-full overflow-y-auto">
                <div className="p-3 sm:p-2 space-y-2 sm:space-y-1">
                  {playlist.tracks.map((track) => (
                    <div
                      key={track.id}
                      className={`group relative p-4 sm:p-3 rounded-xl sm:rounded-lg border transition-all cursor-pointer hover:bg-accent/50 ${
                        isCurrentTrack(track)
                          ? "bg-primary/10 border-primary/30"
                          : "bg-card hover:border-accent"
                      }`}
                      onClick={() => handleTrackClick(track)}
                    >
                      <div className="flex items-center gap-4 sm:gap-3">
                        {/* Play/Pause Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-xl sm:rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isCurrentTrack(track)) {
                              onPlayPause();
                            } else {
                              handleTrackClick(track);
                            }
                          }}
                        >
                          {isCurrentTrack(track) && isMusicPlaying ? (
                            <Pause className="h-5 w-5 sm:h-4 sm:w-4" />
                          ) : (
                            <Play className="h-5 w-5 sm:h-4 sm:w-4" />
                          )}
                        </Button>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm sm:text-sm font-medium truncate leading-snug">
                                {track.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                {track.duration && (
                                  <span className="text-xs text-muted-foreground">
                                    {formatDuration(track.duration)}
                                  </span>
                                )}
                                {isCurrentTrack(track) && (
                                  <span className="text-xs text-primary font-medium">
                                    Now Playing
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1 sm:gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 sm:h-7 sm:w-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(track.url, "_blank");
                            }}
                            title="Open in YouTube"
                          >
                            <ExternalLink className="h-4 w-4 sm:h-3 sm:w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 sm:h-7 sm:w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive rounded-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTrack(track.id);
                            }}
                            title="Remove track"
                          >
                            <Trash2 className="h-4 w-4 sm:h-3 sm:w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
