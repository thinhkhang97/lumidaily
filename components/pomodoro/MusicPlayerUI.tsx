"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ExternalLink,
} from "lucide-react";
import { MusicTrack } from "@/lib/types";

interface MusicPlayerUIProps {
  currentTrack: MusicTrack | null;
  isMusicPlaying: boolean;
  volume: number;
  progress: number; // 0-100
  onPlayPause: () => void;
  onPreviousTrack: () => void;
  onNextTrack: () => void;
  onVolumeChange: (volume: number) => void;
  onProgressChange: (progress: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function MusicPlayerUI({
  currentTrack,
  isMusicPlaying,
  volume,
  progress,
  onPlayPause,
  onPreviousTrack,
  onNextTrack,
  onVolumeChange,
  onProgressChange,
  canGoPrevious,
  canGoNext,
}: MusicPlayerUIProps) {
  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const currentTime = currentTrack.duration
    ? (progress / 100) * currentTrack.duration
    : 0;
  const totalTime = currentTrack.duration || 0;

  return (
    <Card className="w-full max-w-lg mx-auto p-4 sm:p-6 bg-card/50 backdrop-blur-sm mb-6 sm:mb-8">
      <div className="space-y-4">
        {/* Track Info */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h3 className="font-medium text-sm sm:text-base truncate flex-1 min-w-0">
              {currentTrack.title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-6 sm:w-6 shrink-0 rounded-lg"
              onClick={() => window.open(currentTrack.url, "_blank")}
              title="Open in YouTube"
            >
              <ExternalLink className="h-4 w-4 sm:h-3 sm:w-3" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[progress]}
            onValueChange={(value) => onProgressChange(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        {/* Controls Section - Responsive Layout */}
        <div className="space-y-4">
          {/* Playback Controls - Always centered */}
          <div className="flex items-center justify-center gap-3 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 sm:h-8 sm:w-8 rounded-xl"
              onClick={onPreviousTrack}
              disabled={!canGoPrevious}
            >
              <SkipBack className="h-5 w-5 sm:h-4 sm:w-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 sm:h-10 sm:w-10 rounded-xl"
              onClick={onPlayPause}
            >
              {isMusicPlaying ? (
                <Pause className="h-5 w-5 sm:h-4 sm:w-4" />
              ) : (
                <Play className="h-5 w-5 sm:h-4 sm:w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 sm:h-8 sm:w-8 rounded-xl"
              onClick={onNextTrack}
              disabled={!canGoNext}
            >
              <SkipForward className="h-5 w-5 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {/* Volume Control - Full width on mobile, inline on desktop */}
          <div className="flex items-center gap-3 sm:justify-center">
            <Volume2 className="h-4 w-4 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 sm:w-32 sm:flex-none">
              <Slider
                value={[volume]}
                onValueChange={(value) => onVolumeChange(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <span className="text-xs sm:text-xs text-muted-foreground w-10 text-right shrink-0">
              {volume}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
