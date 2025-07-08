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

  const renderSessionButtons = () => {
    if (sessionState === SessionState.COMPLETED_TASK) {
      return (
        <div className="flex gap-4">
          <Button variant="destructive" size="lg" onClick={onCompleteTask}>
            <Check className="mr-2 h-4 w-4" />
            Complete Task
          </Button>
        </div>
      );
    }

    if (sessionState === SessionState.BREAK) {
      return (
        <div className="flex gap-4">
          <Button variant="outline" size="lg" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant={isRunning ? "secondary" : "default"}
            size="lg"
            onClick={onPauseResume}
            className="min-w-[120px] transition-all"
          >
            {renderPlayButton(breakTime)}
          </Button>
          {sessionState === SessionState.BREAK && !isFinalSession && (
            <Button variant="destructive" size="lg" onClick={onSkip}>
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
        <Button variant="outline" size="lg" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          variant={isRunning ? "secondary" : "default"}
          size="lg"
          onClick={onPauseResume}
          className="min-w-[120px] transition-all"
        >
          {renderPlayButton(initialTime)}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {renderSessionButtons()}
    </div>
  );
}
