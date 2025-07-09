"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { MusicPlayer } from "./MusicPlayer";
import { MusicPlayerUI } from "./MusicPlayerUI";
import { ControlButtons } from "./ControlButtons";
import { Toolbar } from "./Toolbar";
import { PlaylistPanel } from "./PlaylistPanel";
import { NotePanel } from "./NotePanel";
import { FullScreenManager, useFullScreen } from "./FullScreenManager";
import { PomodoroSessionProps, SessionState, FullScreenElement } from "./types";
import { MusicTrack } from "@/lib/types";
import { MusicService } from "@/lib/services/MusicService";
import { NoteService } from "@/lib/services/NoteService";

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

  // Time-based timer state
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [pausedTime, setPausedTime] = useState<number>(0);
  const [lastPauseTime, setLastPauseTime] = useState<number>(0);

  // Music-related state
  const [showPlaylistPanel, setShowPlaylistPanel] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [musicProgress, setMusicProgress] = useState<number>(0);
  const [musicVolume, setMusicVolume] = useState<number>(volume);
  const [playlist, setPlaylist] = useState(
    MusicService.getPlaylistFromLocalStorage()
  );

  // Note-related state
  const [showNotePanel, setShowNotePanel] = useState<boolean>(false);
  const [hasNotes, setHasNotes] = useState<boolean>(false);

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

  // Check if task has notes
  useEffect(() => {
    if (task) {
      const taskNotes = NoteService.getNotesForTask(task.id);
      setHasNotes(taskNotes.length > 0);
    }
  }, [task, showNotePanel]);

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

  // Helper function to calculate remaining time based on actual elapsed time
  const calculateRemainingTime = (sessionDuration: number) => {
    if (!isRunning) return currentTime;

    const now = Date.now();
    const totalElapsed = (now - sessionStartTime - pausedTime) / 1000;
    const remaining = Math.max(0, sessionDuration - totalElapsed);

    return Math.ceil(remaining);
  };

  // Get current session duration
  const getCurrentSessionDuration = () => {
    switch (sessionState) {
      case SessionState.WORK:
        return initialTime;
      case SessionState.BREAK:
        return breakTime;
      default:
        return 0;
    }
  };

  // Page Visibility API - recalculate time when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isRunning) {
        // Tab became visible, recalculate the correct time
        const sessionDuration = getCurrentSessionDuration();
        const correctTime = calculateRemainingTime(sessionDuration);
        setCurrentTime(correctTime);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    isRunning,
    sessionStartTime,
    pausedTime,
    sessionState,
    initialTime,
    breakTime,
  ]);

  // Main timer logic - now time-based instead of tick-based
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        const sessionDuration = getCurrentSessionDuration();
        const newTime = calculateRemainingTime(sessionDuration);

        setCurrentTime(() => {
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
                // Reset timer state for break
                setSessionStartTime(Date.now());
                setPausedTime(0);
                setHasPlayedSound({});
                return breakTime;
              } else {
                setSessionState(SessionState.COMPLETED_TASK);
                return 0;
              }
            } else if (sessionState === SessionState.BREAK) {
              setSessionState(SessionState.WORK);
              setIsRunning(false);
              // Reset timer state for next work session
              setSessionStartTime(Date.now());
              setPausedTime(0);
              setHasPlayedSound({});
              return initialTime;
            }
          }

          return newTime > 0 ? newTime : 0;
        });
      }, 100); // Use smaller interval for smoother updates, but calculate based on actual time
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    isRunning,
    sessionState,
    hasPlayedSound,
    isFinalSession,
    breakTime,
    initialTime,
    onComplete,
    sessionStartTime,
    pausedTime,
  ]);

  // Reset timer state when session state changes
  useEffect(() => {
    setSessionStartTime(Date.now());
    setPausedTime(0);
    setLastPauseTime(0);
    setHasPlayedSound({});
  }, [sessionState]);

  // Timer control handlers
  const handlePauseResume = () => {
    if (isRunning) {
      // Pausing
      setLastPauseTime(Date.now());
      setIsRunning(false);
    } else {
      // Resuming
      const pauseDuration = Date.now() - lastPauseTime;
      setPausedTime((prev) => prev + pauseDuration);
      setIsRunning(true);
    }
  };

  const handleCancel = () => {
    if (isFullScreen) {
      setIsFullScreen(false);
    }
    if (showPlaylistPanel) {
      setShowPlaylistPanel(false);
    }
    if (showNotePanel) {
      setShowNotePanel(false);
    }
    if (onCancel) onCancel();
  };

  const handleSkip = () => {
    setSessionState(SessionState.WORK);
    setCurrentTime(initialTime);
    setSessionStartTime(Date.now());
    setPausedTime(0);
    setLastPauseTime(0);
    setHasPlayedSound({});
    setIsRunning(true);
  };

  const handleCompleteTask = () => {
    if (isFullScreen) {
      setIsFullScreen(false);
    }
    if (showPlaylistPanel) {
      setShowPlaylistPanel(false);
    }
    if (showNotePanel) {
      setShowNotePanel(false);
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
    if (showNotePanel) {
      setShowNotePanel(false);
    }
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

  // Music player UI control handlers
  const handleMusicVolumeChange = (newVolume: number) => {
    setMusicVolume(newVolume);
    if (window.musicPlayerControls) {
      window.musicPlayerControls.handleVolumeChange(newVolume);
    }
  };

  const handleMusicProgressChange = (newProgress: number) => {
    setMusicProgress(newProgress);
    if (window.musicPlayerControls) {
      window.musicPlayerControls.handleProgressChange(newProgress);
    }
  };

  const handleMusicPreviousTrack = () => {
    if (window.musicPlayerControls) {
      window.musicPlayerControls.handlePreviousTrack();
    }
  };

  const handleMusicNextTrack = () => {
    if (window.musicPlayerControls) {
      window.musicPlayerControls.handleNextTrack();
    }
  };

  const handleMusicPlayPauseUI = () => {
    if (window.musicPlayerControls) {
      window.musicPlayerControls.playPause();
    }
  };

  // Update music progress from MusicPlayer
  const handleMusicProgress = (progress: number) => {
    setMusicProgress(progress);
  };

  // Update music volume from MusicPlayer
  const handleMusicVolumeUpdate = (newVolume: number) => {
    setMusicVolume(newVolume);
  };

  // Helper functions for music player navigation
  const canGoPrevious = () => {
    const currentIndex = playlist.tracks.findIndex(
      (track) => track.id === currentTrack?.id
    );
    return currentIndex > 0;
  };

  const canGoNext = () => {
    const currentIndex = playlist.tracks.findIndex(
      (track) => track.id === currentTrack?.id
    );
    return currentIndex < playlist.tracks.length - 1;
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

  // Note handlers
  const handleToggleNotes = () => {
    setShowNotePanel((prev) => !prev);
    if (showPlaylistPanel) {
      setShowPlaylistPanel(false);
    }
  };

  return (
    <FullScreenManager
      isFullScreen={isFullScreen}
      setIsFullScreen={setIsFullScreen}
    >
      <div
        ref={fullScreenRef}
        className="flex flex-col relative min-h-screen p-4"
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

        {/* Music Player UI - only show if there are tracks */}
        {currentTrack && (
          <MusicPlayerUI
            currentTrack={currentTrack}
            isMusicPlaying={isMusicPlaying}
            volume={musicVolume}
            progress={musicProgress}
            onPlayPause={handleMusicPlayPauseUI}
            onPreviousTrack={handleMusicPreviousTrack}
            onNextTrack={handleMusicNextTrack}
            onVolumeChange={handleMusicVolumeChange}
            onProgressChange={handleMusicProgressChange}
            canGoPrevious={canGoPrevious()}
            canGoNext={canGoNext()}
          />
        )}

        {/* Updated MusicPlayer with new props */}
        <MusicPlayer
          volume={musicVolume}
          currentTrack={currentTrack}
          onTrackChange={handleTrackChange}
          onPlayStateChange={handlePlayStateChange}
          onTrackDetailsUpdate={handleTrackDetailsUpdate}
          onVolumeChange={handleMusicVolumeUpdate}
          onProgressChange={handleMusicProgress}
        />

        {/* Control Buttons with added bottom spacing for mobile toolbar */}
        <div className="mt-6 w-full">
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
        </div>

        {/* Enhanced Toolbar Component */}
        <Toolbar
          isFullScreen={isFullScreen}
          showPlaylistPanel={showPlaylistPanel}
          showNotePanel={showNotePanel}
          hasPlaylist={hasPlaylist}
          hasNotes={hasNotes}
          onToggleFullScreen={toggleFullScreen}
          onTogglePlaylist={handleTogglePlaylist}
          onToggleNotes={handleToggleNotes}
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

        {/* Note Panel Component */}
        <NotePanel
          isOpen={showNotePanel}
          taskId={task?.id || null}
          onClose={() => setShowNotePanel(false)}
        />
      </div>
    </FullScreenManager>
  );
}
