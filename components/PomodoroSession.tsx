"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CircleTimer } from "@/components/ui/circle-timer";
import { Check, Pause, Play, SkipForward, X } from "lucide-react";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    if (onCancel) onCancel();
  };

  const handleSkip = () => {
    setSessionState(SessionState.WORK);
    setCurrentTime(initialTime);
    setIsRunning(true);
  };

  const handleCompleteTask = () => {
    onCancel?.();
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
    <div className="flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">{getSessionTitle()}</h2>
        <CircleTimer
          duration={getSessionDuration()}
          currentTime={currentTime}
          size={240}
          strokeWidth={12}
          isRunning={
            isRunning &&
            (sessionState === SessionState.WORK ||
              sessionState === SessionState.BREAK)
          }
          className="mx-auto"
        >
          <div className="flex flex-col items-center">
            <span className="font-heading text-4xl">
              {Math.floor(currentTime / 60)}:
              {(currentTime % 60).toString().padStart(2, "0")}
            </span>
            {task && <span className="mt-2 text-lg">{task.name}</span>}
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
      {renderButtons()}
    </div>
  );
}
