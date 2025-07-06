"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useConfig } from "@/lib/hooks/useConfig";
import { PomodoroConfig } from "@/lib/types";

interface ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfigDialog({ open, onOpenChange }: ConfigDialogProps) {
  const { config, updateConfig, isLoading, isMutating, error } = useConfig();
  const [formValues, setFormValues] = useState<PomodoroConfig>({ ...config });

  // Update form values when config changes
  useEffect(() => {
    setFormValues({ ...config });
  }, [config]);

  const handleInputChange = (field: keyof PomodoroConfig, value: number) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateConfig(formValues);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update config:", error);
      // Keep the dialog open to show the error
    }
  };

  const handleCancel = () => {
    setFormValues({ ...config });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pomodoro Settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pomodoro-minutes">
              Pomodoro Duration (minutes)
            </Label>
            <Input
              id="pomodoro-minutes"
              type="number"
              min="1"
              max="60"
              value={formValues.pomodoroMinutes}
              onChange={(e) =>
                handleInputChange("pomodoroMinutes", parseInt(e.target.value))
              }
              disabled={isLoading || isMutating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="break-minutes">Break Duration (minutes)</Label>
            <Input
              id="break-minutes"
              type="number"
              min="1"
              max="30"
              value={formValues.breakMinutes}
              onChange={(e) =>
                handleInputChange("breakMinutes", parseInt(e.target.value))
              }
              disabled={isLoading || isMutating}
            />
          </div>

          <div className="space-y-4">
            <Label>Volume: {formValues.volume}%</Label>
            <Slider
              value={[formValues.volume]}
              onValueChange={(value) => handleInputChange("volume", value[0])}
              max={100}
              min={0}
              step={10}
              disabled={isLoading || isMutating}
            />
          </div>

          {error && (
            <div className="text-destructive text-sm">
              Failed to save configuration. Please try again.
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isMutating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isMutating}>
              {isMutating ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
