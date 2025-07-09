"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Note } from "@/lib/types";
import { NoteService } from "@/lib/services/NoteService";
import { format } from "date-fns";

interface NotePanelProps {
  isOpen: boolean;
  taskId: string | null;
  onClose: () => void;
}

export function NotePanel({ isOpen, taskId, onClose }: NotePanelProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  // Load notes when panel opens or taskId changes
  useEffect(() => {
    if (isOpen && taskId) {
      const taskNotes = NoteService.getNotesForTask(taskId);
      setNotes(taskNotes);
    }
  }, [isOpen, taskId]);

  const handleCreateNote = () => {
    setIsCreatingNote(true);
    setExpandedNoteId(null);
  };

  const handleSaveNote = () => {
    if (!taskId || !newNoteContent.trim()) return;

    const newNote = NoteService.addNoteToTask(taskId, newNoteContent.trim());
    if (newNote) {
      setNotes((prev) => [...prev, newNote]);
      setNewNoteContent("");
      setIsCreatingNote(false);
    }
  };

  const handleCancelCreate = () => {
    setNewNoteContent("");
    setIsCreatingNote(false);
  };

  const handleToggleNote = (noteId: string) => {
    setExpandedNoteId((prevId) => (prevId === noteId ? null : noteId));
  };

  const handleDeleteNote = (noteId: string, event: React.MouseEvent) => {
    // Stop propagation to prevent toggling the note when clicking delete
    event.stopPropagation();

    if (!taskId) return;

    const success = NoteService.deleteNote(taskId, noteId);
    if (success) {
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
      if (expandedNoteId === noteId) {
        setExpandedNoteId(null);
      }
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "MMM d, yyyy h:mm a");
    } catch {
      return "Unknown date";
    }
  };

  // Get a preview of note content (first 100 characters)
  const getNotePreview = (content: string, isExpanded: boolean) => {
    if (isExpanded) return content;
    return content.length > 100 ? `${content.substring(0, 100)}...` : content;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-card/95 backdrop-blur-md border-l shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Notes</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Note List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notes.length === 0 && !isCreatingNote ? (
              <div className="text-center py-8 text-muted-foreground">
                No notes yet. Create your first note!
              </div>
            ) : (
              <>
                {/* New Note Form */}
                {isCreatingNote && (
                  <div className="mb-4 border rounded-lg p-4 bg-card">
                    <div className="text-xs text-muted-foreground mb-2">
                      New Note
                    </div>
                    <Textarea
                      placeholder="Write your note here..."
                      className="min-h-[100px] mb-2"
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelCreate}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveNote}
                        disabled={!newNoteContent.trim()}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}

                {/* Note List */}
                {!isCreatingNote && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm mb-2">All Notes</h4>
                    {notes.map((note) => {
                      const isExpanded = expandedNoteId === note.id;
                      return (
                        <div
                          key={note.id}
                          className="border rounded-lg overflow-hidden transition-all duration-200"
                        >
                          <div
                            className="p-3 cursor-pointer hover:bg-accent/50 transition-colors flex justify-between items-start"
                            onClick={() => handleToggleNote(note.id)}
                          >
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
                                <span>{formatTimestamp(note.createdAt)}</span>
                                <div className="flex items-center">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-destructive"
                                    onClick={(e) =>
                                      handleDeleteNote(note.id, e)
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4 ml-1 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                              <div
                                className={`text-sm ${
                                  isExpanded
                                    ? "whitespace-pre-wrap"
                                    : "line-clamp-2"
                                }`}
                              >
                                {getNotePreview(note.content, isExpanded)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action Button */}
          {!isCreatingNote && (
            <div className="p-4 border-t">
              <Button
                className="w-full"
                onClick={handleCreateNote}
                disabled={!taskId}
              >
                <Plus className="h-4 w-4 mr-2" /> New Note
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
