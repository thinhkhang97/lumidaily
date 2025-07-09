import { Note } from "@/lib/types";
import { TaskService } from "./TaskService";

// Generate a unique ID for notes
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export class NoteService {
  // Add a new note to a task
  static addNoteToTask(taskId: string, content: string): Note | null {
    try {
      // Get all tasks
      const tasks = TaskService.getTasksFromLocalStorage();

      // Find the task
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return null;

      // Create the new note
      const newNote: Note = {
        id: generateId(),
        content,
        createdAt: new Date().toISOString(),
        taskId,
      };

      // Initialize notes array if it doesn't exist
      if (!tasks[taskIndex].notes) {
        tasks[taskIndex].notes = [];
      }

      // Add the note to the task
      tasks[taskIndex].notes!.push(newNote);

      // Save tasks back to localStorage
      TaskService.saveTasksToLocalStorage(tasks);

      return newNote;
    } catch (error) {
      console.error("Error adding note to task:", error);
      return null;
    }
  }

  // Get all notes for a task
  static getNotesForTask(taskId: string): Note[] {
    try {
      const tasks = TaskService.getTasksFromLocalStorage();
      const task = tasks.find((task) => task.id === taskId);

      if (!task || !task.notes) return [];

      return task.notes;
    } catch (error) {
      console.error("Error getting notes for task:", error);
      return [];
    }
  }

  // Delete a note
  static deleteNote(taskId: string, noteId: string): boolean {
    try {
      // Get all tasks
      const tasks = TaskService.getTasksFromLocalStorage();

      // Find the task
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return false;

      // Check if task has notes
      if (!tasks[taskIndex].notes) return false;

      // Filter out the note to delete
      tasks[taskIndex].notes = tasks[taskIndex].notes!.filter(
        (note) => note.id !== noteId
      );

      // Save tasks back to localStorage
      TaskService.saveTasksToLocalStorage(tasks);

      return true;
    } catch (error) {
      console.error("Error deleting note:", error);
      return false;
    }
  }
}
