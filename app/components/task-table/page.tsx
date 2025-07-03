"use client";

import React, { useState } from "react";
import { TaskTable } from "@/components/TaskTable";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function TaskTablePage() {
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

  const handleEdit = (task: Task) => {
    alert(`Edit task: ${task.name}`);
  };

  const handleDelete = (id: string) => {
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

  // Add a demo task
  const addDemoTask = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const newTask: Task = {
      id,
      name: `Task ${tasks.length + 1}`,
      plannedSessions: Math.floor(Math.random() * 5) + 1,
      completedSessions: 0,
    };
    setTasks([...tasks, newTask]);
  };

  // Clear all tasks
  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Task Table Component</h1>
        <p className="text-muted-foreground mb-8">
          A responsive task table that displays differently on mobile and
          desktop.
        </p>

        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={addDemoTask} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Demo Task</span>
          </Button>
          <Button
            variant="destructive"
            onClick={clearTasks}
            className="flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Clear Tasks</span>
          </Button>
        </div>

        <div className="bg-background/50 p-8 rounded-xl border border-border">
          <TaskTable
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleSession={handleToggleSession}
            onStartPomodoro={handleStartPomodoro}
          />

          {tasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No tasks to display. Add a demo task to see the component in
                action.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
