// No need to import YouTubePlayer here as we'll use it in the component files

export interface Task {
  id: string;
  name: string;
  plannedSessions: number;
  completedSessions: number;
}

export interface PomodoroSessionProps {
  task: Task | null;
  initialTime?: number;
  breakTime?: number;
  volume?: number;
  onComplete?: () => void;
  onCancel?: () => void;
}

export enum SessionState {
  WORK = "work",
  BREAK = "break",
  COMPLETED_TASK = "completed-task",
}

// Define vendor-prefixed fullscreen API interfaces
export interface FullScreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export interface FullScreenDocument extends Document {
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}
