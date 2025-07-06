import { TaskService } from "@/lib/services/TaskService";
import { Task } from "@/lib/types";
import { isSameDay } from "date-fns";
import { useCallback, useEffect, useState } from "react";

interface UseTasksOptions {
  // Will be used later when authentication is implemented
  authState?: {
    isAuthenticated: boolean;
    token?: string;
  };
  initialDate?: Date; // Optional initial date to load tasks for
}

export function useTasks(options: UseTasksOptions = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]); // Store all tasks
  const [selectedDate, setSelectedDate] = useState<Date>(
    options.initialDate || new Date()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { authState } = options;
  const isAuthenticated = authState?.isAuthenticated || false;
  const authToken = authState?.token;

  // Load all tasks on initial render
  useEffect(() => {
    const loadAllTasks = async () => {
      setIsLoading(true);
      try {
        let loadedTasks: Task[];

        // If authenticated, try to load from API first
        if (isAuthenticated && authToken) {
          loadedTasks = await TaskService.fetchTasksFromApi(authToken);
        } else {
          // Otherwise load from localStorage
          loadedTasks = TaskService.getTasksFromLocalStorage();
        }

        setAllTasks(loadedTasks);

        // Filter tasks for the selected date
        const filteredTasks = loadedTasks.filter((task) =>
          isSameDay(new Date(task.date), selectedDate)
        );
        setTasks(filteredTasks);

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error loading tasks")
        );
        // Fall back to localStorage if API fails
        const localTasks = TaskService.getTasksFromLocalStorage();
        setAllTasks(localTasks);

        // Filter tasks for the selected date
        const filteredTasks = localTasks.filter((task) =>
          isSameDay(new Date(task.date), selectedDate)
        );
        setTasks(filteredTasks);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllTasks();
  }, [isAuthenticated, authToken]);

  // Filter tasks when selected date changes
  useEffect(() => {
    const filteredTasks = allTasks.filter((task) =>
      isSameDay(new Date(task.date), selectedDate)
    );
    setTasks(filteredTasks);
  }, [selectedDate, allTasks]);

  // Save all tasks whenever they change
  useEffect(() => {
    if (allTasks.length === 0 && isLoading) return; // Skip initial empty state

    const saveTasks = async () => {
      try {
        if (isAuthenticated && authToken) {
          await TaskService.saveTasksToApi(allTasks, authToken);
        } else {
          TaskService.saveTasksToLocalStorage(allTasks);
        }
      } catch (err) {
        console.error("Error saving tasks:", err);
        // Always save to localStorage as backup
        TaskService.saveTasksToLocalStorage(allTasks);
      }
    };

    saveTasks();
  }, [allTasks, isAuthenticated, authToken, isLoading]);

  // Change the selected date
  const changeDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Task manipulation functions
  const addTask = useCallback(
    (task: Omit<Task, "id" | "date">, date?: Date) => {
      const taskDate = date || selectedDate;
      const newTask: Task = {
        ...task,
        id: `task-${Date.now()}`,
        date: taskDate.toISOString(),
      };

      setAllTasks((currentTasks) => [...currentTasks, newTask]);
      // The filtered tasks will update automatically via the useEffect
    },
    [selectedDate]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Omit<Task, "id" | "date">>) => {
      setAllTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        )
      );
      // The filtered tasks will update automatically via the useEffect
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    setAllTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
    // The filtered tasks will update automatically via the useEffect
  }, []);

  // Move a task to a different date
  const moveTaskToDate = useCallback((taskId: string, newDate: Date) => {
    const dateString = newDate.toISOString();

    setAllTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, date: dateString } : task
      )
    );
    // The filtered tasks will update automatically via the useEffect
  }, []);

  return {
    tasks, // Tasks for the selected date only
    allTasks, // All tasks across all dates
    selectedDate,
    isLoading,
    error,
    changeDate,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToDate,
    setAllTasks, // Expose this for initialization or bulk updates
  };
}
