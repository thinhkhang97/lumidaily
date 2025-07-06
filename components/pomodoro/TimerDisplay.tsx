import { CircleTimer } from "@/components/ui/circle-timer";
import { SessionState, Task } from "./types";

interface TimerDisplayProps {
  currentTime: number;
  sessionState: SessionState;
  isRunning: boolean;
  isFullScreen: boolean;
  initialTime: number;
  breakTime: number;
  task?: Task | null;
  getSessionDuration: () => number;
}

export function TimerDisplay({
  currentTime,
  sessionState,
  isRunning,
  isFullScreen,
  initialTime,
  breakTime,
  task,
  getSessionDuration,
}: TimerDisplayProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-semibold">
        {sessionState === SessionState.WORK
          ? "Focus Time"
          : sessionState === SessionState.BREAK
          ? "Break Time"
          : "Session Complete"}
      </h2>
      {task && (
        <span className={`${isFullScreen ? "text-xl" : "text-lg"}`}>
          {task.name}
        </span>
      )}
      <div className="mt-4">
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
          progressColor={
            sessionState === SessionState.WORK
              ? "var(--primary)"
              : sessionState === SessionState.BREAK
              ? "var(--lumi-dusty-rose)"
              : "var(--lumi-lavender)"
          }
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
            {sessionState === SessionState.BREAK && (
              <span className="mt-1 text-sm text-muted-foreground">
                Take a break!
              </span>
            )}
            {!isRunning &&
              ((sessionState === SessionState.WORK &&
                currentTime !== initialTime) ||
                (sessionState === SessionState.BREAK &&
                  currentTime !== breakTime)) && (
                <span className="mt-2 text-sm font-medium text-yellow-500 dark:text-yellow-400">
                  Paused
                </span>
              )}
          </div>
        </CircleTimer>
      </div>
    </div>
  );
}
