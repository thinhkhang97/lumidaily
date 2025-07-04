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
- Provides action buttons for starting sessions, editing, and deleting tasks
- Row highlighting on hover for better user experience
- Optimized column widths: 50% for Pomodoros, 30% for Task names, 20% for Actions

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

  return (
    <div className="container mx-auto p-4">
      <AppTaskTable
        tasks={tasks}
        onStartSession={handleStartSession}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
```

## Props

| Prop             | Type                       | Required | Description                                         |
| ---------------- | -------------------------- | -------- | --------------------------------------------------- |
| `tasks`          | `Task[]`                   | Yes      | Array of task objects                               |
| `onStartSession` | `(taskId: string) => void` | Yes      | Function called when the Start button is clicked    |
| `onAddTask`      | `() => void`               | No       | Function called when the Add Task button is clicked |
| `onEditTask`     | `(taskId: string) => void` | No       | Function called when the Edit button is clicked     |
| `onDeleteTask`   | `(taskId: string) => void` | No       | Function called when the Delete button is clicked   |

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

## Notes

- The component is designed to be responsive, with the table having an `overflow-x-auto` wrapper to handle narrow viewports.
- Task completion status is visually indicated by strikethrough text.
- The Start button is disabled for completed tasks.
- The Add Task button is only shown if the `onAddTask` prop is provided.
- Edit and Delete buttons are only shown if their respective handler props are provided.
