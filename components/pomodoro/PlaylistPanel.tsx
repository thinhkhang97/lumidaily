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
  Volume2,
  VolumeX,
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

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-card border-l shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Music Playlist</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Add Track Section */}
          <div className="p-4 border-b space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter YouTube URL"
                value={newTrackUrl}
                onChange={(e) => setNewTrackUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTrack()}
                className="flex-1"
                disabled={isAddingTrack}
              />
              <Button
                onClick={handleAddTrack}
                size="sm"
                disabled={!newTrackUrl.trim() || isAddingTrack}
                className="px-3"
              >
                {isAddingTrack ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Add YouTube music videos to your playlist
            </p>
          </div>

          {/* Playlist */}
          <div className="flex-1 overflow-hidden">
            {playlist.tracks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Music className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No music yet</h3>
                <p className="text-sm text-muted-foreground">
                  Add your first YouTube music video to start building your
                  playlist
                </p>
              </div>
            ) : (
              <div className="h-full overflow-y-auto">
                <div className="p-2 space-y-1">
                  {playlist.tracks.map((track) => (
                    <div
                      key={track.id}
                      className={`group relative p-3 rounded-lg border transition-all cursor-pointer hover:bg-accent/50 ${
                        isCurrentTrack(track)
                          ? "bg-primary/10 border-primary/30"
                          : "bg-card hover:border-accent"
                      }`}
                      onClick={() => handleTrackClick(track)}
                    >
                      <div className="flex items-center gap-3">
                        {/* Play/Pause Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
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
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium truncate">
                              {track.title}
                            </h4>
                            {isCurrentTrack(track) && (
                              <div className="flex items-center">
                                {isMusicPlaying ? (
                                  <Volume2 className="h-3 w-3 text-primary" />
                                ) : (
                                  <VolumeX className="h-3 w-3 text-muted-foreground" />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {track.duration && (
                              <span className="text-xs text-muted-foreground">
                                {formatDuration(track.duration)}
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              Added{" "}
                              {new Date(track.addedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(track.url, "_blank");
                            }}
                            title="Open in YouTube"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTrack(track.id);
                            }}
                            title="Remove from playlist"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {playlist.tracks.length > 0 && (
            <div className="p-4 border-t bg-muted/30">
              <div className="text-center text-sm text-muted-foreground">
                {playlist.tracks.length} track
                {playlist.tracks.length !== 1 ? "s" : ""} in playlist
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
