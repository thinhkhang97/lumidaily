import { Task } from "@/lib/types";

// Key for storing tasks in localStorage
const TASKS_STORAGE_KEY = "lumi-tasks";

// Helper to get today's date in YYYY-MM-DD format
export const getTodayDateString = (): string => {
  return new Date().toISOString().split("T")[0];
};

// Helper to format any date to YYYY-MM-DD
export const formatDateString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Helper to create sample data for testing
export const createSampleTasks = (): Task[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return [
    {
      id: "sample-1",
      name: "Complete project proposal",
      priority: "high",
      plannedSessions: 4,
      completedSessions: 2,
      completed: false,
      date: formatDateString(today),
    },
    {
      id: "sample-2",
      name: "Review team feedback",
      priority: "medium",
      plannedSessions: 2,
      completedSessions: 2,
      completed: true,
      date: formatDateString(yesterday),
    },
    {
      id: "sample-3",
      name: "Prepare presentation slides",
      priority: "high",
      plannedSessions: 3,
      completedSessions: 1,
      completed: false,
      date: formatDateString(today),
    },
    {
      id: "sample-4",
      name: "Research new techniques",
      priority: "low",
      plannedSessions: 2,
      completedSessions: 0,
      completed: false,
      date: formatDateString(tomorrow),
    },
    {
      id: "sample-5",
      name: "Weekly team meeting",
      priority: "medium",
      plannedSessions: 1,
      completedSessions: 0,
      completed: false,
      date: formatDateString(today),
    },
  ];
};

export class TaskService {
  // Local storage methods
  static getTasksFromLocalStorage(): Task[] {
    if (typeof window === "undefined") return [];

    try {
      const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
      const tasks = tasksJson ? JSON.parse(tasksJson) : [];

      // If no tasks exist, initialize with sample data
      // if (tasks.length === 0) {
      //   const sampleTasks = createSampleTasks();
      //   this.saveTasksToLocalStorage(sampleTasks);
      //   return sampleTasks;
      // }

      return tasks;
    } catch (error) {
      console.error("Error reading tasks from localStorage:", error);
      return [];
    }
  }

  static saveTasksToLocalStorage(tasks: Task[]): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }

  // Get tasks for a specific date
  static getTasksByDate(date: Date): Task[] {
    const tasks = this.getTasksFromLocalStorage();
    const dateString = formatDateString(date);

    return tasks.filter((task) => task.date === dateString);
  }

  // API methods (to be implemented when authentication is added)
  static async fetchTasksFromApi(authToken: string): Promise<Task[]> {
    try {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks from API:", error);
      // Fall back to local storage if API fails
      return this.getTasksFromLocalStorage();
    }
  }

  // Fetch tasks for a specific date from API
  static async fetchTasksByDateFromApi(
    date: Date,
    authToken: string
  ): Promise<Task[]> {
    const dateString = formatDateString(date);

    try {
      const response = await fetch(`/api/tasks?date=${dateString}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Error fetching tasks for date ${dateString} from API:`,
        error
      );
      // Fall back to local storage if API fails
      return this.getTasksByDate(date);
    }
  }

  static async saveTasksToApi(
    tasks: Task[],
    authToken: string
  ): Promise<boolean> {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(tasks),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error saving tasks to API:", error);
      // Fall back to local storage if API fails
      this.saveTasksToLocalStorage(tasks);
      return false;
    }
  }
}
