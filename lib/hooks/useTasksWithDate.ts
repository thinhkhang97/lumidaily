import { useState, useCallback } from "react";
import { useTasks } from "./useTasks";

interface UseTasksWithDateOptions {
  authState?: {
    isAuthenticated: boolean;
    token?: string;
  };
  initialDate?: Date;
}

export function useTasksWithDate(options: UseTasksWithDateOptions = {}) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    options.initialDate || new Date()
  );

  const {
    tasks,
    allTasks,
    isLoading,
    isMutating,
    error,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToDate,
    revalidate,
  } = useTasks({
    ...options,
    initialDate: selectedDate,
  });

  const changeDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  return {
    tasks,
    allTasks,
    selectedDate,
    isLoading,
    isMutating,
    error,
    changeDate,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToDate,
    revalidate,
  };
}
