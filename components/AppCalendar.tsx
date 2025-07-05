"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface Task {
  id: string;
  name: string;
  priority: string;
}

interface AppCalendarProps {
  tasks?: Task[];
  onDateChange?: (date: Date) => void;
}

export function AppCalendar({ tasks = [], onDateChange }: AppCalendarProps) {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      if (onDateChange) {
        onDateChange(newDate);
      }
    }
  };

  // Filter tasks for display - in a real app, this would filter by the selected date
  const displayTasks = tasks.slice(0, 3); // Just show first 3 tasks as an example

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="rounded-md border"
        />
        <div className="mt-4">
          <h3 className="mb-2 font-heading">
            Tasks for {format(date, "MMMM d, yyyy")}
          </h3>
          {displayTasks.length > 0 ? (
            <ul className="space-y-2">
              {displayTasks.slice(0, 3).map((task) => (
                <li key={task.id} className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-destructive"
                        : task.priority === "medium"
                        ? "bg-primary"
                        : "bg-accent"
                    }`}
                  />
                  <span>{task.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">
              No tasks scheduled for this day
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
