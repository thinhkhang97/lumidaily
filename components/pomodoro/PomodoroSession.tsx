"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { MusicPlayer } from "./MusicPlayer";
import { ControlButtons } from "./ControlButtons";
import { Toolbar } from "./Toolbar";
import { PlaylistPanel } from "./PlaylistPanel";
import { FullScreenManager, useFullScreen } from "./FullScreenManager";
import { PomodoroSessionProps, SessionState, FullScreenElement } from "./types";
import { MusicTrack } from "@/lib/types";
import { MusicService } from "@/lib/services/MusicService";

export function PomodoroSession({
  task,
  initialTime = 1500, // 25 minutes in seconds
  breakTime = 300, // 5 minutes in seconds
  volume = 50,
  onComplete,
  onCancel,
}: PomodoroSessionProps) {
  const [currentTime, setCurrentTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [sessionState, setSessionState] = useState<SessionState>(
    SessionState.WORK
  );
  const [hasPlayedSound, setHasPlayedSound] = useState<{
    [key: number]: boolean;
  }>({});
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Music-related state
  const [showPlaylistPanel, setShowPlaylistPanel] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState(
    MusicService.getPlaylistFromLocalStorage()
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fullScreenRef = useRef<HTMLDivElement>(null);
  const originalTitle = useRef<string>(document.title);
  const { enterFullScreen } = useFullScreen();

  // Calculate isFinalSession only once to avoid re-renders
  const isFinalSession = useMemo(() => {
    if (!task) return false;
    return task.completedSessions + 1 >= task.plannedSessions;
  }, [task]);

  // Load current track on component mount
  useEffect(() => {
    const currentPlaylistTrack = MusicService.getCurrentTrack();
    if (currentPlaylistTrack) {
      setCurrentTrack(currentPlaylistTrack);
    }
    setPlaylist(MusicService.getPlaylistFromLocalStorage());
  }, []);

  // Initialize audio for timer notifications
  useEffect(() => {
    audioRef.current = new Audio(
      "https://cdn.freesound.org/previews/804/804760_6951162-lq.mp3"
    );
    audioRef.current.preload = "auto";

    // Set volume from props (0-100 scale to 0-1)
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume]);

  // Update document title with countdown and task name
  useEffect(() => {
    // Save the original title when component mounts
    originalTitle.current = document.title;

    // Update the title with the current time and task name
    const formatTime = () => {
      const minutes = Math.floor(currentTime / 60);
      const seconds = (currentTime % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };

    const sessionPrefix =
      sessionState === SessionState.WORK
        ? "🔴 "
        : sessionState === SessionState.BREAK
        ? "🟢 "
        : "";
    const timeDisplay = formatTime();
    const taskName = task?.name || "Pomodoro";

    document.title = `${sessionPrefix}${timeDisplay} - ${taskName}`;

    // Restore the original title when component unmounts
    return () => {
      document.title = originalTitle.current;
    };
  }, [currentTime, task, sessionState]);

  // Main timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime - 1;
          // Play sound at 5s and 2s
          if ((newTime === 5 || newTime === 2) && !hasPlayedSound[newTime]) {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(console.error);
              setHasPlayedSound((prev) => ({ ...prev, [newTime]: true }));
            }
          }

          // Handle session completion
          if (newTime <= 0) {
            clearInterval(interval!);
            if (sessionState === SessionState.WORK) {
              setIsRunning(false);
              onComplete?.();
              if (!isFinalSession) {
                setSessionState(SessionState.BREAK);
                return breakTime;
              } else {
                setSessionState(SessionState.COMPLETED_TASK);
                return 0;
              }
            } else if (sessionState === SessionState.BREAK) {
              setSessionState(SessionState.WORK);
              setIsRunning(false);
              return initialTime;
            }
          }

          return newTime > 0 ? newTime : 0;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    isRunning,
    currentTime,
    sessionState,
    hasPlayedSound,
    isFinalSession,
    breakTime,
    initialTime,
    onComplete,
  ]);

  // Timer control handlers
  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const handleCancel = () => {
    if (isFullScreen) {
      setIsFullScreen(false);
    }
    if (showPlaylistPanel) {
      setShowPlaylistPanel(false);
    }
    if (onCancel) onCancel();
  };

  const handleSkip = () => {
    setSessionState(SessionState.WORK);
    setCurrentTime(initialTime);
    setIsRunning(true);
  };

  const handleCompleteTask = () => {
    if (isFullScreen) {
      setIsFullScreen(false);
    }
    if (showPlaylistPanel) {
      setShowPlaylistPanel(false);
    }
    onCancel?.();
  };

  // Fullscreen handlers
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (fullScreenRef.current) {
        enterFullScreen(fullScreenRef.current as FullScreenElement);
        setIsFullScreen(true);
      }
    } else {
      setIsFullScreen(false);
    }
  };

  // Music handlers
  const handleTogglePlaylist = () => {
    setShowPlaylistPanel((prev) => !prev);
  };

  const handleTrackChange = (track: MusicTrack | null) => {
    setCurrentTrack(track);
    // Refresh playlist state to reflect changes
    setPlaylist(MusicService.getPlaylistFromLocalStorage());
  };

  const handlePlayStateChange = (isPlaying: boolean) => {
    setIsMusicPlaying(isPlaying);
  };

  const handleTrackDetailsUpdate = (
    trackId: string,
    details: { title?: string; duration?: number }
  ) => {
    // Update the current track if it's the one being updated
    if (currentTrack?.id === trackId) {
      setCurrentTrack((prev) => (prev ? { ...prev, ...details } : null));
    }
    // Refresh playlist to show updated details
    setPlaylist(MusicService.getPlaylistFromLocalStorage());
  };

  const handleTrackSelect = (track: MusicTrack) => {
    setCurrentTrack(track);
    MusicService.updateCurrentTrack(track.id);
    setPlaylist(MusicService.getPlaylistFromLocalStorage());
  };

  const handleMusicPlayPause = () => {
    // This will be handled by the MusicPlayer component
    // The state update will come through handlePlayStateChange
  };

  const handleAddTrack = async (url: string) => {
    try {
      const newTrack = MusicService.addTrackToPlaylist(url);
      if (newTrack) {
        // Refresh playlist state
        const updatedPlaylist = MusicService.getPlaylistFromLocalStorage();
        setPlaylist(updatedPlaylist);

        // If this is the first track, start playing it
        if (updatedPlaylist.tracks.length === 1 && !currentTrack) {
          setCurrentTrack(newTrack);
          MusicService.updateCurrentTrack(newTrack.id);
        }
      }
    } catch (error) {
      console.error("Error adding track:", error);
    }
  };

  // Utility functions
  const getSessionDuration = () => {
    switch (sessionState) {
      case SessionState.WORK:
        return initialTime;
      case SessionState.BREAK:
        return breakTime;
      default:
        return 0;
    }
  };

  const hasPlaylist = playlist.tracks.length > 0;

  return (
    <FullScreenManager
      isFullScreen={isFullScreen}
      setIsFullScreen={setIsFullScreen}
    >
      <div
        ref={fullScreenRef}
        className="flex flex-col items-center justify-center relative"
      >
        <TimerDisplay
          currentTime={currentTime}
          sessionState={sessionState}
          isRunning={isRunning}
          isFullScreen={isFullScreen}
          initialTime={initialTime}
          breakTime={breakTime}
          task={task}
          getSessionDuration={getSessionDuration}
        />

        {/* Updated MusicPlayer with new props */}
        <MusicPlayer
          volume={volume}
          currentTrack={currentTrack}
          onTrackChange={handleTrackChange}
          onPlayStateChange={handlePlayStateChange}
          onTrackDetailsUpdate={handleTrackDetailsUpdate}
        />

        <ControlButtons
          sessionState={sessionState}
          isRunning={isRunning}
          isFinalSession={isFinalSession}
          currentTime={currentTime}
          initialTime={initialTime}
          breakTime={breakTime}
          onPauseResume={handlePauseResume}
          onCancel={handleCancel}
          onSkip={handleSkip}
          onCompleteTask={handleCompleteTask}
        />

        {/* New Toolbar Component */}
        <Toolbar
          isFullScreen={isFullScreen}
          showPlaylistPanel={showPlaylistPanel}
          hasPlaylist={hasPlaylist}
          onToggleFullScreen={toggleFullScreen}
          onTogglePlaylist={handleTogglePlaylist}
        />

        {/* New Playlist Panel Component */}
        <PlaylistPanel
          isOpen={showPlaylistPanel}
          currentTrack={currentTrack}
          isMusicPlaying={isMusicPlaying}
          onClose={() => setShowPlaylistPanel(false)}
          onTrackSelect={handleTrackSelect}
          onPlayPause={handleMusicPlayPause}
          onAddTrack={handleAddTrack}
        />
      </div>
    </FullScreenManager>
  );
}
