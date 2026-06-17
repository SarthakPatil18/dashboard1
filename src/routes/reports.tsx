import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { reportsList } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CampusCompass ATS" },
      { name: "description", content: "Generated timetable reports, analytics exports, and conflict resolution logs." },
    ],
  }),
  component: ReportsPage,
});

type Row = (typeof reportsList)[number];

function ReportsPage() {
  const columns: Column<Row>[] = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
    { key: "name", header: "Report", render: (r) => (
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-foreground"><FileText className="h-4 w-4" /></span>
        <span className="font-medium">{r.name}</span>
      </div>
    )},
    { key: "type", header: "Type" },
    { key: "date", header: "Generated" },
    { key: "size", header: "Size" },
    { key: "action", header: "", render: () => (
      <Button variant="ghost" size="sm"><Download className="h-4 w-4" /> Download</Button>
    )},
  ];

  return (
    <DashboardLayout title="Reports" subtitle="Exports, analytics & generation logs">
      <SectionCard
        title="All Reports"
        subtitle="Downloadable documents"
        icon={<FileText className="h-4 w-4 text-primary" />}
        action={<Button size="sm" className="shadow-glow"><Plus className="h-4 w-4" /> New Report</Button>}
      >
        <DataTable columns={columns} data={reportsList} />
      </SectionCard>
    </DashboardLayout>
  );
}
