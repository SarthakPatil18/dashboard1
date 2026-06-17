import { timetable, days, periods, type SlotType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeStyle: Record<Exclude<SlotType, "break" | "free">, string> = {
  theory: "bg-chart-1/10 border-chart-1/30 text-foreground",
  lab: "bg-chart-3/10 border-chart-3/30 text-foreground",
  elective: "bg-chart-5/15 border-chart-5/40 text-foreground",
};

const dotStyle: Record<Exclude<SlotType, "break" | "free">, string> = {
  theory: "bg-chart-1",
  lab: "bg-chart-3",
  elective: "bg-chart-5",
};

export function TimetableGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <Legend color="bg-chart-1" label="Theory" />
        <Legend color="bg-chart-3" label="Lab" />
        <Legend color="bg-chart-5" label="Elective" />
        <span className="ml-auto text-muted-foreground">Sem 3 · CSE-3A</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/60">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-border/60 bg-secondary/60">
            <div className="px-2 py-3" />
            {periods.map((p) => (
              <div key={p} className="px-2 py-3 text-center text-[11px] font-semibold text-muted-foreground">
                {p}
              </div>
            ))}
          </div>
          {days.map((day) => (
            <div key={day} className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-border/40 last:border-0">
              <div className="grid place-items-center bg-secondary/40 px-2 py-2 text-xs font-semibold">
                {day}
              </div>
              {timetable[day].map((slot, i) => {
                if (!slot) {
                  return (
                    <div key={i} className="m-1 grid place-items-center rounded-lg border border-dashed border-border/50 py-2">
                      <span className="text-[10px] text-muted-foreground/60">{i === 3 ? "Lunch" : "Free"}</span>
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className={cn(
                      "m-1 rounded-lg border p-1.5 transition hover:scale-[1.03] hover:shadow-soft",
                      typeStyle[slot.type as keyof typeof typeStyle],
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotStyle[slot.type as keyof typeof dotStyle])} />
                      <p className="truncate text-[11px] font-semibold leading-tight">{slot.subject}</p>
                    </div>
                    {!compact && (
                      <>
                        <p className="truncate text-[10px] text-muted-foreground">{slot.faculty}</p>
                        <p className="truncate text-[10px] font-medium text-muted-foreground">{slot.room}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
