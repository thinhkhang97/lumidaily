"use client";

import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the Task interface if not already imported
interface Task {
  id: string;
  name: string;
  priority: string;
  plannedSessions: number;
  completedSessions: number;
  completed: boolean;
}

interface AppTaskTableProps {
  tasks: Task[];
  onStartSession: (taskId: string) => void;
  onAddTask?: () => void;
  onEditTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onUpdateSessionCount?: (taskId: string, completedSessions: number) => void;
}

export function AppTaskTable({
  tasks,
  onStartSession,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onUpdateSessionCount,
}: AppTaskTableProps) {
  const handleSessionClick = (task: Task, sessionIndex: number) => {
    if (!onUpdateSessionCount) return;

    // Calculate new completed sessions count
    let newCompletedSessions;

    // If clicking on a session that's already completed or beyond
    if (sessionIndex < task.completedSessions) {
      // Set completed sessions to the clicked index + 1 (since indices are 0-based)
      newCompletedSessions = sessionIndex + 1;
    } else {
      // Mark all sessions up to and including the clicked one as completed
      newCompletedSessions = sessionIndex + 1;
    }

    onUpdateSessionCount(task.id, newCompletedSessions);
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        {onAddTask && (
          <Button onClick={onAddTask} size="sm">
            <Plus className="mr-1 size-4" />
            Add Task
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="pb-2 text-left w-[30%]">Task</th>
                <th className="pb-2 text-left w-[50%]">Pomodoros</th>
                <th className="pb-2 text-left w-[20%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-border/10 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3">
                    <span
                      className={
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }
                    >
                      {task.name}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      {Array(task.plannedSessions)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className={`h-4 w-4 rounded-full border ${
                              i < task.completedSessions
                                ? "bg-primary border-primary"
                                : "border-border"
                            } ${
                              onUpdateSessionCount
                                ? "cursor-pointer hover:border-primary hover:opacity-80"
                                : ""
                            }`}
                            onClick={() => handleSessionClick(task, i)}
                            title={`Mark ${i + 1} session${
                              i > 0 ? "s" : ""
                            } as completed`}
                          />
                        ))}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onStartSession(task.id)}
                        disabled={task.completed}
                      >
                        Start
                      </Button>
                      {onEditTask && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEditTask(task.id)}
                        >
                          <Edit className="size-4" />
                        </Button>
                      )}
                      {onDeleteTask && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteTask(task.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
