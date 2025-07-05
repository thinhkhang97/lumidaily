export interface Task {
  id: string;
  name: string;
  priority: "high" | "medium" | "low";
  plannedSessions: number;
  completedSessions: number;
  completed: boolean;
  date: string; // ISO format date string (YYYY-MM-DD)
}

export interface Quote {
  text: string;
  author?: string;
}
