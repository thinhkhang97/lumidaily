"use client";

import React from "react";
import { CircleTimerDemo } from "@/components/CircleTimerDemo";

export default function CircleTimerPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Circle Timer Component</h1>

      <div className="space-y-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Interactive Demo</h2>
          <div className="flex justify-center py-4 bg-white rounded-md">
            <CircleTimerDemo />
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <pre className="bg-muted p-4 rounded-md overflow-auto">
            <code>{`import { CircleTimer } from "@/components/ui/circle-timer";

// Basic usage
<CircleTimer 
  duration={60} 
  currentTime={30} 
  isRunning={true} 
  onComplete={() => console.log("Timer completed!")} 
/>

// With custom display
<CircleTimer 
  duration={60} 
  currentTime={30} 
  size={200}
  strokeWidth={10}
  progressColor="#e89a4f"
  trackColor="#f0f0f0"
  isRunning={true} 
  onComplete={() => console.log("Timer completed!")} 
>
  <div className="text-center">
    <span className="text-3xl font-medium">
      {Math.floor(currentTime / 60).toString().padStart(2, "0")}:
      {Math.floor(currentTime % 60).toString().padStart(2, "0")}
    </span>
  </div>
</CircleTimer>`}</code>
          </pre>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Props</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Prop
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Default
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">duration</td>
                  <td className="px-4 py-2 text-sm">number</td>
                  <td className="px-4 py-2 text-sm">-</td>
                  <td className="px-4 py-2 text-sm">
                    Total duration in seconds
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">currentTime</td>
                  <td className="px-4 py-2 text-sm">number</td>
                  <td className="px-4 py-2 text-sm">-</td>
                  <td className="px-4 py-2 text-sm">Current time in seconds</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">size</td>
                  <td className="px-4 py-2 text-sm">number</td>
                  <td className="px-4 py-2 text-sm">120</td>
                  <td className="px-4 py-2 text-sm">
                    Size of the timer in pixels
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">strokeWidth</td>
                  <td className="px-4 py-2 text-sm">number</td>
                  <td className="px-4 py-2 text-sm">8</td>
                  <td className="px-4 py-2 text-sm">
                    Width of the circle stroke
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">progressColor</td>
                  <td className="px-4 py-2 text-sm">string</td>
                  <td className="px-4 py-2 text-sm">primary</td>
                  <td className="px-4 py-2 text-sm">
                    Color of the progress circle
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">trackColor</td>
                  <td className="px-4 py-2 text-sm">string</td>
                  <td className="px-4 py-2 text-sm">muted</td>
                  <td className="px-4 py-2 text-sm">
                    Color of the track circle
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">isRunning</td>
                  <td className="px-4 py-2 text-sm">boolean</td>
                  <td className="px-4 py-2 text-sm">false</td>
                  <td className="px-4 py-2 text-sm">
                    Whether the timer is running
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">onComplete</td>
                  <td className="px-4 py-2 text-sm">function</td>
                  <td className="px-4 py-2 text-sm">-</td>
                  <td className="px-4 py-2 text-sm">
                    Callback when timer completes
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-mono">children</td>
                  <td className="px-4 py-2 text-sm">ReactNode</td>
                  <td className="px-4 py-2 text-sm">-</td>
                  <td className="px-4 py-2 text-sm">
                    Custom content to display inside the timer
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
