"use client";

import { useState } from "react";
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
  const { config, updateConfig } = useConfig();
  const [formValues, setFormValues] = useState<PomodoroConfig>({ ...config });

  const handleInputChange = (field: keyof PomodoroConfig, value: number) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formValues);
    onOpenChange(false);
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
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pomodoroMinutes">
                Pomodoro Session (minutes)
              </Label>
              <Input
                id="pomodoroMinutes"
                type="number"
                min={1}
                max={60}
                value={formValues.pomodoroMinutes}
                onChange={(e) =>
                  handleInputChange("pomodoroMinutes", parseInt(e.target.value))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakMinutes">Break Time (minutes)</Label>
              <Input
                id="breakMinutes"
                type="number"
                min={1}
                max={30}
                value={formValues.breakMinutes}
                onChange={(e) =>
                  handleInputChange("breakMinutes", parseInt(e.target.value))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Volume ({formValues.volume}%)</Label>
              <Slider
                id="volume"
                defaultValue={[formValues.volume]}
                max={100}
                step={1}
                onValueChange={(values) =>
                  handleInputChange("volume", values[0])
                }
                className="py-4"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
