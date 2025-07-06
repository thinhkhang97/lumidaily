"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { MusicPlayer } from "./MusicPlayer";
import { ControlButtons } from "./ControlButtons";
import { FullScreenManager, useFullScreen } from "./FullScreenManager";
import { PomodoroSessionProps, SessionState, FullScreenElement } from "./types";

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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fullScreenRef = useRef<HTMLDivElement>(null);
  const originalTitle = useRef<string>(document.title);
  const { enterFullScreen } = useFullScreen();

  // Calculate isFinalSession only once to avoid re-renders
  const isFinalSession = useMemo(() => {
    if (!task) return false;
    return task.completedSessions + 1 >= task.plannedSessions;
  }, [task]);

  // Initialize audio
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

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const handleCancel = () => {
    if (isFullScreen) {
      setIsFullScreen(false);
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
    onCancel?.();
  };

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

  return (
    <FullScreenManager
      isFullScreen={isFullScreen}
      setIsFullScreen={setIsFullScreen}
    >
      <div
        ref={fullScreenRef}
        className="flex flex-col items-center justify-center"
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

        <MusicPlayer volume={volume} />

        <ControlButtons
          sessionState={sessionState}
          isRunning={isRunning}
          isFullScreen={isFullScreen}
          isFinalSession={isFinalSession}
          currentTime={currentTime}
          initialTime={initialTime}
          breakTime={breakTime}
          onPauseResume={handlePauseResume}
          onCancel={handleCancel}
          onSkip={handleSkip}
          onCompleteTask={handleCompleteTask}
          onToggleFullScreen={toggleFullScreen}
        />
      </div>
    </FullScreenManager>
  );
}
