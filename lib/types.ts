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

export interface PomodoroConfig {
  pomodoroMinutes: number;
  breakMinutes: number;
  volume: number; // 0-100
}

// Music-related interfaces for playlist feature
export interface MusicTrack {
  id: string;
  title: string;
  url: string;
  videoId: string;
  addedAt: string; // ISO format date string
  duration?: number; // in seconds
}

export interface Playlist {
  tracks: MusicTrack[];
  currentIndex: number;
  lastUpdated: string; // ISO format date string
}
