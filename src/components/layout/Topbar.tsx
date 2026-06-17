import { Menu, Search, Bell, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Topbar({ onMenu, title, subtitle }: { onMenu: () => void; title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 glass">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary lg:hidden"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-lg font-bold leading-tight sm:text-xl">{title}</h1>
          {subtitle && <p className="hidden truncate text-xs text-muted-foreground sm:block">{subtitle}</p>}
        </div>

        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search..."
            className="h-9 w-56 rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <button className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
        </button>

        <Button asChild variant="default" size="sm" className="hidden shadow-glow sm:inline-flex">
          <Link to="/generate">
            <Plus className="h-4 w-4" />
            Generate
          </Link>
        </Button>

        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
          AD
        </div>
      </div>
    </header>
  );
}
