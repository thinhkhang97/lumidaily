"use client";

import { useState } from "react";
import { Task } from "@/lib/types";
import { QuoteCard } from "@/components/QuoteCard";
import { AppTaskTable } from "@/components/AppTaskTable";
import { AppCalendar } from "@/components/AppCalendar";
import { PomodoroSession } from "@/components/PomodoroSession";

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "task-1",
    name: "Complete project proposal",
    priority: "high",
    plannedSessions: 4,
    completedSessions: 2,
    completed: false,
  },
  {
    id: "task-2",
    name: "Review team feedback",
    priority: "medium",
    plannedSessions: 2,
    completedSessions: 2,
    completed: true,
  },
  {
    id: "task-3",
    name: "Prepare presentation slides",
    priority: "high",
    plannedSessions: 3,
    completedSessions: 1,
    completed: false,
  },
  {
    id: "task-4",
    name: "Research new techniques",
    priority: "low",
    plannedSessions: 2,
    completedSessions: 0,
    completed: false,
  },
  {
    id: "task-5",
    name: "Weekly team meeting",
    priority: "medium",
    plannedSessions: 1,
    completedSessions: 0,
    completed: false,
  },
];

export default function AppPage() {
  const [activeSession, setActiveSession] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleStartSession = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setCurrentTask(task);
      setActiveSession(true);
    }
  };

  const handlePauseSession = () => {
    // In a real app, this would pause the timer
    setActiveSession(false);
  };

  const handleSkipSession = () => {
    setActiveSession(false);
    setCurrentTask(null);
  };

  const handleCompleteSession = () => {
    // In a real app, this would mark the session as completed
    if (currentTask) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === currentTask.id) {
          const newCompletedSessions = task.completedSessions + 1;
          return {
            ...task,
            completedSessions: newCompletedSessions,
            completed: newCompletedSessions >= task.plannedSessions,
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      setActiveSession(false);
      setCurrentTask(null);
    }
  };

  const handleAddTask = () => {
    // In a real app, this would open a dialog to add a new task
    console.log("Add task clicked");
  };

  const handleEditTask = (taskId: string) => {
    // In a real app, this would open a dialog to edit the task
    console.log("Edit task clicked", taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    // In a real app, this would show a confirmation dialog
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDateChange = (date: Date) => {
    console.log("Date selected:", date);
    // In a real app, this would filter tasks for the selected date
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto py-8">
        {/* Inspirational Quote */}
        <QuoteCard className="mb-8" />

        {/* Two-Panel Layout */}
        {!activeSession ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Task Table */}
            <AppTaskTable
              tasks={tasks}
              onStartSession={handleStartSession}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />

            {/* Calendar */}
            <AppCalendar tasks={tasks} onDateChange={handleDateChange} />
          </div>
        ) : (
          /* Pomodoro Session */
          <PomodoroSession
            task={currentTask}
            onPause={handlePauseSession}
            onSkip={handleSkipSession}
            onComplete={handleCompleteSession}
          />
        )}
      </div>
    </div>
  );
}
