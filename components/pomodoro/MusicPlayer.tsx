import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Music,
  Pause,
  Play,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { useCallback } from "react";

interface MusicPlayerProps {
  volume?: number;
}

export function MusicPlayer({ volume = 50 }: MusicPlayerProps) {
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [musicVolume, setMusicVolume] = useState<number>(volume);
  const [showMusicControls, setShowMusicControls] = useState<boolean>(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const youtubeRef = useRef<YouTubePlayer | null>(null);
  const timeUpdateInterval = useRef<NodeJS.Timeout | null>(null);

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Handle YouTube URL input
  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  };

  // Load YouTube video
  const handleLoadYoutubeVideo = () => {
    const id = extractVideoId(youtubeUrl);
    if (id) {
      // Add to playlist if not already in it
      if (!playlist.includes(id)) {
        setPlaylist((prev) => [...prev, id]);
        setCurrentIndex(playlist.length);
      } else {
        // If already in playlist, just switch to it
        const index = playlist.indexOf(id);
        setCurrentIndex(index);
      }
      setVideoId(id);
      setYoutubeUrl("");
    }
  };

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
    },
  };

  // YouTube player event handlers
  const onPlayerReady = (event: YouTubeEvent) => {
    youtubeRef.current = event.target;
    youtubeRef.current.setVolume(musicVolume);
    setIsMusicPlaying(true);

    // Get video duration and title
    const videoDuration = youtubeRef.current.getDuration();
    setDuration(videoDuration || 0);
    setVideoTitle(youtubeRef.current.getVideoData()?.title || "");

    // Reset current time
    setCurrentTime(0);

    // Start time update interval
    startTimeUpdateInterval();
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    // YouTube state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (event.data === 0) {
      // Video ended
      handleNextTrack();
    } else if (event.data === 1) {
      // Video started playing
      setIsMusicPlaying(true);
      // Update duration now that it's definitely available
      if (youtubeRef.current) {
        const videoDuration = youtubeRef.current.getDuration();
        if (videoDuration && videoDuration > 0) {
          setDuration(videoDuration);
        }
      }
    } else if (event.data === 2) {
      // Video paused
      setIsMusicPlaying(false);
    }
  };

  const startTimeUpdateInterval = () => {
    // Clear any existing interval
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
    }

    // Set new interval to update current time
    timeUpdateInterval.current = setInterval(() => {
      if (youtubeRef.current && youtubeRef.current.getPlayerState) {
        // Only update time if player is actually playing (state 1)
        const playerState = youtubeRef.current.getPlayerState();
        if (playerState === 1) {
          try {
            const currentTime = youtubeRef.current.getCurrentTime() || 0;
            setCurrentTime(currentTime);
          } catch (err) {
            console.error("Error getting current time:", err);
          }
        }
      }
    }, 500); // Update more frequently for smoother slider movement
  };

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
  }, [isMusicPlaying, cleanupTimeInterval]);

  // When current index changes, load that video
  useEffect(() => {
    if (
      playlist.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < playlist.length
    ) {
      // Reset current time when changing videos
      setCurrentTime(0);
      setVideoId(playlist[currentIndex]);
    }
  }, [currentIndex, playlist]);

  const toggleMusicPlayback = () => {
    if (youtubeRef.current) {
      if (isMusicPlaying) {
        youtubeRef.current.pauseVideo();
      } else {
        youtubeRef.current.playVideo();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setMusicVolume(newVolume);
    if (youtubeRef.current) {
      youtubeRef.current.setVolume(newVolume);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (youtubeRef.current) {
      try {
        youtubeRef.current.seekTo(newTime, true);
      } catch (err) {
        console.error("Error seeking to time:", err);
      }
    }
  };

  const handlePreviousTrack = () => {
    if (playlist.length > 1) {
      // If we're more than 3 seconds into the song, restart it instead of going to previous
      if (currentTime > 3) {
        if (youtubeRef.current) {
          youtubeRef.current.seekTo(0, true);
          setCurrentTime(0);
        }
      } else {
        // Go to previous track
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex > 0 ? prevIndex - 1 : playlist.length - 1;
          return newIndex;
        });
      }
    }
  };

  const handleNextTrack = () => {
    if (playlist.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  };

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor((timeInSeconds || 0) / 60);
    const seconds = Math.floor((timeInSeconds || 0) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="mb-6 w-full max-w-md">
      {/* YouTube Music Player (hidden) */}
      <div className="hidden">
        {videoId && (
          <YouTube
            videoId={videoId}
            opts={youtubeOpts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowMusicControls(!showMusicControls)}
        className="mb-2 w-full flex justify-between items-center gentle-hover"
      >
        <Music className="h-4 w-4 mr-2 text-foreground" />
        <span className="font-patrick-hand">Music Player</span>
        {isMusicPlaying ? (
          <Volume2 className="h-4 w-4 ml-2 text-foreground" />
        ) : (
          <VolumeX className="h-4 w-4 ml-2 text-foreground" />
        )}
      </Button>

      {showMusicControls && (
        <div className="p-grid-2 border rounded-md bg-card paper-texture paper-shadow soft-fade-in">
          <div className="flex gap-grid-1 mb-4">
            <Input
              type="text"
              placeholder="Enter YouTube URL"
              value={youtubeUrl}
              onChange={handleYoutubeUrlChange}
              className="flex-1 font-patrick-hand soft-focus"
            />
            <Button
              onClick={handleLoadYoutubeVideo}
              size="sm"
              className="gentle-hover"
            >
              Load
            </Button>
          </div>

          {videoId && (
            <div className="space-grid-2">
              {/* Video Title */}
              <div className="text-sm font-handlee truncate" title={videoTitle}>
                {videoTitle || "Loading..."}
              </div>

              {/* Time Slider */}
              <div className="space-grid-1">
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={Math.max(duration || 100, 1)}
                    value={Math.min(currentTime || 0, duration || 100)}
                    onChange={handleTimeChange}
                    className="w-full accent-primary"
                    style={{
                      height: "4px",
                      background: `linear-gradient(to right, var(--primary) ${
                        duration > 0
                          ? Math.min((currentTime / duration) * 100, 100)
                          : 0
                      }%, var(--muted) ${
                        duration > 0
                          ? Math.min((currentTime / duration) * 100, 100)
                          : 0
                      }%)`,
                      borderRadius: "2px",
                    }}
                    // Add passive attribute
                    onTouchStart={() => {
                      /* passive by default */
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground font-patrick-hand">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-grid-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePreviousTrack}
                    disabled={playlist.length <= 1}
                    className="gentle-hover"
                  >
                    <SkipBack className="h-4 w-4 text-foreground" />
                  </Button>

                  <Button
                    variant={isMusicPlaying ? "secondary" : "default"}
                    size="sm"
                    onClick={toggleMusicPlayback}
                    className="gentle-wobble"
                  >
                    {isMusicPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNextTrack}
                    disabled={playlist.length <= 1}
                    className="gentle-hover"
                  >
                    <SkipForward className="h-4 w-4 text-foreground" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <VolumeX className="h-4 w-4 text-foreground" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-primary"
                    style={{
                      height: "4px",
                      background: `linear-gradient(to right, var(--primary) ${musicVolume}%, var(--muted) ${musicVolume}%)`,
                      borderRadius: "2px",
                    }}
                    // Add passive attribute
                    onTouchStart={() => {
                      /* passive by default */
                    }}
                  />
                  <Volume2 className="h-4 w-4 text-foreground" />
                </div>
              </div>

              {/* Playlist info */}
              {playlist.length > 1 && (
                <div className="text-xs text-muted-foreground font-patrick-hand">
                  Track {currentIndex + 1} of {playlist.length}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
