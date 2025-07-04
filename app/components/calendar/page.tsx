import { CalendarDemo } from "@/components/CalendarDemo";

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-[Kalam] mb-6 text-[#6A6A6A]">
        Calendar Component
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-[Kalam] mb-4 text-[#6A6A6A]">Features</h2>
          <ul className="list-disc pl-5 font-[Patrick Hand] text-[#6A6A6A] space-y-2">
            <li>Shows current month by default</li>
            <li>Navigate to previous and next months</li>
            <li>Highlights selected date</li>
            <li>Today&apos;s date is highlighted with Lumi Lavender</li>
            <li>Follows UI guidelines with paper-inspired design</li>
          </ul>
        </div>
        <div>
          <CalendarDemo />
        </div>
      </div>
    </div>
  );
}
