"use client";

import { Check, Edit, Trash2, Plus } from "lucide-react";
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
}

export function AppTaskTable({
  tasks,
  onStartSession,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: AppTaskTableProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="pb-2 text-left">Status</th>
                <th className="pb-2 text-left">Task</th>
                <th className="pb-2 text-left">Priority</th>
                <th className="pb-2 text-left">Pomodoros</th>
                <th className="pb-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-border/10">
                  <td className="py-3">
                    <Button
                      variant={task.completed ? "success" : "ghost"}
                      size="sm"
                      className="rounded-full p-1"
                    >
                      {task.completed && <Check className="size-4" />}
                    </Button>
                  </td>
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
                    <div
                      className={`inline-block h-3 w-3 rounded-full ${
                        task.priority === "high"
                          ? "bg-destructive"
                          : task.priority === "medium"
                          ? "bg-primary"
                          : "bg-accent"
                      }`}
                    />
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
                            }`}
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
        {onAddTask && (
          <div className="mt-4 flex justify-end">
            <Button onClick={onAddTask}>
              <Plus className="mr-1 size-4" />
              Add Task
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
