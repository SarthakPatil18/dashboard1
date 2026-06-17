import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSpreadsheet,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Cpu,
  Dna,
  Wrench,
  CalendarCheck,
  UploadCloud,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Trophy,
  AlertTriangle,
  Timer,
  GitCompare,
  Database,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/generate")({
  head: () => ({
    meta: [
      { title: "Generate Timetable — CampusCompass ATS" },
      { name: "description", content: "AI-powered timetable generation workflow: upload data, configure constraints, run the CP-SAT and genetic optimizer, and review optimized results." },
    ],
  }),
  component: GeneratePage,
});

const steps = ["Upload Data", "Configure Constraints", "AI Processing", "Results"];

const files = [
  { name: "Faculty.xlsx", rows: 148, desc: "Faculty profiles & availability" },
  { name: "Student.xlsx", rows: 4820, desc: "Student groups & enrollments" },
  { name: "Subject.xlsx", rows: 212, desc: "Courses, credits & types" },
  { name: "Room.xlsx", rows: 86, desc: "Rooms, capacity & buildings" },
  { name: "TimeSlot.xlsx", rows: 42, desc: "Periods & working hours" },
];

const hardConstraints = [
  "Faculty Conflict",
  "Room Conflict",
  "Student Conflict",
  "Room Capacity",
  "Faculty Availability",
];
const softConstraints = [
  "Minimize Student Gaps",
  "Minimize Faculty Idle Time",
  "Minimize Campus Travel",
  "Balance Faculty Workload",
  "Reduce Consecutive Lectures",
];

const pipeline = [
  { label: "Excel Upload", icon: UploadCloud },
  { label: "Validation", icon: ShieldCheck },
  { label: "CP-SAT Solver", icon: Cpu },
  { label: "Genetic Algorithm", icon: Dna },
  { label: "Conflict Resolution", icon: Wrench },
  { label: "Timetable Generation", icon: CalendarCheck },
];

function GeneratePage() {
  const [step, setStep] = useState(0);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [hard, setHard] = useState<string[]>(hardConstraints);
  const [soft, setSoft] = useState<string[]>(softConstraints);
  const [pipeStage, setPipeStage] = useState(0);

  const toggle = (list: string[], set: (v: string[]) => void, item: string) =>
    set(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);

  // run pipeline animation when entering step 2
  useEffect(() => {
    if (step !== 2) return;
    setPipeStage(0);
    const iv = setInterval(() => {
      setPipeStage((s) => {
        if (s >= pipeline.length) {
          clearInterval(iv);
          return s;
        }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(iv);
  }, [step]);

  useEffect(() => {
    if (step === 2 && pipeStage >= pipeline.length) {
      const t = setTimeout(() => setStep(3), 700);
      return () => clearTimeout(t);
    }
  }, [step, pipeStage]);

  return (
    <DashboardLayout title="Generate Timetable" subtitle="AI-driven scheduling in four guided steps">
      {/* Stepper */}
      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition",
                    i < step && "bg-success text-success-foreground",
                    i === step && "bg-gradient-primary text-primary-foreground shadow-glow",
                    i > step && "bg-secondary text-muted-foreground",
                  )}
                >
                  {i < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                </div>
                <span className={cn("hidden text-sm font-medium sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-3 h-0.5 flex-1 rounded-full bg-secondary">
                  <div className={cn("h-full rounded-full bg-gradient-primary transition-all duration-500", i < step ? "w-full" : "w-0")} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <SectionCard title="Step 1 · Upload Excel Files" subtitle="Drag & drop or click to import your data sheets" icon={<Database className="h-4 w-4 text-primary" />}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {files.map((f) => {
                    const done = uploaded.includes(f.name);
                    return (
                      <button
                        key={f.name}
                        onClick={() => setUploaded((u) => (done ? u.filter((x) => x !== f.name) : [...u, f.name]))}
                        className={cn(
                          "group flex flex-col items-start gap-3 rounded-2xl border-2 border-dashed p-5 text-left transition",
                          done ? "border-success/50 bg-success/5" : "border-border hover:border-primary/50 hover:bg-secondary/40",
                        )}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className={cn("grid h-11 w-11 place-items-center rounded-xl", done ? "bg-success/15 text-success" : "bg-accent text-accent-foreground")}>
                            <FileSpreadsheet className="h-5 w-5" />
                          </div>
                          {done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <UploadCloud className="h-5 w-5 text-muted-foreground group-hover:text-primary" />}
                        </div>
                        <div>
                          <p className="font-semibold">{f.name}</p>
                          <p className="text-xs text-muted-foreground">{f.desc}</p>
                        </div>
                        <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", done ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground")}>
                          {done ? `${f.rows.toLocaleString()} rows validated` : "Click to upload"}
                        </span>
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setUploaded(files.map((f) => f.name))}
                    className="grid place-items-center rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-primary/5 p-5 text-center text-sm font-medium text-primary transition hover:bg-primary/5"
                  >
                    <UploadCloud className="mb-2 h-6 w-6" />
                    Upload all sample files
                  </button>
                </div>
              </SectionCard>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <SectionCard title="Hard Constraints" subtitle="Must never be violated" icon={<ShieldCheck className="h-4 w-4 text-destructive" />}>
                  <div className="space-y-2">
                    {hardConstraints.map((c) => (
                      <ConstraintRow key={c} label={c} checked={hard.includes(c)} onToggle={() => toggle(hard, setHard, c)} tone="hard" />
                    ))}
                  </div>
                </SectionCard>
                <SectionCard title="Soft Constraints" subtitle="Optimized as much as possible" icon={<Sparkles className="h-4 w-4 text-primary" />}>
                  <div className="space-y-2">
                    {softConstraints.map((c) => (
                      <ConstraintRow key={c} label={c} checked={soft.includes(c)} onToggle={() => toggle(soft, setSoft, c)} tone="soft" />
                    ))}
                  </div>
                </SectionCard>
              </div>
            )}

            {step === 2 && (
              <SectionCard title="Step 3 · AI Processing" subtitle="Running the optimization pipeline" icon={<Cpu className="h-4 w-4 text-primary" />}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                  {pipeline.map((p, i) => {
                    const status = pipeStage > i ? "done" : pipeStage === i ? "active" : "idle";
                    return (
                      <div key={p.label} className="flex flex-1 items-center gap-3 lg:flex-col lg:items-stretch">
                        <div
                          className={cn(
                            "flex flex-1 items-center gap-3 rounded-2xl border p-4 transition",
                            status === "done" && "border-success/40 bg-success/5",
                            status === "active" && "border-primary/50 bg-primary/5 shadow-glow animate-pulse-ring",
                            status === "idle" && "border-border bg-secondary/30 opacity-60",
                          )}
                        >
                          <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", status === "done" ? "bg-success/15 text-success" : status === "active" ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
                            {status === "done" ? <CheckCircle2 className="h-5 w-5" /> : <p.icon className="h-5 w-5" />}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{p.label}</p>
                            <p className="truncate text-[11px] text-muted-foreground">
                              {status === "done" ? "Completed" : status === "active" ? "Processing…" : "Queued"}
                            </p>
                          </div>
                        </div>
                        {i < pipeline.length - 1 && (
                          <ArrowRight className="hidden h-4 w-4 shrink-0 rotate-90 text-muted-foreground lg:block lg:rotate-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5">
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>Overall progress</span>
                    <span>{Math.round((Math.min(pipeStage, pipeline.length) / pipeline.length) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-primary transition-all duration-700" style={{ width: `${(Math.min(pipeStage, pipeline.length) / pipeline.length) * 100}%` }} />
                  </div>
                </div>
              </SectionCard>
            )}

            {step === 3 && <ResultsStep />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      {step !== 2 && (
        <div className="mt-5 flex items-center justify-between gap-3">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < 2 ? (
            <Button
              size="lg"
              className="shadow-glow"
              disabled={step === 0 && uploaded.length === 0}
              onClick={() => setStep((s) => s + 1)}
            >
              {step === 1 ? (
                <>
                  <Sparkles className="h-5 w-5" /> Generate Timetable
                </>
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button size="lg" className="shadow-glow" onClick={() => setStep(0)}>
              <Sparkles className="h-5 w-5" /> Generate Again
            </Button>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

function ConstraintRow({ label, checked, onToggle, tone }: { label: string; checked: boolean; onToggle: () => void; tone: "hard" | "soft" }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border p-3 text-left transition",
        checked ? "border-primary/30 bg-primary/5" : "border-border hover:bg-secondary/40",
      )}
    >
      <span className="flex items-center gap-3">
        {checked ? <CheckCircle2 className={cn("h-5 w-5", tone === "hard" ? "text-destructive" : "text-primary")} /> : <Circle className="h-5 w-5 text-muted-foreground" />}
        <span className="text-sm font-medium">{label}</span>
      </span>
      <span className={cn("h-5 w-9 rounded-full p-0.5 transition", checked ? "bg-gradient-primary" : "bg-secondary")}>
        <span className={cn("block h-4 w-4 rounded-full bg-card transition-transform", checked && "translate-x-4")} />
      </span>
    </button>
  );
}

function ResultsStep() {
  const alternatives = [
    { name: "Timetable A", score: 95, conflicts: 0, note: "Best overall · recommended", best: true },
    { name: "Timetable B", score: 92, conflicts: 1, note: "Lowest faculty idle time" },
    { name: "Timetable C", score: 89, conflicts: 2, note: "Minimal campus travel" },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResultStat icon={Trophy} label="Optimization Score" value="95%" accent="text-primary bg-primary/10" />
        <ResultStat icon={AlertTriangle} label="Conflicts" value="0" accent="text-success bg-success/10" />
        <ResultStat icon={Timer} label="Generation Time" value="42s" accent="text-info bg-info/10" />
      </div>

      <SectionCard title="3 Alternative Timetables" subtitle="Ranked by optimization quality" icon={<CalendarCheck className="h-4 w-4 text-primary" />}
        action={<Button variant="outline" size="sm"><GitCompare className="h-4 w-4" /> Compare</Button>}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {alternatives.map((a) => (
            <div
              key={a.name}
              className={cn(
                "relative rounded-2xl border p-5 transition hover:shadow-elevated",
                a.best ? "border-primary/40 bg-gradient-primary/5 shadow-glow" : "border-border",
              )}
            >
              {a.best && (
                <span className="absolute -top-2.5 left-5 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                  Recommended
                </span>
              )}
              <p className="font-display text-lg font-bold">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.note}</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="font-display text-3xl font-bold gradient-text">{a.score}%</p>
                  <p className="text-[11px] text-muted-foreground">optimization</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold">{a.conflicts}</p>
                  <p className="text-[11px] text-muted-foreground">conflicts</p>
                </div>
              </div>
              <Button variant={a.best ? "default" : "outline"} size="sm" className={cn("mt-4 w-full", a.best && "shadow-glow")}>
                Preview & Apply
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function ResultStat({ icon: Icon, label, value, accent }: { icon: typeof Trophy; label: string; value: string; accent: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card">
      <div className={cn("grid h-12 w-12 place-items-center rounded-xl", accent)}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="font-display text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
