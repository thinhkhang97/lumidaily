import { Button } from "@/components/ui/button";
import { Check, Pause, Play, SkipForward, X } from "lucide-react";
import { SessionState } from "./types";

interface ControlButtonsProps {
  sessionState: SessionState;
  isRunning: boolean;
  isFinalSession: boolean;
  currentTime: number;
  initialTime: number;
  breakTime: number;
  onPauseResume: () => void;
  onCancel: () => void;
  onSkip: () => void;
  onCompleteTask: () => void;
}

export function ControlButtons({
  sessionState,
  isRunning,
  isFinalSession,
  currentTime,
  initialTime,
  breakTime,
  onPauseResume,
  onCancel,
  onSkip,
  onCompleteTask,
}: ControlButtonsProps) {
  const renderPlayButton = (totalTime: number) => {
    if (currentTime === totalTime && !isRunning) {
      return (
        <>
          <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Start</span>
          <span className="sm:hidden">Start</span>
        </>
      );
    }

    return isRunning ? (
      <>
        <Pause className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Pause</span>
        <span className="sm:hidden">Pause</span>
      </>
    ) : (
      <>
        <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Resume</span>
        <span className="sm:hidden">Resume</span>
      </>
    );
  };

  const renderSessionButtons = () => {
    if (sessionState === SessionState.COMPLETED_TASK) {
      return (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button
            variant="destructive"
            size="lg"
            onClick={onCompleteTask}
            className="h-12 sm:h-10 text-base sm:text-base font-medium rounded-xl"
          >
            <Check className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
            Complete Task
          </Button>
        </div>
      );
    }

    if (sessionState === SessionState.BREAK) {
      return (
        <div className="flex flex-row justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none">
          <Button
            variant="outline"
            size="lg"
            onClick={onCancel}
            className="h-12 sm:h-10 text-base sm:text-base font-medium rounded-xl order-3 sm:order-1"
          >
            <X className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
            Cancel
          </Button>
          <Button
            variant={isRunning ? "secondary" : "default"}
            size="lg"
            onClick={onPauseResume}
            className="h-14 sm:h-10 text-lg sm:text-base font-medium rounded-xl transition-all order-1 sm:order-2 min-w-[140px] sm:min-w-[120px]"
          >
            {renderPlayButton(breakTime)}
          </Button>
          {sessionState === SessionState.BREAK && !isFinalSession && (
            <Button
              variant="destructive"
              size="lg"
              onClick={onSkip}
              className="h-12 sm:h-10 text-base sm:text-base font-medium rounded-xl order-2 sm:order-3"
            >
              <SkipForward className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
              Skip
            </Button>
          )}
        </div>
      );
    }

    // Running session buttons
    return (
      <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none">
        <Button
          variant="outline"
          size="lg"
          onClick={onCancel}
          className="h-12 sm:h-10 text-base sm:text-base font-medium rounded-xl order-2 sm:order-1"
        >
          <X className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
          Cancel
        </Button>
        <Button
          variant={isRunning ? "secondary" : "default"}
          size="lg"
          onClick={onPauseResume}
          className="h-14 sm:h-10 text-lg sm:text-base font-medium rounded-xl transition-all order-1 sm:order-2 min-w-[140px] sm:min-w-[120px]"
        >
          {renderPlayButton(initialTime)}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full px-4 sm:px-0">
      {renderSessionButtons()}
    </div>
  );
}
