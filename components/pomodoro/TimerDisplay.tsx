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
  // Responsive sizing based on screen size and fullscreen state
  const getTimerSize = () => {
    if (isFullScreen) {
      return {
        size: 320, // Large for fullscreen desktop
        strokeWidth: 16,
        fontSize: "text-6xl",
        mobileSize: 280, // Smaller for mobile fullscreen
        mobileStrokeWidth: 14,
        mobileFontSize: "text-5xl",
      };
    }
    return {
      size: 240, // Default desktop
      strokeWidth: 12,
      fontSize: "text-4xl",
      mobileSize: 200, // Mobile default
      mobileStrokeWidth: 10,
      mobileFontSize: "text-3xl",
    };
  };

  const timerConfig = getTimerSize();

  return (
    <div className="mb-6 sm:mb-8 text-center px-4">
      {/* Session Title */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">
        {sessionState === SessionState.WORK
          ? "Focus Time"
          : sessionState === SessionState.BREAK
          ? "Break Time"
          : "Session Complete"}
      </h2>

      {/* Task Name */}
      {task && (
        <p
          className={`text-muted-foreground mb-4 px-2 ${
            isFullScreen
              ? "text-lg sm:text-xl lg:text-2xl"
              : "text-base sm:text-lg"
          }`}
        >
          <span className="font-medium">{task.name}</span>
        </p>
      )}

      {/* Timer Circle */}
      <div className="mt-4 flex justify-center">
        {/* Mobile Timer */}
        <div className="block sm:hidden">
          <CircleTimer
            duration={getSessionDuration()}
            currentTime={currentTime}
            size={
              isFullScreen ? timerConfig.mobileSize : timerConfig.mobileSize
            }
            strokeWidth={
              isFullScreen
                ? timerConfig.mobileStrokeWidth
                : timerConfig.mobileStrokeWidth
            }
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
            <div className="flex flex-col items-center px-2">
              <span
                className={`font-heading ${
                  isFullScreen
                    ? timerConfig.mobileFontSize
                    : timerConfig.mobileFontSize
                } leading-none`}
              >
                {Math.floor(currentTime / 60)}:
                {(currentTime % 60).toString().padStart(2, "0")}
              </span>
              {sessionState === SessionState.BREAK && (
                <span className="mt-1 text-xs text-muted-foreground">
                  Take a break!
                </span>
              )}
              {!isRunning &&
                ((sessionState === SessionState.WORK &&
                  currentTime !== initialTime) ||
                  (sessionState === SessionState.BREAK &&
                    currentTime !== breakTime)) && (
                  <span className="mt-2 text-xs font-medium text-yellow-500 dark:text-yellow-400">
                    Paused
                  </span>
                )}
            </div>
          </CircleTimer>
        </div>

        {/* Desktop Timer */}
        <div className="hidden sm:block">
          <CircleTimer
            duration={getSessionDuration()}
            currentTime={currentTime}
            size={timerConfig.size}
            strokeWidth={timerConfig.strokeWidth}
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
                className={`font-heading ${timerConfig.fontSize} leading-none`}
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
    </div>
  );
}
