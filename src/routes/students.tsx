import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Plus, Clock, Smile } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { studentGroups, metrics } from "@/lib/mock-data";

export const Route = createFileRoute("/students")({
  head: () => ({
    meta: [
      { title: "Students — CampusCompass ATS" },
      { name: "description", content: "Student groups, idle-time tracking, and schedule convenience scoring." },
    ],
  }),
  component: StudentsPage,
});

type Row = (typeof studentGroups)[number];

function StudentsPage() {
  const columns: Column<Row>[] = [
    { key: "id", header: "Group", render: (r) => <span className="font-semibold">{r.id}</span> },
    { key: "program", header: "Program" },
    { key: "sem", header: "Semester", render: (r) => `Sem ${r.sem}` },
    { key: "students", header: "Students" },
    { key: "idleHours", header: "Avg Idle", render: (r) => `${r.idleHours} h/day` },
    { key: "convenience", header: "Convenience", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${r.convenience}%` }} />
        </div>
        <span className="text-xs font-medium">{r.convenience}%</span>
      </div>
    )},
  ];

  return (
    <DashboardLayout title="Students" subtitle={`${metrics.students.toLocaleString()} students across all programs`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Total Students" value={metrics.students.toLocaleString()} icon={GraduationCap} accent="info" index={0} />
        <MetricCard label="Avg Idle Time" value="1.4 h" icon={Clock} accent="warning" index={1} />
        <MetricCard label="Convenience Score" value="91%" icon={Smile} accent="success" index={2} />
      </div>

      <div className="mt-4">
        <SectionCard
          title="Student Groups"
          subtitle="Idle time & convenience by cohort"
          icon={<GraduationCap className="h-4 w-4 text-info" />}
          action={<Button size="sm" className="shadow-glow"><Plus className="h-4 w-4" /> Add Group</Button>}
        >
          <DataTable columns={columns} data={studentGroups} />
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}
