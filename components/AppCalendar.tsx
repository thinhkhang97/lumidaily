"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Task } from "@/lib/types";
import { formatDateString } from "@/lib/services/TaskService";

interface AppCalendarProps {
  tasks: Task[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function AppCalendar({
  tasks,
  selectedDate,
  onDateChange,
}: AppCalendarProps) {
  // Calculate dates with tasks for highlighting in the calendar
  const datesWithTasks = useMemo(() => {
    const dates = new Set<string>();
    tasks.forEach((task) => {
      dates.add(task.date);
    });
    return dates;
  }, [tasks]);

  // Filter tasks for the selected date
  const tasksForSelectedDate = useMemo(() => {
    const dateString = formatDateString(selectedDate);
    return tasks.filter((task) => task.date === dateString);
  }, [tasks, selectedDate]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      onDateChange(newDate);
    }
  };

  // Custom modifiers for the calendar to highlight dates with tasks
  const modifiers = {
    hasTasks: (date: Date) => {
      const dateString = formatDateString(date);
      return datesWithTasks.has(dateString);
    },
  };

  // Custom modifiers styles
  const modifiersStyles = {
    hasTasks: {
      backgroundColor: "var(--lumi-lavender)",
      color: "var(--lumi-deep-slate)",
      borderRadius: "0.5rem",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          className="rounded-md border"
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
        />
        <div className="mt-4">
          <h3 className="mb-2 font-heading">
            Tasks for {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          {tasksForSelectedDate.length > 0 ? (
            <ul className="space-y-2">
              {tasksForSelectedDate.slice(0, 3).map((task) => (
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
                  <span
                    className={
                      task.completed ? "line-through text-muted-foreground" : ""
                    }
                  >
                    {task.name}
                  </span>
                </li>
              ))}
              {tasksForSelectedDate.length > 3 && (
                <li className="text-sm text-muted-foreground">
                  +{tasksForSelectedDate.length - 3} more tasks
                </li>
              )}
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
