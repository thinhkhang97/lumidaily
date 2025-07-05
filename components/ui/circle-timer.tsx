"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CircleTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Duration in seconds */
  duration: number;
  /** Current time in seconds */
  currentTime: number;
  /** Size of the timer in pixels */
  size?: number;
  /** Stroke width of the circle */
  strokeWidth?: number;
  /** Color of the progress circle */
  progressColor?: string;
  /** Color of the track circle */
  trackColor?: string;
  /** Whether the timer is running */
  isRunning?: boolean;
  /** Callback when timer completes */
  onComplete?: () => void;
}

export function CircleTimer({
  duration,
  currentTime,
  size = 120,
  strokeWidth = 8,
  progressColor,
  trackColor,
  isRunning = false,
  onComplete,
  className,
  children,
  ...props
}: CircleTimerProps) {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, currentTime / duration));
  const strokeDashoffset = circumference * (1 - progress);

  React.useEffect(() => {
    if (currentTime === 0 && onComplete) {
      onComplete();
    }
  }, [currentTime, onComplete]);

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor || "#f0f0f0"}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor || "#e89a4f"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("transition-all duration-1000", {
            "transition-none": !isRunning,
          })}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (
          <div className="text-center">
            <span className="text-2xl font-medium">
              {Math.ceil(currentTime)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
