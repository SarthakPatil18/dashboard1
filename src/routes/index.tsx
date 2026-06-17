import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  DoorOpen,
  BookOpen,
  AlertTriangle,
  Sparkles,
  Activity,
  Gauge,
  Footprints,
  Clock,
  Upload,
  FileText,
  UserPlus,
  PlusCircle,
  ArrowRight,
  Bell,
  CircleAlert,
  Building2,
  ScrollText,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { TimetableGrid } from "@/components/dashboard/TimetableGrid";
import {
  FacultyWorkloadChart,
  RoomUtilizationChart,
  LectureSplitChart,
} from "@/components/dashboard/Charts";
import { Button } from "@/components/ui/button";
import { metrics, aiScores, notifications, lectureTypeSplit } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CampusCompass ATS" },
      { name: "description", content: "Admin dashboard for AI-powered university timetable generation: live metrics, optimization analytics, and conflict alerts." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { label: "Generate Timetable", icon: Sparkles, to: "/generate", primary: true },
  { label: "Upload Data", icon: Upload, to: "/generate" },
  { label: "View Reports", icon: FileText, to: "/reports" },
  { label: "Add Faculty", icon: UserPlus, to: "/faculty" },
  { label: "Add Room", icon: PlusCircle, to: "/rooms" },
];

const notifIcon = {
  conflict: CircleAlert,
  preference: AlertTriangle,
  room: Building2,
  log: ScrollText,
};
const notifColor = {
  conflict: "text-destructive bg-destructive/10",
  preference: "text-warning bg-warning/10",
  room: "text-info bg-info/10",
  log: "text-success bg-success/10",
};

function Dashboard() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back · Semester 3, 2026 planning cycle">
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <MetricCard label="Faculty" value={metrics.faculty} icon={Users} trend="4.2%" accent="primary" index={0} />
        <MetricCard label="Students" value={metrics.students.toLocaleString()} icon={GraduationCap} trend="2.1%" accent="info" index={1} />
        <MetricCard label="Rooms" value={metrics.rooms} icon={DoorOpen} trend="1.0%" accent="success" index={2} />
        <MetricCard label="Subjects" value={metrics.subjects} icon={BookOpen} trend="3.5%" accent="warning" index={3} />
        <MetricCard label="Active Conflicts" value={metrics.conflicts} icon={AlertTriangle} trend="62%" trendDir="down" accent="destructive" index={4} />
      </div>

      {/* Quick actions */}
      <div className="mt-4 flex flex-wrap gap-3">
        {quickActions.map((a) => (
          <Button
            key={a.label}
            asChild
            variant={a.primary ? "default" : "outline"}
            className={cn("rounded-xl", a.primary && "shadow-glow")}
          >
            <Link to={a.to}>
              <a.icon className="h-4 w-4" />
              {a.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* AI Analytics */}
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          title="AI Optimization Score"
          subtitle="Constraint satisfaction & solver quality"
          icon={<Sparkles className="h-4 w-4 text-primary" />}
          className="xl:col-span-1"
        >
          <div className="flex flex-col items-center gap-4">
            <ScoreRing value={aiScores.optimization} sublabel="Optimal" />
            <div className="grid w-full grid-cols-2 gap-3">
              <MiniStat icon={Gauge} label="Constraints met" value={`${aiScores.constraintSatisfaction}%`} />
              <MiniStat icon={Activity} label="Room use" value={`${aiScores.roomUtilization}%`} />
              <MiniStat icon={Clock} label="Student idle" value={`${aiScores.studentIdleHours}h`} />
              <MiniStat icon={Footprints} label="Campus move" value={`${aiScores.campusMovement}%`} />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Faculty Workload Distribution"
          subtitle="Assigned vs ideal weekly hours"
          icon={<Users className="h-4 w-4 text-primary" />}
          className="xl:col-span-2"
        >
          <FacultyWorkloadChart />
        </SectionCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          title="Room Utilization"
          subtitle="Weekly occupancy rate"
          icon={<DoorOpen className="h-4 w-4 text-info" />}
          className="xl:col-span-2"
        >
          <RoomUtilizationChart />
        </SectionCard>

        <SectionCard
          title="Lecture Mix"
          subtitle="Theory · Lab · Elective"
          icon={<BookOpen className="h-4 w-4 text-primary" />}
        >
          <div className="relative">
            <LectureSplitChart />
            <div className="mt-2 space-y-1.5">
              {lectureTypeSplit.map((l) => (
                <div key={l.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                    {l.name}
                  </span>
                  <span className="font-semibold">{l.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Timetable + Notifications */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          title="Timetable Preview"
          subtitle="Weekly schedule · Monday to Saturday"
          icon={<Activity className="h-4 w-4 text-primary" />}
          className="xl:col-span-2"
          action={
            <Button asChild variant="ghost" size="sm">
              <Link to="/timetables">
                Open <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <TimetableGrid compact />
        </SectionCard>

        <SectionCard
          title="Notifications"
          subtitle="Alerts & generation logs"
          icon={<Bell className="h-4 w-4 text-primary" />}
        >
          <div className="space-y-2">
            {notifications.map((n, i) => {
              const Icon = notifIcon[n.category];
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-xl border border-border/50 p-3 transition hover:bg-secondary/50"
                >
                  <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", notifColor[n.category])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.detail}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                </motion.div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: typeof Gauge; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <p className="mt-1.5 font-display text-base font-bold leading-none">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
