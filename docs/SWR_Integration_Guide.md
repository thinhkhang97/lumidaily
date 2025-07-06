# SWR Integration Guide

This guide explains how SWR (Stale-While-Revalidate) has been integrated into your LumiDaily application for efficient data fetching and caching.

## Overview

SWR is now used for:

- **Tasks management**: Fetching, caching, and updating tasks
- **Configuration management**: Managing pomodoro settings
- **Optimistic updates**: Immediate UI updates with fallback on errors
- **Automatic revalidation**: Fresh data on focus, reconnection, etc.

## Key Features

### 1. Automatic Caching & Revalidation

- Data is cached automatically
- Revalidates on window focus, network reconnection
- Configurable revalidation intervals

### 2. Optimistic Updates

- UI updates immediately when you make changes
- Automatically reverts if the operation fails
- Provides better user experience

### 3. Loading & Error States

- Built-in loading indicators
- Comprehensive error handling
- Graceful fallbacks to localStorage

### 4. Offline Support

- Falls back to localStorage when API is unavailable
- Seamless transition between online/offline modes

## Updated Hooks

### useTasks Hook

```typescript
import { useTasks } from "@/lib/hooks/useTasks";

function MyComponent() {
  const {
    tasks, // Tasks for current date
    allTasks, // All tasks across dates
    selectedDate, // Currently selected date
    isLoading, // Loading state
    isMutating, // Mutation in progress
    error, // Any errors
    addTask, // Add new task
    updateTask, // Update existing task
    deleteTask, // Delete task
    moveTaskToDate, // Move task to different date
    revalidate, // Manually refresh data
  } = useTasks({
    authState: { isAuthenticated: false }, // Optional auth
    initialDate: new Date(), // Optional initial date
  });

  // All operations are async now
  const handleAddTask = async () => {
    try {
      await addTask({ name: "New Task", priority: "high", plannedSessions: 3 });
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };
}
```

### useConfig Hook

```typescript
import { useConfig } from "@/lib/hooks/useConfig";

function ConfigComponent() {
  const {
    config, // Current config
    updateConfig, // Update config
    isLoading, // Loading state
    isMutating, // Mutation in progress
    error, // Any errors
    revalidate, // Manually refresh
  } = useConfig({
    authState: { isAuthenticated: false }, // Optional auth
  });

  const handleUpdateConfig = async () => {
    try {
      await updateConfig({ pomodoroMinutes: 30 });
    } catch (error) {
      console.error("Failed to update config:", error);
    }
  };
}
```

### useTasksWithDate Hook

For components that need date management:

```typescript
import { useTasksWithDate } from "@/lib/hooks/useTasksWithDate";

function TaskManager() {
  const {
    tasks,
    selectedDate,
    changeDate, // Change selected date
    addTask,
    updateTask,
    deleteTask,
    // ... all other task operations
  } = useTasksWithDate({
    initialDate: new Date(),
  });

  return (
    <div>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => changeDate(new Date(e.target.value))}
      />
      {/* Task list for selected date */}
    </div>
  );
}
```

## SWR Provider Configuration

The app is wrapped with SWRProvider in `app/layout.tsx`:

```typescript
<SWRProvider>
  <MainNavbar />
  <main className="min-h-screen">{children}</main>
  <Toaster />
</SWRProvider>
```

Configuration includes:

- **Deduplication**: Prevents duplicate requests within 5 seconds
- **Retry logic**: Retries failed requests up to 3 times
- **Focus revalidation**: Refreshes data when window regains focus
- **Error handling**: Global error logging

## API Integration

### Current Implementation

- **Development**: Uses localStorage with API fallback
- **Production-ready**: APIs are structured for database integration

### API Endpoints

- `GET /api/tasks` - Fetch all tasks
- `PUT /api/tasks` - Update tasks
- `GET /api/config` - Fetch config
- `PUT /api/config` - Update config

## Migration Notes

### Before (Manual State Management)

```typescript
// Old way
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  loadTasks();
}, []);

const addTask = async (task) => {
  try {
    const newTask = await createTask(task);
    setTasks((prev) => [...prev, newTask]);
  } catch (error) {
    console.error(error);
  }
};
```

### After (SWR)

```typescript
// New way
const { tasks, isLoading, error, addTask } = useTasks();

// Operations are simpler and include optimistic updates
const handleAddTask = async (task) => {
  await addTask(task); // Handles optimistic updates automatically
};
```

## Benefits

1. **Reduced Boilerplate**: No manual loading/error state management
2. **Better UX**: Optimistic updates provide immediate feedback
3. **Automatic Sync**: Data stays fresh across tabs/windows
4. **Offline Support**: Graceful degradation when API is unavailable
5. **Caching**: Reduces unnecessary API calls
6. **Error Recovery**: Automatic retries and fallbacks

## Component Updates

### Updated Components

- ✅ `ConfigDialog.tsx` - Now uses SWR-based useConfig
- ✅ `useTasks.ts` - Converted to SWR
- ✅ `useConfig.ts` - Converted to SWR

### Components to Update

- `TaskList.tsx` - Update to use async task operations
- `AppTaskTable.tsx` - Update to use async task operations
- `TaskTable.tsx` - Update to use async task operations

## Testing

### Test SWR Integration

```typescript
// Test optimistic updates
await addTask({ name: "Test Task", priority: "high", plannedSessions: 1 });
// Task should appear immediately in UI

// Test error handling
// Disconnect network, try to add task
// Should show error state but maintain optimistic update

// Test revalidation
// Focus/blur window
// Should refresh data from server
```

## Future Enhancements

1. **Real-time Updates**: Add WebSocket support for real-time collaboration
2. **Offline Queue**: Queue mutations when offline, sync when online
3. **Advanced Caching**: Add cache invalidation strategies
4. **Background Sync**: Periodic background synchronization

## Troubleshooting

### Common Issues

1. **Stale Data**: Use `revalidate()` to manually refresh
2. **Network Errors**: Check error state and provide user feedback
3. **Optimistic Update Conflicts**: Ensure proper error handling reverts UI

### Debug Tips

- Use browser DevTools to inspect SWR cache
- Enable SWR debugging in development
- Check console for SWR success/error logs

## Best Practices

1. **Always handle errors** in async operations
2. **Use loading states** for better UX
3. **Provide user feedback** for mutations
4. **Test offline scenarios** thoroughly
5. **Keep cache keys consistent** across components

This integration provides a solid foundation for scalable, efficient data management in your LumiDaily application.
