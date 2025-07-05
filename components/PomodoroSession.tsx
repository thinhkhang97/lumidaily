"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CircleTimer } from "@/components/ui/circle-timer";
import {
  Check,
  Pause,
  Play,
  SkipForward,
  X,
  Maximize,
  Minimize,
} from "lucide-react";

// Define vendor-prefixed fullscreen API interfaces
interface FullScreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface FullScreenDocument extends Document {
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface Task {
  id: string;
  name: string;
  plannedSessions: number;
  completedSessions: number;
}

interface PomodoroSessionProps {
  task: Task | null;
  initialTime?: number;
  breakTime?: number;
  onComplete?: () => void;
  onCancel?: () => void;
}

enum SessionState {
  WORK = "work",
  BREAK = "break",
  COMPLETED_TASK = "completed-task",
}

export function PomodoroSession({
  task,
  initialTime = 10, // 25 minutes in seconds
  breakTime = 5,
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
  const fullScreenContainerRef = useRef<HTMLDivElement>(null);

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

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle ESC key press to exit full-screen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        exitFullScreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen]);

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
  }, [isRunning, currentTime, sessionState, hasPlayedSound, isFinalSession]);

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  const handleCancel = () => {
    if (isFullScreen) {
      exitFullScreen();
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
      exitFullScreen();
    }
    onCancel?.();
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }
  };

  const enterFullScreen = () => {
    const element = fullScreenContainerRef.current as FullScreenElement | null;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    const doc = document as FullScreenDocument;
    if (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement
    ) {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
    setIsFullScreen(false);
  };

  const getSessionTitle = () => {
    if (sessionState === "work") return "Focus Time";
    if (sessionState === "break") return "Break Time";
    return "Session Complete";
  };

  // Fix the getSessionDuration function to avoid re-renders
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

  const renderPlayButton = (totalTime: number) => {
    if (currentTime === totalTime && !isRunning) {
      return (
        <>
          <Play className="mr-2 h-4 w-4" />
          Start
        </>
      );
    }

    return isRunning ? (
      <>
        <Pause className="mr-2 h-4 w-4" />
        Pause
      </>
    ) : (
      <>
        <Play className="mr-2 h-4 w-4" />
        Resume
      </>
    );
  };

  const renderButtons = () => {
    if (sessionState === SessionState.COMPLETED_TASK) {
      return (
        <div className="flex gap-4">
          <Button variant="destructive" size="lg" onClick={handleCompleteTask}>
            <Check className="mr-2 h-4 w-4" />
            Complete Task
          </Button>
        </div>
      );
    }

    if (sessionState === SessionState.BREAK) {
      return (
        <div className="flex gap-4">
          <Button variant="outline" size="lg" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant={isRunning ? "secondary" : "default"}
            size="lg"
            onClick={handlePauseResume}
            className="min-w-[120px] transition-all"
          >
            {renderPlayButton(breakTime)}
          </Button>
          {sessionState === SessionState.BREAK && !isFinalSession && (
            <Button variant="destructive" size="lg" onClick={handleSkip}>
              <SkipForward className="mr-2 h-4 w-4" />
              Skip
            </Button>
          )}
        </div>
      );
    }
    // Running session buttons
    return (
      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={handleCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          variant={isRunning ? "secondary" : "default"}
          size="lg"
          onClick={handlePauseResume}
          className="min-w-[120px] transition-all"
        >
          {renderPlayButton(initialTime)}
        </Button>
      </div>
    );
  };

  return (
    <div
      ref={fullScreenContainerRef}
      className={`flex flex-col items-center justify-center ${
        isFullScreen ? "fixed inset-0 bg-background z-50" : ""
      }`}
    >
      {isFullScreen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={exitFullScreen}
        >
          <X className="h-6 w-6" />
        </Button>
      )}

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">{getSessionTitle()}</h2>
        <CircleTimer
          duration={getSessionDuration()}
          currentTime={currentTime}
          size={isFullScreen ? 320 : 240}
          strokeWidth={isFullScreen ? 16 : 12}
          isRunning={
            isRunning &&
            (sessionState === SessionState.WORK ||
              sessionState === SessionState.BREAK)
          }
          className="mx-auto"
        >
          <div className="flex flex-col items-center">
            <span
              className={`font-heading ${
                isFullScreen ? "text-6xl" : "text-4xl"
              }`}
            >
              {Math.floor(currentTime / 60)}:
              {(currentTime % 60).toString().padStart(2, "0")}
            </span>
            {task && (
              <span className={`mt-2 ${isFullScreen ? "text-xl" : "text-lg"}`}>
                {task.name}
              </span>
            )}
            {sessionState === SessionState.BREAK && (
              <span className="mt-1 text-sm text-muted-foreground">
                Take a break!
              </span>
            )}
            {!isRunning &&
              (sessionState === SessionState.WORK ||
                sessionState === SessionState.BREAK) && (
                <span className="mt-2 text-sm font-medium text-yellow-500 dark:text-yellow-400">
                  Paused
                </span>
              )}
          </div>
        </CircleTimer>
      </div>

      <div className="flex flex-col gap-4 items-center">
        {renderButtons()}

        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullScreen}
          className="mt-4"
        >
          {isFullScreen ? (
            <>
              <Minimize className="mr-2 h-4 w-4" />
              Exit Full Screen
            </>
          ) : (
            <>
              <Maximize className="mr-2 h-4 w-4" />
              Enter Full Screen
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
