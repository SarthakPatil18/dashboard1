import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, Building2, Bell, Cpu, Save } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CampusCompass ATS" },
      { name: "description", content: "Institution profile, solver preferences, and notification settings." },
    ],
  }),
  component: SettingsPage,
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        defaultValue={value}
        className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
    </label>
  );
}

function SettingsPage() {
  return (
    <DashboardLayout title="Settings" subtitle="Manage your institution & generation preferences">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard title="Institution Profile" subtitle="Basic details" icon={<Building2 className="h-4 w-4 text-primary" />}>
          <div className="space-y-4">
            <Field label="University Name" value="CampusCompass Institute of Technology" />
            <Field label="Academic Year" value="2025 — 2026" />
            <Field label="Working Days" value="Monday to Saturday" />
          </div>
        </SectionCard>

        <SectionCard title="Solver Preferences" subtitle="AI optimization engine" icon={<Cpu className="h-4 w-4 text-primary" />}>
          <div className="space-y-4">
            <Field label="Solver Timeout (seconds)" value="120" />
            <Field label="GA Population Size" value="200" />
            <Field label="GA Generations" value="120" />
          </div>
        </SectionCard>

        <SectionCard title="Notifications" subtitle="Alert preferences" icon={<Bell className="h-4 w-4 text-primary" />} className="lg:col-span-2">
          <div className="space-y-3">
            {["Conflict alerts", "Faculty preference violations", "Room capacity issues", "Generation completed"].map((t, i) => (
              <div key={t} className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                <span className="text-sm font-medium">{t}</span>
                <span className="h-6 w-11 rounded-full bg-gradient-primary p-0.5">
                  <span className={`block h-5 w-5 rounded-full bg-card shadow-soft ${i === 3 ? "" : "translate-x-5"} transition-transform`} />
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 flex justify-end">
        <Button size="lg" className="shadow-glow"><Save className="h-4 w-4" /> Save Changes</Button>
      </div>
    </DashboardLayout>
  );
}
