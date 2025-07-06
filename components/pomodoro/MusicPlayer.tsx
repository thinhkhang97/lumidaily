import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";

interface MusicPlayerProps {
  volume?: number;
}

export function MusicPlayer({ volume = 50 }: MusicPlayerProps) {
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [musicVolume, setMusicVolume] = useState<number>(volume);
  const [showMusicControls, setShowMusicControls] = useState<boolean>(false);
  const youtubeRef = useRef<YouTubePlayer | null>(null);

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
      setVideoId(id);
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
  };

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

  return (
    <div className="mb-6 w-full max-w-md">
      {/* YouTube Music Player (hidden) */}
      <div className="hidden">
        {videoId && (
          <YouTube
            videoId={videoId}
            opts={youtubeOpts}
            onReady={onPlayerReady}
          />
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowMusicControls(!showMusicControls)}
        className="mb-2 w-full flex justify-between items-center"
      >
        <Music className="h-4 w-4 mr-2" />
        <span>Music Player</span>
        {isMusicPlaying ? (
          <Volume2 className="h-4 w-4 ml-2" />
        ) : (
          <VolumeX className="h-4 w-4 ml-2" />
        )}
      </Button>

      {showMusicControls && (
        <div className="p-4 border rounded-md bg-background">
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Enter YouTube URL"
              value={youtubeUrl}
              onChange={handleYoutubeUrlChange}
              className="flex-1"
            />
            <Button onClick={handleLoadYoutubeVideo} size="sm">
              Load
            </Button>
          </div>

          {videoId && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Button
                  variant={isMusicPlaying ? "secondary" : "default"}
                  size="sm"
                  onClick={toggleMusicPlayback}
                >
                  {isMusicPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <VolumeX className="h-4 w-4" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={handleVolumeChange}
                    className="w-24"
                  />
                  <Volume2 className="h-4 w-4" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
