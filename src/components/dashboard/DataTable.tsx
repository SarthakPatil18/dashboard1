import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border/70">
            {columns.map((c) => (
              <th
                key={String(c.key)}
                className={cn("px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground", c.className)}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-border/40 transition hover:bg-secondary/40 last:border-0">
              {columns.map((c) => (
                <td key={String(c.key)} className={cn("px-4 py-3.5 align-middle", c.className)}>
                  {c.render ? c.render(row) : String(row[c.key as keyof T])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Optimal: "bg-success/10 text-success",
    Active: "bg-success/10 text-success",
    Underloaded: "bg-info/10 text-info",
    Overloaded: "bg-destructive/10 text-destructive",
    Overbooked: "bg-destructive/10 text-destructive",
    Theory: "bg-chart-1/10 text-primary",
    Lab: "bg-chart-3/10 text-info",
    Elective: "bg-chart-5/15 text-warning",
  };
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", map[status] ?? "bg-secondary text-muted-foreground")}>
      {status}
    </span>
  );
}
