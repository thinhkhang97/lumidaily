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
    <Card className="w-full max-w-md mx-auto p-4 bg-card/50 backdrop-blur-sm">
      <div className="space-y-4">
        {/* Track Info */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h3 className="font-medium text-base truncate flex-1">
              {currentTrack.title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={() => window.open(currentTrack.url, "_blank")}
              title="Open in YouTube"
            >
              <ExternalLink className="h-3 w-3" />
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
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <span className="w-3/10"></span>
          {/* Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onPreviousTrack}
              disabled={!canGoPrevious}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="h-10 w-10"
              onClick={onPlayPause}
            >
              {isMusicPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onNextTrack}
              disabled={!canGoNext}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-3/10">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={(value) => onVolumeChange(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
