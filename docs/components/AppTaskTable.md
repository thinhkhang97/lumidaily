# AppTaskTable Component

The `AppTaskTable` component displays a list of tasks in a table format, showing task names, pomodoro sessions, and action buttons.

## Visual Example

```
┌─────────────────────────────────────────────────────────────┐
│ Tasks                                       [+ Add Task]    │
├───────────────┬─────────────────────────────┬───────────────┤
│ Task (30%)    │ Pomodoros (50%)             │ Actions (20%) │
├───────────────┼─────────────────────────────┼───────────────┤
│ Task name     │ ●●●○○                       │ [Start] [✏] [🗑] │
├───────────────┼─────────────────────────────┼───────────────┤
│ Another task  │ ●●○○○○                      │ [Start] [✏] [🗑] │
└───────────────┴─────────────────────────────┴───────────────┘
```

## Features

- Displays tasks in a clean tabular format
- Shows task completion status through text styling (strikethrough for completed tasks)
- Visualizes planned and completed pomodoro sessions
- Interactive session indicators that users can click to update completion status
- Provides action buttons for starting sessions, editing, and deleting tasks
- Row highlighting on hover for better user experience
- Optimized column widths: 50% for Pomodoros, 30% for Task names, 20% for Actions

## Interactive Session Indicators

The component features interactive pomodoro session indicators that allow users to:

- Click on any session indicator to mark that session and all previous ones as completed
- Click on an earlier session to reduce the number of completed sessions
- Update session completion status even for tasks that are marked as completed
- Visual feedback with hover effects to indicate clickable indicators

## Usage

```tsx
import { AppTaskTable } from "@/components/AppTaskTable";

// Sample task data
const tasks = [
  {
    id: "1",
    name: "Complete project documentation",
    priority: "high",
    plannedSessions: 4,
    completedSessions: 2,
    completed: false,
  },
  {
    id: "2",
    name: "Review pull requests",
    priority: "medium",
    plannedSessions: 3,
    completedSessions: 3,
    completed: true,
  },
];

export default function TasksPage() {
  const handleStartSession = (taskId: string) => {
    // Logic to start a pomodoro session for the selected task
    console.log(`Starting session for task ${taskId}`);
  };

  const handleAddTask = () => {
    // Logic to open add task dialog/form
    console.log("Opening add task form");
  };

  const handleEditTask = (taskId: string) => {
    // Logic to edit the selected task
    console.log(`Editing task ${taskId}`);
  };

  const handleDeleteTask = (taskId: string) => {
    // Logic to delete the selected task
    console.log(`Deleting task ${taskId}`);
  };

  const handleUpdateSessionCount = (
    taskId: string,
    completedSessions: number
  ) => {
    // Logic to update the number of completed sessions for a task
    console.log(
      `Updating task ${taskId} to ${completedSessions} completed sessions`
    );
  };

  return (
    <div className="container mx-auto p-4">
      <AppTaskTable
        tasks={tasks}
        onStartSession={handleStartSession}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onUpdateSessionCount={handleUpdateSessionCount}
      />
    </div>
  );
}
```

## Props

| Prop                   | Type                                                  | Required | Description                                         |
| ---------------------- | ----------------------------------------------------- | -------- | --------------------------------------------------- |
| `tasks`                | `Task[]`                                              | Yes      | Array of task objects                               |
| `onStartSession`       | `(taskId: string) => void`                            | Yes      | Function called when the Start button is clicked    |
| `onAddTask`            | `() => void`                                          | No       | Function called when the Add Task button is clicked |
| `onEditTask`           | `(taskId: string) => void`                            | No       | Function called when the Edit button is clicked     |
| `onDeleteTask`         | `(taskId: string) => void`                            | No       | Function called when the Delete button is clicked   |
| `onUpdateSessionCount` | `(taskId: string, completedSessions: number) => void` | No       | Function called when a session indicator is clicked |

## Task Interface

```tsx
interface Task {
  id: string;
  name: string;
  priority: string;
  plannedSessions: number;
  completedSessions: number;
  completed: boolean;
}
```

## Styling

The component uses Tailwind CSS for styling and integrates with the application's theme through UI component classes like `border-border`, `bg-muted`, etc. Row highlighting is achieved with the `hover:bg-muted/30` class.

## Session Indicator Interaction

Session indicators are rendered as circles that can be clicked to update the task's completion status:

```tsx
<div
  className={`h-4 w-4 rounded-full border ${
    i < task.completedSessions ? "bg-primary border-primary" : "border-border"
  } ${
    onUpdateSessionCount
      ? "cursor-pointer hover:border-primary hover:opacity-80"
      : ""
  }`}
  onClick={() => handleSessionClick(task, i)}
  title={`Mark ${i + 1} session${i > 0 ? "s" : ""} as completed`}
/>
```

The `handleSessionClick` function determines how many sessions should be marked as completed based on which indicator was clicked:

```tsx
const handleSessionClick = (task: Task, sessionIndex: number) => {
  if (!onUpdateSessionCount) return;

  // Calculate new completed sessions count
  let newCompletedSessions = sessionIndex + 1; // Mark up to clicked index

  onUpdateSessionCount(task.id, newCompletedSessions);
};
```

## Notes

- The component is designed to be responsive, with the table having an `overflow-x-auto` wrapper to handle narrow viewports.
- Task completion status is visually indicated by strikethrough text.
- The Start button is disabled for completed tasks.
- The Add Task button is only shown if the `onAddTask` prop is provided.
- Edit and Delete buttons are only shown if their respective handler props are provided.
- Session indicators are interactive if the `onUpdateSessionCount` prop is provided.
