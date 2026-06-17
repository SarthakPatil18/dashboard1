import { createFileRoute } from "@tanstack/react-router";
import { Users, Search, Plus, Download } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { DataTable, StatusBadge, type Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { facultyList } from "@/lib/mock-data";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — CampusCompass ATS" },
      { name: "description", content: "Manage faculty profiles, teaching load, and availability for AI timetable generation." },
    ],
  }),
  component: FacultyPage,
});

type Row = (typeof facultyList)[number];

function FacultyPage() {
  const columns: Column<Row>[] = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
    { key: "name", header: "Faculty", render: (r) => (
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-[11px] font-bold text-primary-foreground">
          {r.name.split(" ").slice(-1)[0][0]}
        </span>
        <span className="font-medium">{r.name}</span>
      </div>
    )},
    { key: "dept", header: "Department" },
    { key: "subjects", header: "Subjects" },
    { key: "load", header: "Weekly Load", render: (r) => `${r.load} hrs` },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <DashboardLayout title="Faculty" subtitle={`${facultyList.length} active members · workload balanced`}>
      <SectionCard
        title="Faculty Directory"
        subtitle="Profiles, load & availability"
        icon={<Users className="h-4 w-4 text-primary" />}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" className="shadow-glow"><Plus className="h-4 w-4" /> Add Faculty</Button>
          </div>
        }
      >
        <div className="relative mb-4 max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search faculty..." className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" />
        </div>
        <DataTable columns={columns} data={facultyList} />
      </SectionCard>
    </DashboardLayout>
  );
}
