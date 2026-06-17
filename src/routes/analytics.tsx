import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Gauge, Footprints, Clock, Users, DoorOpen, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import {
  FacultyWorkloadChart,
  RoomUtilizationChart,
  OptimizationTrendChart,
} from "@/components/dashboard/Charts";
import { aiScores, days } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CampusCompass ATS" },
      { name: "description", content: "AI-powered scheduling analytics: optimization trends, workload, utilization heatmaps, and convenience scores." },
    ],
  }),
  component: AnalyticsPage,
});

// heatmap data 0-100 per day x period
const heat = days.map((d, di) =>
  Array.from({ length: 7 }, (_, p) => ({
    day: d,
    period: p,
    value: Math.round(35 + 55 * Math.abs(Math.sin((di + 1) * (p + 1.3)))),
  })),
);

function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" subtitle="Deep insights into schedule quality & efficiency">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Optimization" value="95%" icon={Gauge} accent="primary" index={0} />
        <MetricCard label="Room Use" value="82%" icon={DoorOpen} accent="info" index={1} />
        <MetricCard label="Student Idle" value="1.4h" icon={Clock} accent="warning" index={2} />
        <MetricCard label="Campus Move" value="91%" icon={Footprints} accent="success" index={3} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Constraint Satisfaction" subtitle="Overall compliance" icon={<Gauge className="h-4 w-4 text-primary" />}>
          <div className="grid place-items-center py-4">
            <ScoreRing value={aiScores.constraintSatisfaction} sublabel="Satisfied" />
          </div>
        </SectionCard>
        <SectionCard title="Optimization Trend" subtitle="Genetic algorithm convergence" icon={<TrendingUp className="h-4 w-4 text-primary" />} className="xl:col-span-2">
          <OptimizationTrendChart />
        </SectionCard>
      </div>

      <div className="mt-4">
        <SectionCard title="Room Utilization Heatmap" subtitle="Occupancy intensity by day & period" icon={<BarChart3 className="h-4 w-4 text-info" />}>
          <div className="overflow-x-auto">
            <div className="min-w-[620px] space-y-1.5">
              {heat.map((row) => (
                <div key={row[0].day} className="grid grid-cols-[48px_repeat(7,1fr)] gap-1.5">
                  <div className="grid place-items-center text-xs font-semibold text-muted-foreground">{row[0].day}</div>
                  {row.map((cell, i) => (
                    <div
                      key={i}
                      className="grid h-10 place-items-center rounded-lg text-[11px] font-semibold text-primary-foreground"
                      style={{ background: `color-mix(in oklab, var(--primary) ${cell.value}%, var(--secondary))` }}
                    >
                      {cell.value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Faculty Workload" subtitle="Balance across staff" icon={<Users className="h-4 w-4 text-primary" />}>
          <FacultyWorkloadChart />
        </SectionCard>
        <SectionCard title="Weekly Room Utilization" subtitle="Occupancy rate" icon={<DoorOpen className="h-4 w-4 text-info" />}>
          <RoomUtilizationChart />
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}
