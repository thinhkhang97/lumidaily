export interface Task {
  id: string;
  name: string;
  priority: "high" | "medium" | "low";
  plannedSessions: number;
  completedSessions: number;
  completed: boolean;
}

export interface Quote {
  text: string;
  author?: string;
}
