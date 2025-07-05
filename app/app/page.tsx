"use client";

import { useState, useCallback, useRef } from "react";
import { Task } from "@/lib/types";
import { QuoteCard } from "@/components/QuoteCard";
import { AppTaskTable } from "@/components/AppTaskTable";
import { AppCalendar } from "@/components/AppCalendar";
import { PomodoroSession } from "@/components/PomodoroSession";
import { TaskDialog } from "@/components/TaskDialog";

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
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showTaskDialog, setShowTaskDialog] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const currentTaskId = useRef<string | null>(null);

  const handleStartSession = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      currentTaskId.current = task.id;
      setActiveSession(true);
    }
  };

  // Use useCallback to prevent recreation of this function on every render
  const handleCompleteSession = useCallback(() => {
    if (currentTaskId) {
      setTasks((prevTasks) => {
        const currentTask = prevTasks.find(
          (t) => t.id === currentTaskId.current
        );
        if (!currentTask) return prevTasks;

        const newCompletedSessions = currentTask.completedSessions + 1;
        const updatedTask = {
          ...currentTask,
          completedSessions: newCompletedSessions,
          completed: newCompletedSessions >= currentTask.plannedSessions,
        };

        // Update the tasks list
        const updatedTasks = prevTasks.map((task) =>
          task.id === currentTaskId.current ? updatedTask : task
        );

        return updatedTasks;
      });
    }
  }, []);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskDialog(true);
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setShowTaskDialog(true);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    // In a real app, this would show a confirmation dialog
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleUpdateSessionCount = (
    taskId: string,
    completedSessions: number
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const isCompleted = completedSessions >= task.plannedSessions;
        return {
          ...task,
          completedSessions,
          completed: isCompleted,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDateChange = (date: Date) => {
    console.log("Date selected:", date);
    // In a real app, this would filter tasks for the selected date
  };

  const handleSaveTask = (name: string, plannedSessions: number) => {
    if (editingTask) {
      // Update existing task
      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTask.id) {
          return {
            ...task,
            name,
            plannedSessions,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
    } else {
      // Create new task
      const newTask: Task = {
        id: `task-${Date.now()}`,
        name,
        priority: "medium", // Default priority
        plannedSessions,
        completedSessions: 0,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    setShowTaskDialog(false);
    setEditingTask(null);
  };

  const handleCancelTaskDialog = () => {
    setShowTaskDialog(false);
    setEditingTask(null);
  };

  const handleCancelSession = () => {
    setActiveSession(false);
    currentTaskId.current = null;
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
              onUpdateSessionCount={handleUpdateSessionCount}
            />

            {/* Calendar */}
            <AppCalendar tasks={tasks} onDateChange={handleDateChange} />
          </div>
        ) : (
          /* Pomodoro Session */
          <PomodoroSession
            task={tasks.find((t) => t.id === currentTaskId.current) || null}
            onComplete={handleCompleteSession}
            onCancel={handleCancelSession}
          />
        )}

        {/* Task Dialog */}
        {showTaskDialog && (
          <TaskDialog
            title={editingTask ? "Edit Task" : "Add New Task"}
            initialName={editingTask?.name || ""}
            initialSessions={editingTask?.plannedSessions || 1}
            onSave={handleSaveTask}
            onCancel={handleCancelTaskDialog}
          />
        )}
      </div>
    </div>
  );
}
