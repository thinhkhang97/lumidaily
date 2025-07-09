"use client";

import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";
import { useMemo } from "react";
import { isSameDay } from "date-fns";

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

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      onDateChange(newDate);
    }
  };

  // Custom modifiers for the calendar to highlight dates with tasks
  const modifiers = {
    hasTasks: (date: Date) => {
      return Array.from(datesWithTasks).some((taskDate) =>
        isSameDay(taskDate, date)
      );
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
      </CardContent>
    </Card>
  );
}
