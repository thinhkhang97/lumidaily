"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { MusicTrack } from "@/lib/types";
import { MusicService, extractVideoId } from "@/lib/services/MusicService";

// YouTube API types
interface YouTubeAPI {
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
}

// Music player controls interface
interface MusicPlayerControls {
  playPause: () => void;
  handleVolumeChange: (volume: number) => void;
  handleProgressChange: (progress: number) => void;
  handlePreviousTrack: () => void;
  handleNextTrack: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isPlaying: boolean;
  progress: number;
  volume: number;
}

// Extend window interface
declare global {
  interface Window {
    YT: YouTubeAPI;
    musicPlayerControls: MusicPlayerControls;
  }
}

interface MusicPlayerProps {
  volume?: number;
  currentTrack: MusicTrack | null;
  onTrackChange: (track: MusicTrack | null) => void;
  onPlayStateChange: (isPlaying: boolean) => void;
  onTrackDetailsUpdate: (
    trackId: string,
    details: { title?: string; duration?: number }
  ) => void;
  onVolumeChange?: (volume: number) => void;
  onProgressChange?: (progress: number) => void;
}

export function MusicPlayer({
  volume = 50,
  currentTrack,
  onTrackChange,
  onPlayStateChange,
  onTrackDetailsUpdate,
  onVolumeChange,
  onProgressChange,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentVolume, setCurrentVolume] = useState<number>(volume);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isUserSeeking = useRef<boolean>(false);

  // YouTube player options
  const playerOptions = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      enablejsapi: 1,
    },
  };

  // Update volume when prop changes
  useEffect(() => {
    if (currentVolume !== volume) {
      setCurrentVolume(volume);
      if (playerRef.current) {
        playerRef.current.setVolume(volume);
      }
    }
  }, [volume, currentVolume]);

  // Progress tracking
  const startProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && !isUserSeeking.current) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const totalDuration = playerRef.current.getDuration();

          if (totalDuration > 0) {
            const newProgress = (currentTime / totalDuration) * 100;
            setProgress(newProgress);
            onProgressChange?.(newProgress);
          }
        } catch (error) {
          console.error("Error getting player time:", error);
        }
      }
    }, 1000);
  }, [onProgressChange]);

  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // YouTube player event handlers
  const onPlayerReady = useCallback(
    (event: YouTubeEvent) => {
      playerRef.current = event.target;
      playerRef.current.setVolume(currentVolume);

      // Get video duration and title
      try {
        const videoDuration = playerRef.current.getDuration();
        const videoData = playerRef.current.getVideoData();

        if (currentTrack && videoDuration > 0) {
          setDuration(videoDuration);
          onTrackDetailsUpdate(currentTrack.id, {
            title: videoData.title || currentTrack.title,
            duration: videoDuration,
          });
        }
      } catch (error) {
        console.error("Error getting video details:", error);
      }
    },
    [currentTrack, currentVolume, onTrackDetailsUpdate]
  );

  const onPlayerStateChange = useCallback(
    (event: YouTubeEvent) => {
      const state = event.data;
      const YT = window.YT;

      if (!YT) return;

      switch (state) {
        case YT.PlayerState.PLAYING:
          setIsPlaying(true);
          onPlayStateChange(true);
          startProgressTracking();
          break;
        case YT.PlayerState.PAUSED:
          setIsPlaying(false);
          onPlayStateChange(false);
          stopProgressTracking();
          break;
        case YT.PlayerState.ENDED:
          setIsPlaying(false);
          onPlayStateChange(false);
          stopProgressTracking();
          // Auto-play next track if available
          handleNextTrack();
          break;
        default:
          break;
      }
    },
    [onPlayStateChange, startProgressTracking, stopProgressTracking]
  );

  // Control functions
  const playPause = useCallback(() => {
    if (!playerRef.current) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error("Error controlling playback:", error);
    }
  }, [isPlaying]);

  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      setCurrentVolume(newVolume);
      if (playerRef.current) {
        playerRef.current.setVolume(newVolume);
      }
      onVolumeChange?.(newVolume);
    },
    [onVolumeChange]
  );

  const handleProgressChange = useCallback(
    (newProgress: number) => {
      if (!playerRef.current || !duration) return;

      isUserSeeking.current = true;
      const seekTime = (newProgress / 100) * duration;

      try {
        playerRef.current.seekTo(seekTime, true);
        setProgress(newProgress);

        // Resume progress tracking after a short delay
        setTimeout(() => {
          isUserSeeking.current = false;
        }, 500);
      } catch (error) {
        console.error("Error seeking:", error);
        isUserSeeking.current = false;
      }
    },
    [duration]
  );

  const handlePreviousTrack = useCallback(() => {
    const playlist = MusicService.getPlaylistFromLocalStorage();
    const currentIndex = playlist.tracks.findIndex(
      (track) => track.id === currentTrack?.id
    );

    if (currentIndex > 0) {
      const previousTrack = playlist.tracks[currentIndex - 1];
      MusicService.updateCurrentTrack(previousTrack.id);
      onTrackChange(previousTrack);
    }
  }, [currentTrack, onTrackChange]);

  const handleNextTrack = useCallback(() => {
    const playlist = MusicService.getPlaylistFromLocalStorage();
    const currentIndex = playlist.tracks.findIndex(
      (track) => track.id === currentTrack?.id
    );

    if (currentIndex < playlist.tracks.length - 1) {
      const nextTrack = playlist.tracks[currentIndex + 1];
      MusicService.updateCurrentTrack(nextTrack.id);
      onTrackChange(nextTrack);
    }
  }, [currentTrack, onTrackChange]);

  // Navigation helpers
  const canGoPrevious = useCallback(() => {
    const playlist = MusicService.getPlaylistFromLocalStorage();
    const currentIndex = playlist.tracks.findIndex(
      (track) => track.id === currentTrack?.id
    );
    return currentIndex > 0;
  }, [currentTrack]);

  const canGoNext = useCallback(() => {
    const playlist = MusicService.getPlaylistFromLocalStorage();
    const currentIndex = playlist.tracks.findIndex(
      (track) => track.id === currentTrack?.id
    );
    return currentIndex < playlist.tracks.length - 1;
  }, [currentTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopProgressTracking();
    };
  }, [stopProgressTracking]);

  // Reset progress when track changes
  useEffect(() => {
    setProgress(0);
    setDuration(0);
    stopProgressTracking();
  }, [currentTrack?.id, stopProgressTracking]);

  // Expose control functions to parent
  useEffect(() => {
    // Store control functions in a way that parent can access them
    window.musicPlayerControls = {
      playPause,
      handleVolumeChange,
      handleProgressChange,
      handlePreviousTrack,
      handleNextTrack,
      canGoPrevious: canGoPrevious(),
      canGoNext: canGoNext(),
      isPlaying,
      progress,
      volume: currentVolume,
    };
  }, [
    playPause,
    handleVolumeChange,
    handleProgressChange,
    handlePreviousTrack,
    handleNextTrack,
    canGoPrevious,
    canGoNext,
    isPlaying,
    progress,
    currentVolume,
  ]);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="hidden">
      <YouTube
        key={currentTrack.id}
        videoId={extractVideoId(currentTrack.url) || ""}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
      />
    </div>
  );
}
