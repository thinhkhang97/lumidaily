import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskDialogProps {
  title: string;
  initialName?: string;
  initialSessions?: number;
  onSave: (name: string, plannedSessions: number) => void;
  onCancel: () => void;
}

export function TaskDialog({
  title,
  initialName = "",
  initialSessions = 1,
  onSave,
  onCancel,
}: TaskDialogProps) {
  const [name, setName] = useState(initialName);
  const [plannedSessions, setPlannedSessions] = useState(initialSessions);
  const [open, setOpen] = useState(true);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, plannedSessions);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      onCancel();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              id="task-name"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessions">Planned Sessions</Label>
            <Select
              value={plannedSessions.toString()}
              onValueChange={(value) => setPlannedSessions(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of sessions" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "session" : "sessions"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
