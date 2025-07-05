"use client";

import { useState, useCallback, useRef } from "react";
import { Task } from "@/lib/types";
import { QuoteCard } from "@/components/QuoteCard";
import { AppTaskTable } from "@/components/AppTaskTable";
import { AppCalendar } from "@/components/AppCalendar";
import { PomodoroSession } from "@/components/PomodoroSession";
import { TaskDialog } from "@/components/TaskDialog";
import { useTasks } from "@/lib/hooks/useTasks";
import { useAuth } from "@/lib/contexts/AuthContext";
import { formatDateString } from "@/lib/services/TaskService";

const POMODORO_TIME = 60 * 25;
const BREAK_TIME = 60 * 5;

export default function AppPage() {
  const { authState } = useAuth();
  const {
    tasks,
    allTasks,
    selectedDate,
    isLoading,
    error,
    changeDate,
    addTask: addTaskToStore,
    updateTask: updateTaskInStore,
    deleteTask: deleteTaskFromStore,
    moveTaskToDate,
  } = useTasks({
    authState,
    initialDate: new Date(), // Start with today's date
  });

  const [activeSession, setActiveSession] = useState<boolean>(false);
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
    if (currentTaskId.current) {
      const currentTask = tasks.find((t) => t.id === currentTaskId.current);
      if (!currentTask) return;

      const newCompletedSessions = currentTask.completedSessions + 1;
      const isCompleted = newCompletedSessions >= currentTask.plannedSessions;

      updateTaskInStore(currentTaskId.current, {
        completedSessions: newCompletedSessions,
        completed: isCompleted,
      });
    }
  }, [tasks, updateTaskInStore]);

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
    deleteTaskFromStore(taskId);
  };

  const handleUpdateSessionCount = (
    taskId: string,
    completedSessions: number
  ) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const isCompleted = completedSessions >= task.plannedSessions;
    updateTaskInStore(taskId, {
      completedSessions,
      completed: isCompleted,
    });
  };

  const handleDateChange = (date: Date) => {
    changeDate(date);
  };

  const handleSaveTask = (
    name: string,
    plannedSessions: number,
    date: Date
  ) => {
    if (editingTask) {
      // Update existing task
      updateTaskInStore(editingTask.id, {
        name,
        plannedSessions,
      });

      // If the date has changed, move the task to the new date
      const taskDateString = editingTask.date;
      const newDateString = formatDateString(date);
      if (taskDateString !== newDateString) {
        moveTaskToDate(editingTask.id, date);
      }
    } else {
      // Create new task with the selected date
      addTaskToStore(
        {
          name,
          priority: "medium", // Default priority
          plannedSessions,
          completedSessions: 0,
          completed: false,
        },
        date
      );
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

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        Error loading tasks: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto py-8">
        {/* Inspirational Quote */}
        <QuoteCard className="mb-8" />

        {/* Two-Panel Layout */}
        {!activeSession ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Task Table - Takes 3 columns (75% width) */}
            <div className="lg:col-span-3">
              <AppTaskTable
                tasks={tasks}
                onStartSession={handleStartSession}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onUpdateSessionCount={handleUpdateSessionCount}
              />
            </div>

            {/* Calendar - Takes 1 column (25% width) */}
            <div className="lg:col-span-1">
              <AppCalendar
                tasks={allTasks}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </div>
          </div>
        ) : (
          /* Pomodoro Session */
          <PomodoroSession
            initialTime={POMODORO_TIME}
            breakTime={BREAK_TIME}
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
            initialDate={
              editingTask
                ? new Date(editingTask.date + "T00:00:00")
                : selectedDate
            }
            onSave={handleSaveTask}
            onCancel={handleCancelTaskDialog}
          />
        )}
      </div>
    </div>
  );
}
