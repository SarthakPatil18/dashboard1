import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Download, Filter, Share2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { TimetableGrid } from "@/components/dashboard/TimetableGrid";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/timetables")({
  head: () => ({
    meta: [
      { title: "Timetables — CampusCompass ATS" },
      { name: "description", content: "View, filter, and export generated weekly timetables with color-coded lectures." },
    ],
  }),
  component: TimetablesPage,
});

const versions = [
  { name: "Sem 3 · CSE-3A", score: 95, active: true },
  { name: "Sem 3 · CSE-3B", score: 92 },
  { name: "Sem 4 · IT-4A", score: 96 },
  { name: "Sem 4 · AI-4A", score: 88 },
];

function TimetablesPage() {
  return (
    <DashboardLayout title="Timetables" subtitle="Generated schedules · Monday to Saturday">
      <div className="mb-4 flex flex-wrap gap-2">
        {versions.map((v) => (
          <button
            key={v.name}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
              v.active ? "border-primary/40 bg-primary/5 text-foreground shadow-glow" : "border-border bg-card text-muted-foreground hover:bg-secondary/50"
            }`}
          >
            {v.name}
            <span className="rounded-full bg-gradient-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{v.score}%</span>
          </button>
        ))}
      </div>

      <SectionCard
        title="Weekly Timetable"
        subtitle="Color-coded theory, lab & elective lectures"
        icon={<CalendarDays className="h-4 w-4 text-primary" />}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filter</Button>
            <Button variant="outline" size="sm"><Share2 className="h-4 w-4" /> Share</Button>
            <Button size="sm" className="shadow-glow"><Download className="h-4 w-4" /> Export PDF</Button>
          </div>
        }
      >
        <TimetableGrid />
      </SectionCard>
    </DashboardLayout>
  );
}
