"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleTimer } from "@/components/ui/circle-timer";

interface Task {
  id: string;
  name: string;
}

interface PomodoroSessionProps {
  task: Task | null;
  initialTime?: number;
  onPause?: () => void;
  onSkip?: () => void;
  onComplete?: () => void;
}

export function PomodoroSession({
  task,
  initialTime = 1500, // 25 minutes in seconds
  onPause,
  onSkip,
  onComplete,
}: PomodoroSessionProps) {
  const [currentTime, setCurrentTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0 && onComplete) {
            clearInterval(interval!);
            onComplete();
          }
          return newTime > 0 ? newTime : 0;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentTime, onComplete]);

  const handlePause = () => {
    setIsRunning(false);
    if (onPause) onPause();
  };

  const handleSkip = () => {
    if (onSkip) onSkip();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <CircleTimer
          duration={initialTime}
          currentTime={currentTime}
          size={240}
          strokeWidth={12}
          isRunning={isRunning}
          className="mx-auto"
          onComplete={onComplete}
        >
          <div className="flex flex-col items-center">
            <span className="font-heading text-4xl">
              {Math.floor(currentTime / 60)}:
              {(currentTime % 60).toString().padStart(2, "0")}
            </span>
            {task && <span className="mt-2 text-lg">{task.name}</span>}
          </div>
        </CircleTimer>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={handlePause}>
          Pause
        </Button>
        <Button variant="secondary" size="lg" onClick={handleSkip}>
          Skip
        </Button>
      </div>
    </div>
  );
}
