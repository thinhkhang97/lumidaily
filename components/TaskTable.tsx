import React from "react";
import { Play, Edit2, Trash2, Check, CheckCircle } from "lucide-react";
import { Task } from "@/lib/types";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleSession: (taskId: string, sessionIndex: number) => void;
  onStartPomodoro: (task: Task, sessionNumber: number) => void;
}

export function TaskTable({
  tasks,
  onEdit,
  onDelete,
  onToggleSession,
  onStartPomodoro,
}: TaskTableProps) {
  const getNextSessionToStart = (task: Task) => {
    for (let i = 0; i < task.plannedSessions; i++) {
      if (i >= task.completedSessions) {
        return i + 1;
      }
    }
    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-0">
      {/* Mobile Card Layout */}
      <div className="block sm:hidden space-y-4">
        {tasks.map((task) => {
          const nextSession = getNextSessionToStart(task);
          const isCompleted = task.completedSessions >= task.plannedSessions;

          return (
            <div
              key={task.id}
              className={`paper-texture rounded-xl p-grid-3 border ${
                isCompleted
                  ? "border-accent/50 dark:border-accent/30 bg-accent/10 dark:bg-accent/5"
                  : "border-secondary/30 dark:border-secondary/20 hover:border-secondary/50 dark:hover:border-secondary/40"
              } transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`font-kalam text-lg ${
                        isCompleted
                          ? "text-accent-foreground line-through opacity-70"
                          : "text-foreground"
                      }`}
                    >
                      {task.name}
                    </span>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg bg-secondary/20 dark:bg-secondary/10 text-foreground font-patrick text-sm border border-secondary/30 dark:border-secondary/20">
                      {task.plannedSessions} sessions
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 ml-2">
                  {nextSession && (
                    <button
                      onClick={() => onStartPomodoro(task, nextSession)}
                      className="p-2 text-primary hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/5 rounded-xl transition-all duration-200 gentle-wobble border border-transparent hover:border-primary/20 dark:hover:border-primary/10"
                      title={`Start Session ${nextSession}`}
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(task)}
                    className="p-2 text-secondary hover:text-secondary/80 hover:bg-secondary/10 dark:hover:bg-secondary/5 rounded-xl transition-all duration-200 gentle-wobble border border-transparent hover:border-secondary/20 dark:hover:border-secondary/10"
                    title="Edit task"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-destructive hover:text-destructive/80 hover:bg-destructive/10 dark:hover:bg-destructive/5 rounded-xl transition-all duration-200 gentle-wobble border border-transparent hover:border-destructive/20 dark:hover:border-destructive/10"
                    title="Delete task"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-start space-x-1 flex-wrap">
                {Array.from({ length: task.plannedSessions }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => onToggleSession(task.id, i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 gentle-wobble flex items-center justify-center text-xs font-patrick ${
                      i < task.completedSessions
                        ? "bg-accent border-accent/70 dark:border-accent/60 text-accent-foreground paper-shadow transform rotate-6"
                        : "border-secondary/50 dark:border-secondary/30 hover:border-secondary/70 dark:hover:border-secondary/50 bg-background/70 dark:bg-background/50 hover:bg-secondary/10 dark:hover:bg-secondary/5"
                    }`}
                    title={`Session ${i + 1} ${
                      i < task.completedSessions ? "(completed)" : "(pending)"
                    }`}
                  >
                    {i < task.completedSessions && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-secondary/20 dark:border-secondary/10">
              <th className="text-left py-4 px-3 font-kalam text-sm text-foreground/80 dark:text-foreground/70 uppercase tracking-wide">
                Task Name
              </th>
              <th className="text-center py-4 px-2 font-kalam text-sm text-foreground/80 dark:text-foreground/70 uppercase tracking-wide w-20">
                Total
              </th>
              <th className="text-left py-4 px-2 font-kalam text-sm text-foreground/80 dark:text-foreground/70 uppercase tracking-wide">
                Sessions
              </th>
              <th className="text-center py-4 px-3 font-kalam text-sm text-foreground/80 dark:text-foreground/70 uppercase tracking-wide w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-secondary/10 dark:divide-secondary/5 font-patrick">
            {tasks.map((task) => {
              const nextSession = getNextSessionToStart(task);
              const isCompleted =
                task.completedSessions >= task.plannedSessions;

              return (
                <tr
                  key={task.id}
                  className={`hover:bg-secondary/5 dark:hover:bg-secondary/5 transition-colors ${
                    isCompleted ? "bg-accent/10 dark:bg-accent/5" : ""
                  }`}
                >
                  <td className="py-4 px-3">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`font-kalam text-lg ${
                          isCompleted
                            ? "text-accent-foreground line-through opacity-70"
                            : "text-foreground"
                        }`}
                      >
                        {task.name}
                      </span>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-accent transform rotate-6" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-xl bg-secondary/20 dark:bg-secondary/10 text-foreground text-sm border border-secondary/30 dark:border-secondary/20">
                      {task.plannedSessions}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center justify-start space-x-1 flex-wrap">
                      {Array.from({ length: task.plannedSessions }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => onToggleSession(task.id, i)}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-200 gentle-wobble flex items-center justify-center text-xs ${
                            i < task.completedSessions
                              ? "bg-accent border-accent/70 dark:border-accent/60 text-accent-foreground paper-shadow transform rotate-6"
                              : "border-secondary/50 dark:border-secondary/30 hover:border-secondary/70 dark:hover:border-secondary/50 bg-background/70 dark:bg-background/50 hover:bg-secondary/10 dark:hover:bg-secondary/5"
                          }`}
                          title={`Session ${i + 1} ${
                            i < task.completedSessions
                              ? "(completed)"
                              : "(pending)"
                          }`}
                        >
                          {i < task.completedSessions && (
                            <Check className="w-3 h-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center justify-center space-x-1">
                      {nextSession && (
                        <button
                          onClick={() => onStartPomodoro(task, nextSession)}
                          className="p-2 text-primary hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/5 rounded-xl transition-all duration-200 gentle-wobble border border-transparent hover:border-primary/20 dark:hover:border-primary/10"
                          title={`Start Session ${nextSession}`}
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-secondary hover:text-secondary/80 hover:bg-secondary/10 dark:hover:bg-secondary/5 rounded-xl transition-all duration-200 gentle-wobble border border-transparent hover:border-secondary/20 dark:hover:border-secondary/10"
                        title="Edit task"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-destructive hover:text-destructive/80 hover:bg-destructive/10 dark:hover:bg-destructive/5 rounded-xl transition-all duration-200 gentle-wobble border border-transparent hover:border-destructive/20 dark:hover:border-destructive/10"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
