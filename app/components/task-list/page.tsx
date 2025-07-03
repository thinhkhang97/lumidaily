"use client";

import React, { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { Task } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Complete project proposal",
      plannedSessions: 3,
      completedSessions: 2,
    },
    {
      id: "2",
      name: "Review documentation",
      plannedSessions: 2,
      completedSessions: 2,
    },
    {
      id: "3",
      name: "Prepare presentation",
      plannedSessions: 4,
      completedSessions: 1,
    },
  ]);

  const handleAddTask = (name: string, plannedSessions: number) => {
    const newTask: Task = {
      id: uuidv4(),
      name,
      plannedSessions,
      completedSessions: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (
    id: string,
    name: string,
    plannedSessions: number
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name, plannedSessions } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleSession = (taskId: string, sessionIndex: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          // If the session is already completed, mark it as incomplete
          // If it's incomplete, mark it as complete
          const newCompletedSessions =
            sessionIndex < task.completedSessions
              ? sessionIndex
              : sessionIndex + 1;

          return {
            ...task,
            completedSessions: newCompletedSessions,
          };
        }
        return task;
      })
    );
  };

  const handleStartPomodoro = (task: Task, sessionNumber: number) => {
    alert(`Starting session ${sessionNumber} for task: ${task.name}`);
  };

  const handleShowShareDialog = () => {
    alert("Share dialog would open here");
  };

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Task List Component</h1>
        <p className="text-muted-foreground mb-8">
          A fully interactive task management component with Pomodoro session
          tracking.
        </p>

        <div className="bg-background/50 p-8 rounded-xl border border-border">
          <TaskList
            tasks={tasks}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleSession={handleToggleSession}
            onStartPomodoro={handleStartPomodoro}
            onShowShareDialog={handleShowShareDialog}
          />
        </div>
      </div>
    </div>
  );
}
