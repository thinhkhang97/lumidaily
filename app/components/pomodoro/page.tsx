"use client";

import { useState } from "react";
import { PomodoroSession } from "@/components/PomodoroSession";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PomodoroDemo() {
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [task] = useState({
    id: "1",
    name: "Complete Project Documentation",
    plannedSessions: 3,
    completedSessions: 1,
  });

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Pomodoro Timer with Music</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About This Demo</CardTitle>
          <CardDescription>
            This demonstrates the Pomodoro timer with YouTube music integration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Pomodoro Technique is a time management method that uses a timer
            to break work into intervals, traditionally 25 minutes in length,
            separated by short breaks. This implementation includes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>25-minute work sessions followed by 5-minute breaks</li>
            <li>YouTube music integration (audio only)</li>
            <li>Volume controls and play/pause functionality</li>
            <li>Full-screen mode for focused work</li>
          </ul>
          <p>
            To use the music feature, click on the &quot;Music Player&quot;
            button, enter a YouTube URL, and click &quot;Load&quot;. The audio
            will play without showing the video.
          </p>
        </CardContent>
      </Card>

      {!showPomodoro ? (
        <div className="flex justify-center">
          <Button size="lg" onClick={() => setShowPomodoro(true)}>
            Start Pomodoro Session
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <PomodoroSession
              task={task}
              initialTime={60} // Set to 60 seconds for demo purposes
              breakTime={30} // Set to 30 seconds for demo purposes
              onComplete={() => console.log("Session completed")}
              onCancel={() => setShowPomodoro(false)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
