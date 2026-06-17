import { createFileRoute } from "@tanstack/react-router";
import { DoorOpen, Plus, Download } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { DataTable, StatusBadge, type Column } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { roomsList } from "@/lib/mock-data";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms — CampusCompass ATS" },
      { name: "description", content: "Manage classrooms, labs, and halls with capacity and utilization tracking." },
    ],
  }),
  component: RoomsPage,
});

type Row = (typeof roomsList)[number];

function RoomsPage() {
  const columns: Column<Row>[] = [
    { key: "id", header: "Room", render: (r) => <span className="font-semibold">{r.id}</span> },
    { key: "type", header: "Type" },
    { key: "building", header: "Building" },
    { key: "capacity", header: "Capacity", render: (r) => `${r.capacity} seats` },
    { key: "utilization", header: "Utilization", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${r.utilization}%` }} />
        </div>
        <span className="text-xs font-medium">{r.utilization}%</span>
      </div>
    )},
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <DashboardLayout title="Rooms" subtitle={`${roomsList.length} rooms across 3 buildings`}>
      <SectionCard
        title="Room Inventory"
        subtitle="Capacity & live utilization"
        icon={<DoorOpen className="h-4 w-4 text-info" />}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" className="shadow-glow"><Plus className="h-4 w-4" /> Add Room</Button>
          </div>
        }
      >
        <DataTable columns={columns} data={roomsList} />
      </SectionCard>
    </DashboardLayout>
  );
}
