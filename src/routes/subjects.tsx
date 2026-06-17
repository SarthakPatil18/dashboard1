import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Plus, Download } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { DataTable, StatusBadge, type Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { subjectsList } from "@/lib/mock-data";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Subjects — CampusCompass ATS" },
      { name: "description", content: "Manage courses, credits, lecture types, and faculty assignments." },
    ],
  }),
  component: SubjectsPage,
});

type Row = (typeof subjectsList)[number];

function SubjectsPage() {
  const columns: Column<Row>[] = [
    { key: "code", header: "Code", render: (r) => <span className="font-mono text-xs font-semibold text-primary">{r.code}</span> },
    { key: "name", header: "Subject", render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "type", header: "Type", render: (r) => <StatusBadge status={r.type} /> },
    { key: "credits", header: "Credits" },
    { key: "sem", header: "Semester", render: (r) => `Sem ${r.sem}` },
    { key: "faculty", header: "Faculty" },
  ];

  return (
    <DashboardLayout title="Subjects" subtitle={`${subjectsList.length}+ courses mapped to curriculum`}>
      <SectionCard
        title="Course Catalog"
        subtitle="Subjects, credits & assignments"
        icon={<BookOpen className="h-4 w-4 text-primary" />}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" className="shadow-glow"><Plus className="h-4 w-4" /> Add Subject</Button>
          </div>
        }
      >
        <DataTable columns={columns} data={subjectsList} />
      </SectionCard>
    </DashboardLayout>
  );
}
