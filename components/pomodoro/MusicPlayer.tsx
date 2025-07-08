"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { MusicTrack } from "@/lib/types";
import { MusicService, extractVideoId } from "@/lib/services/MusicService";

interface MusicPlayerProps {
  volume?: number;
  currentTrack: MusicTrack | null;
  onTrackChange: (track: MusicTrack | null) => void;
  onPlayStateChange: (isPlaying: boolean) => void;
  onTrackDetailsUpdate: (
    trackId: string,
    details: { title?: string; duration?: number }
  ) => void;
}

export function MusicPlayer({
  volume = 50,
  currentTrack,
  onTrackChange,
  onPlayStateChange,
  onTrackDetailsUpdate,
}: MusicPlayerProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [musicVolume, setMusicVolume] = useState<number>(volume);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const youtubeRef = useRef<YouTubePlayer | null>(null);
  const timeUpdateInterval = useRef<NodeJS.Timeout | null>(null);

  // YouTube player options
  const youtubeOpts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      enablejsapi: 1,
      origin: typeof window !== "undefined" ? window.location.origin : "",
      host: "https://www.youtube-nocookie.com",
    },
  };

  // Update volume when prop changes
  useEffect(() => {
    setMusicVolume(volume);
    if (youtubeRef.current) {
      youtubeRef.current.setVolume(volume);
    }
  }, [volume]);

  // YouTube player event handlers
  const onPlayerReady = (event: YouTubeEvent) => {
    youtubeRef.current = event.target;
    youtubeRef.current.setVolume(musicVolume);
    setIsMusicPlaying(true);

    // Get video duration and title
    const videoDuration = youtubeRef.current.getDuration();
    const videoTitle = youtubeRef.current.getVideoData()?.title || "";

    setDuration(videoDuration || 0);
    setCurrentTime(0);

    // Update track details in service if we have a current track
    if (currentTrack && videoTitle) {
      onTrackDetailsUpdate(currentTrack.id, {
        title: videoTitle,
        duration: videoDuration || undefined,
      });
      MusicService.updateTrackDetails(currentTrack.id, {
        title: videoTitle,
        duration: videoDuration || undefined,
      });
    }

    // Notify parent of play state change
    onPlayStateChange(true);

    // Start time update interval
    startTimeUpdateInterval();
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    // YouTube state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (event.data === 0) {
      // Video ended - play next track
      handleNextTrack();
    } else if (event.data === 1) {
      // Video started playing
      setIsMusicPlaying(true);
      onPlayStateChange(true);

      // Update duration now that it's definitely available
      if (youtubeRef.current) {
        const videoDuration = youtubeRef.current.getDuration();
        if (videoDuration && videoDuration > 0) {
          setDuration(videoDuration);

          // Update track details if changed
          if (currentTrack && videoDuration !== currentTrack.duration) {
            onTrackDetailsUpdate(currentTrack.id, { duration: videoDuration });
            MusicService.updateTrackDetails(currentTrack.id, {
              duration: videoDuration,
            });
          }
        }
      }
    } else if (event.data === 2) {
      // Video paused
      setIsMusicPlaying(false);
      onPlayStateChange(false);
    }
  };

  // Define startTimeUpdateInterval with useCallback
  const startTimeUpdateInterval = useCallback(() => {
    // Clear any existing interval
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
    }

    // Set new interval to update current time
    timeUpdateInterval.current = setInterval(() => {
      if (
        youtubeRef.current &&
        typeof youtubeRef.current.getPlayerState === "function"
      ) {
        try {
          // Only update time if player is actually playing (state 1)
          const playerState = youtubeRef.current.getPlayerState();
          if (playerState === 1) {
            const currentTime = youtubeRef.current.getCurrentTime() || 0;
            if (!isNaN(currentTime)) {
              setCurrentTime(currentTime);
            }

            // Also check duration in case it wasn't properly set earlier
            const videoDuration = youtubeRef.current.getDuration();
            if (
              !isNaN(videoDuration) &&
              videoDuration > 0 &&
              videoDuration !== duration
            ) {
              setDuration(videoDuration);
            }
          }
        } catch (err) {
          console.error("Error in time update interval:", err);
        }
      }
    }, 500); // Update more frequently for smoother updates
  }, [duration]);

  // Use callback for interval cleanup to avoid potential memory leaks
  const cleanupTimeInterval = useCallback(() => {
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
      timeUpdateInterval.current = null;
    }
  }, []);

  useEffect(() => {
    // Clean up interval on component unmount
    return cleanupTimeInterval;
  }, [cleanupTimeInterval]);

  // Restart interval when play state changes
  useEffect(() => {
    if (isMusicPlaying) {
      startTimeUpdateInterval();
    } else {
      cleanupTimeInterval();
    }
  }, [isMusicPlaying, cleanupTimeInterval, startTimeUpdateInterval]);

  // Public methods for parent components to control playback
  const togglePlayback = useCallback(() => {
    if (youtubeRef.current) {
      if (isMusicPlaying) {
        youtubeRef.current.pauseVideo();
      } else {
        youtubeRef.current.playVideo();
      }
    }
  }, [isMusicPlaying]);

  const setVolume = useCallback((newVolume: number) => {
    setMusicVolume(newVolume);
    if (youtubeRef.current) {
      youtubeRef.current.setVolume(newVolume);
    }
  }, []);

  const seekTo = useCallback((timeInSeconds: number) => {
    if (youtubeRef.current) {
      youtubeRef.current.seekTo(timeInSeconds, true);
      setCurrentTime(timeInSeconds);
    }
  }, []);

  const handleNextTrack = useCallback(() => {
    const nextTrack = MusicService.getNextTrack();
    if (nextTrack) {
      MusicService.updateCurrentTrack(nextTrack.id);
      onTrackChange(nextTrack);
    }
  }, [onTrackChange]);

  const handlePreviousTrack = useCallback(() => {
    const previousTrack = MusicService.getPreviousTrack();
    if (previousTrack) {
      MusicService.updateCurrentTrack(previousTrack.id);
      onTrackChange(previousTrack);
    }
  }, [onTrackChange]);

  const loadTrack = useCallback(
    (track: MusicTrack) => {
      // Reset state for new track
      setCurrentTime(0);
      setDuration(track.duration || 0);

      // Update current track in service
      MusicService.updateCurrentTrack(track.id);
      onTrackChange(track);
    },
    [onTrackChange]
  );

  const addTrack = useCallback(
    async (url: string) => {
      try {
        // Extract video ID to get basic info
        const videoId = extractVideoId(url);
        if (!videoId) {
          throw new Error("Invalid YouTube URL");
        }

        // Add track to service (will get title from YouTube when loaded)
        const newTrack = MusicService.addTrackToPlaylist(url);
        if (newTrack) {
          // If this is the first track, start playing it
          const playlist = MusicService.getPlaylistFromLocalStorage();
          if (playlist.tracks.length === 1) {
            loadTrack(newTrack);
          }
          return newTrack;
        }

        return null;
      } catch (error) {
        console.error("Error adding track:", error);
        return null;
      }
    },
    [loadTrack]
  );

  // Expose methods to parent via ref or callbacks
  useEffect(() => {
    // You can extend this to expose methods if needed
  }, []);

  return (
    <div className="hidden">
      {/* Hidden YouTube Music Player */}
      {currentTrack && (
        <YouTube
          videoId={currentTrack.videoId}
          opts={youtubeOpts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      )}
    </div>
  );
}

// Export additional control functions that parent components can use
export const useMusicPlayerControls = () => {
  return {
    togglePlayback: () => {
      // This would be handled by the parent component
    },
    nextTrack: () => {
      const nextTrack = MusicService.getNextTrack();
      if (nextTrack) {
        MusicService.updateCurrentTrack(nextTrack.id);
        return nextTrack;
      }
      return null;
    },
    previousTrack: () => {
      const previousTrack = MusicService.getPreviousTrack();
      if (previousTrack) {
        MusicService.updateCurrentTrack(previousTrack.id);
        return previousTrack;
      }
      return null;
    },
    getCurrentTrack: () => {
      return MusicService.getCurrentTrack();
    },
    addTrackFromUrl: (url: string) => {
      return MusicService.addTrackToPlaylist(url);
    },
  };
};
