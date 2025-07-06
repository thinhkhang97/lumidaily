import { TaskService } from "@/lib/services/TaskService";
import { Task } from "@/lib/types";
import { isSameDay } from "date-fns";
import { useCallback, useMemo } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface UseTasksOptions {
  authState?: {
    isAuthenticated: boolean;
    token?: string;
  };
  initialDate?: Date;
}

// Fetcher function for SWR
const tasksFetcher = async (url: string, token?: string): Promise<Task[]> => {
  if (token) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } else {
    // Use local storage when no token
    return TaskService.getTasksFromLocalStorage();
  }
};

// Mutation function for creating/updating tasks
const updateTasksMutation = async (
  url: string,
  { arg }: { arg: { tasks: Task[]; token?: string } }
): Promise<Task[]> => {
  const { tasks, token } = arg;

  if (token) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tasks),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } else {
    // Use local storage when no token
    TaskService.saveTasksToLocalStorage(tasks);
    return tasks;
  }
};

export function useTasks(options: UseTasksOptions = {}) {
  const { authState, initialDate } = options;
  const selectedDate = initialDate || new Date();
  const isAuthenticated = authState?.isAuthenticated || false;
  const authToken = authState?.token;

  // SWR key for tasks
  const tasksKey = isAuthenticated ? "/api/tasks" : "tasks-local";

  // Fetch all tasks using SWR
  const {
    data: allTasks = [],
    error,
    isLoading,
    mutate,
  } = useSWR(tasksKey, (url: string) => tasksFetcher(url, authToken), {
    fallbackData: [],
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
  });

  // Mutation hook for updating tasks
  const { trigger: updateTasks, isMutating } = useSWRMutation(
    tasksKey,
    updateTasksMutation,
    {
      onSuccess: (data) => {
        // Optimistically update the cache
        mutate(data, false);
      },
      onError: (error) => {
        console.error("Error updating tasks:", error);
        // Revalidate on error to get the correct state
        mutate();
      },
    }
  );

  // Filter tasks for the selected date
  const tasks = useMemo(() => {
    return allTasks.filter((task) =>
      isSameDay(new Date(task.date), selectedDate)
    );
  }, [allTasks, selectedDate]);

  // Task manipulation functions
  const addTask = useCallback(
    async (task: Omit<Task, "id" | "date">, date?: Date) => {
      const taskDate = date || selectedDate;
      const newTask: Task = {
        ...task,
        id: `task-${Date.now()}`,
        date: taskDate.toISOString(),
      };

      const updatedTasks = [...allTasks, newTask];

      // Optimistic update
      mutate(updatedTasks, false);

      // Trigger the mutation
      try {
        await updateTasks({ tasks: updatedTasks, token: authToken });
      } catch (error) {
        console.error("Error adding task:", error);
        // Revert optimistic update on error
        mutate();
      }
    },
    [allTasks, selectedDate, mutate, updateTasks, authToken]
  );

  const updateTask = useCallback(
    async (id: string, updates: Partial<Omit<Task, "id" | "date">>) => {
      const updatedTasks = allTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );

      // Optimistic update
      mutate(updatedTasks, false);

      // Trigger the mutation
      try {
        await updateTasks({ tasks: updatedTasks, token: authToken });
      } catch (error) {
        console.error("Error updating task:", error);
        // Revert optimistic update on error
        mutate();
      }
    },
    [allTasks, mutate, updateTasks, authToken]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      const updatedTasks = allTasks.filter((task) => task.id !== id);

      // Optimistic update
      mutate(updatedTasks, false);

      // Trigger the mutation
      try {
        await updateTasks({ tasks: updatedTasks, token: authToken });
      } catch (error) {
        console.error("Error deleting task:", error);
        // Revert optimistic update on error
        mutate();
      }
    },
    [allTasks, mutate, updateTasks, authToken]
  );

  const moveTaskToDate = useCallback(
    async (taskId: string, newDate: Date) => {
      const dateString = newDate.toISOString();
      const updatedTasks = allTasks.map((task) =>
        task.id === taskId ? { ...task, date: dateString } : task
      );

      // Optimistic update
      mutate(updatedTasks, false);

      // Trigger the mutation
      try {
        await updateTasks({ tasks: updatedTasks, token: authToken });
      } catch (error) {
        console.error("Error moving task:", error);
        // Revert optimistic update on error
        mutate();
      }
    },
    [allTasks, mutate, updateTasks, authToken]
  );

  // Function to manually revalidate tasks
  const revalidate = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    tasks,
    allTasks,
    selectedDate,
    isLoading,
    isMutating,
    error,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToDate,
    revalidate,
  };
}
