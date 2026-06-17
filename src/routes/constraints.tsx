import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal, ShieldCheck, Sparkles, Save } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/constraints")({
  head: () => ({
    meta: [
      { title: "Constraints — CampusCompass ATS" },
      { name: "description", content: "Configure hard and soft scheduling constraints and their optimization weights." },
    ],
  }),
  component: ConstraintsPage,
});

const hard = [
  { label: "Faculty Conflict", desc: "No faculty double-booked in one slot" },
  { label: "Room Conflict", desc: "No room assigned to two classes at once" },
  { label: "Student Conflict", desc: "No group has overlapping lectures" },
  { label: "Room Capacity", desc: "Class size must fit room capacity" },
  { label: "Faculty Availability", desc: "Respect declared unavailable hours" },
];

const soft = [
  { label: "Minimize Student Gaps", weight: 80 },
  { label: "Minimize Faculty Idle Time", weight: 65 },
  { label: "Minimize Campus Travel", weight: 70 },
  { label: "Balance Faculty Workload", weight: 90 },
  { label: "Reduce Consecutive Lectures", weight: 55 },
];

function ConstraintsPage() {
  const [hardOn, setHardOn] = useState(hard.map(() => true));
  const [weights, setWeights] = useState(soft.map((s) => s.weight));

  return (
    <DashboardLayout title="Constraints" subtitle="Define how the AI optimizer balances trade-offs">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard title="Hard Constraints" subtitle="Strictly enforced — never violated" icon={<ShieldCheck className="h-4 w-4 text-destructive" />}>
          <div className="space-y-2">
            {hard.map((c, i) => (
              <div key={c.label} className="flex items-center justify-between gap-3 rounded-xl border border-border/60 p-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{c.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.desc}</p>
                </div>
                <button
                  onClick={() => setHardOn((s) => s.map((v, j) => (j === i ? !v : v)))}
                  className={cn("h-6 w-11 shrink-0 rounded-full p-0.5 transition", hardOn[i] ? "bg-gradient-primary" : "bg-secondary")}
                >
                  <span className={cn("block h-5 w-5 rounded-full bg-card shadow-soft transition-transform", hardOn[i] && "translate-x-5")} />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Soft Constraints" subtitle="Weighted optimization objectives" icon={<Sparkles className="h-4 w-4 text-primary" />}>
          <div className="space-y-5">
            {soft.map((c, i) => (
              <div key={c.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{c.label}</span>
                  <span className="font-display text-sm font-bold text-primary">{weights[i]}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weights[i]}
                  onChange={(e) => setWeights((w) => w.map((v, j) => (j === i ? Number(e.target.value) : v)))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
                  style={{ accentColor: "var(--primary)" }}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 flex justify-end">
        <Button size="lg" className="shadow-glow"><Save className="h-4 w-4" /> Save Constraint Profile</Button>
      </div>
    </DashboardLayout>
  );
}
