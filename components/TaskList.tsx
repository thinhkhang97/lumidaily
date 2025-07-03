import React, { useState } from "react";
import { Plus, Share2 } from "lucide-react";
import { Task } from "@/lib/types";
import { TaskTable } from "./TaskTable";
import { TaskDialog } from "./TaskDialog";

interface TaskListProps {
  tasks: Task[];
  onAddTask: (name: string, plannedSessions: number) => void;
  onEditTask: (id: string, name: string, plannedSessions: number) => void;
  onDeleteTask: (id: string) => void;
  onToggleSession: (taskId: string, sessionIndex: number) => void;
  onStartPomodoro: (task: Task, sessionNumber: number) => void;
  onShowShareDialog?: () => void;
}

export function TaskList({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleSession,
  onStartPomodoro,
  onShowShareDialog,
}: TaskListProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (name: string, plannedSessions: number) => {
    onAddTask(name, plannedSessions);
    setShowAddDialog(false);
  };

  const handleEditTask = (name: string, plannedSessions: number) => {
    if (editingTask) {
      onEditTask(editingTask.id, name, plannedSessions);
      setEditingTask(null);
    }
  };

  return (
    <>
      <div className="paper-texture rounded-xl paper-shadow-lg border border-secondary/30 dark:border-secondary/20 mb-8">
        <div className="p-grid-4 border-b border-secondary/20 dark:border-secondary/10">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-2xl text-foreground">
              Tasks of the Day
            </h3>
            <div className="flex items-center space-x-3">
              {onShowShareDialog && (
                <button
                  onClick={onShowShareDialog}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-all duration-200 gentle-wobble paper-shadow border border-secondary/30"
                  title="Share your daily progress"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline font-body">Share</span>
                </button>
              )}
              <button
                onClick={() => setShowAddDialog(true)}
                className="flex items-center space-x-2 px-5 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 gentle-wobble paper-shadow border border-primary/30"
              >
                <Plus className="w-5 h-5" />
                <span className="font-body">Add Task</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-grid-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-secondary/50 dark:text-secondary/30 mb-6">
                <Plus className="w-20 h-20 mx-auto transform rotate-12" />
              </div>
              <p className="font-body text-foreground/70 dark:text-foreground/50 text-xl">
                No tasks for today. Use the &quot;Add Task&quot; button above to
                get started!
              </p>
            </div>
          ) : (
            <TaskTable
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={onDeleteTask}
              onToggleSession={onToggleSession}
              onStartPomodoro={onStartPomodoro}
            />
          )}
        </div>
      </div>

      {/* Add Task Dialog */}
      {showAddDialog && (
        <TaskDialog
          title="Add New Task"
          onSave={handleAddTask}
          onCancel={() => setShowAddDialog(false)}
        />
      )}

      {/* Edit Task Dialog */}
      {editingTask && (
        <TaskDialog
          title="Edit Task"
          initialName={editingTask.name}
          initialSessions={editingTask.plannedSessions}
          onSave={handleEditTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </>
  );
}
