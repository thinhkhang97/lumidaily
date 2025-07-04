"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-4 bg-[#F8E9D4] shadow-md border-none transition-all hover:shadow-lg">
      <div className="flex flex-col items-center">
        <h3 className="font-[Kalam] text-xl mb-4 text-[#6A6A6A]">
          {date ? format(date, "MMMM yyyy") : "Select a date"}
        </h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="font-[Patrick Hand] text-[#6A6A6A]"
          classNames={{
            day_selected:
              "bg-[#E89A4F] hover:bg-[#E89A4F]/90 transition-colors",
            day_today:
              "bg-[#D8BFD8] text-[#6A6A6A] hover:bg-[#D8BFD8]/80 transition-colors",
            button_previous:
              "text-[#6A6A6A] hover:bg-[#D8BFD8]/20 transition-colors",
            button_next:
              "text-[#6A6A6A] hover:bg-[#D8BFD8]/20 transition-colors",
            day: "hover:bg-[#D8BFD8]/10 transition-colors text-[#6A6A6A]",
            table: "border-separate border-spacing-1 text-[#6A6A6A]",
          }}
        />
      </div>
    </Card>
  );
}
