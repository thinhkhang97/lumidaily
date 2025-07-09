"use client";

import React, { useState, useEffect } from "react";
import { CircleTimer } from "@/components/ui/circle-timer";
import { Button } from "@/components/ui/button";

export function CircleTimerDemo() {
  const [duration, setDuration] = useState(60); // 60 seconds by default
  const [currentTime, setCurrentTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(true); // Start running by default
  const [size, setSize] = useState(150);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime - 0.1;
          return newTime > 0 ? newTime : 0;
        });
      }, 100);
    } else if (currentTime <= 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentTime]);

  const handleStart = () => {
    if (currentTime <= 0) {
      setCurrentTime(duration);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(duration);
  };

  const handleComplete = () => {
    setIsRunning(false);
    // Play a sound or show a notification in a real application
    console.log("Timer completed!");

    // Visual feedback that the timer completed
    const timerElement = document.getElementById("circle-timer-demo");
    if (timerElement) {
      timerElement.classList.add("timer-completed");
      setTimeout(() => {
        timerElement.classList.remove("timer-completed");
      }, 1000);
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value, 10);
    setDuration(newDuration);
    if (!isRunning) {
      setCurrentTime(newDuration);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <div id="circle-timer-demo" className="relative">
          <CircleTimer
            duration={duration}
            currentTime={currentTime}
            size={size}
            isRunning={isRunning}
            onComplete={handleComplete}
            progressColor={isRunning ? "#e89a4f" : "#aaaaaa"}
            trackColor="#f0f0f0"
            strokeWidth={10}
          >
            <div className="text-center">
              <span className="text-3xl font-medium">
                {Math.floor(currentTime / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {Math.floor(currentTime % 60)
                  .toString()
                  .padStart(2, "0")}
              </span>
              {isRunning && (
                <div className="text-xs mt-1 text-primary animate-pulse">
                  Counting down...
                </div>
              )}
            </div>
          </CircleTimer>
          {currentTime <= 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full backdrop-blur-sm">
              <div className="text-center">
                <div className="text-xl font-bold">Time&apos;s up!</div>
                <Button size="sm" className="mt-2" onClick={handleReset}>
                  Restart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {!isRunning ? (
          <Button onClick={handleStart}>Start</Button>
        ) : (
          <Button onClick={handlePause}>Pause</Button>
        )}
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <div className="space-y-2">
          <label className="text-base">Duration (seconds)</label>
          <input
            type="range"
            min="5"
            max="300"
            step="5"
            value={duration}
            onChange={handleDurationChange}
            className="w-full"
          />
          <div className="text-base text-center">{duration}s</div>
        </div>

        <div className="space-y-2">
          <label className="text-base">Size</label>
          <input
            type="range"
            min="80"
            max="300"
            step="10"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="text-base text-center">{size}px</div>
        </div>
      </div>
    </div>
  );
}
