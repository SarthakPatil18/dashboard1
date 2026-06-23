import { useState, useEffect } from "react";
import { Menu, Search, Bell, Plus, Sun, Moon, Palette } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCampusData } from "@/hooks/useCampusData";
import { cn } from "@/lib/utils";

export function Topbar({ onMenu, title, subtitle }: { onMenu: () => void; title: string; subtitle?: string }) {
  const { colorSchema, setColorSchema } = useCampusData();
  const isTeal = colorSchema === "teal";

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
      return "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleColorSchema = () => {
    setColorSchema(isTeal ? "indigo" : "teal");
  };

  return (
    <header className={cn(
      "sticky top-0 z-30 border-b shadow-sm transition-colors duration-200",
      isTeal
        ? "bg-white dark:bg-gradient-to-r dark:from-[#2a4a5e] dark:to-[#1e3a4c] border-[#e5e7eb] dark:border-[#1e3a4c]/60 text-[#1f2937] dark:text-white"
        : "bg-gradient-to-r from-[#2a4a5e] to-[#1e3a4c] border-[#1e3a4c]/60 text-white"
    )}>
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-lg lg:hidden transition",
            isTeal
              ? "text-[#1f2937] hover:bg-gray-100 dark:text-sky-100 dark:hover:bg-[#1e3a4c]/60"
              : "text-sky-100 hover:bg-[#1e3a4c]/60"
          )}
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className={cn(
            "truncate font-display text-lg font-bold leading-tight sm:text-xl",
            isTeal ? "text-[#1f2937] dark:text-white" : "text-white"
          )}>{title}</h1>
          {subtitle && <p className={cn(
            "hidden truncate text-xs sm:block",
            isTeal ? "text-[#6b7280] dark:text-sky-200/80" : "text-sky-200/80"
          )}>{subtitle}</p>}
        </div>

        <div className="relative hidden md:block">
          <Search className={cn(
            "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
            isTeal ? "text-[#6b7280] dark:text-sky-200/70" : "text-sky-200/70"
          )} />
          <input
            placeholder="Search..."
            className={cn(
              "h-9 w-56 rounded-lg pl-9 pr-3 text-sm outline-none transition focus:ring-1",
              isTeal
                ? "border border-[#e5e7eb] bg-white dark:border-[#2d4e63] dark:bg-[#1a3344] focus:border-[#3c6e71] focus:ring-[#3c6e71]/25 text-[#1f2937] dark:text-white placeholder-[#6b7280] dark:placeholder-sky-200/40"
                : "border border-[#2d4e63] bg-[#1a3344] focus:border-sky-400 focus:ring-sky-400/25 text-white placeholder-sky-200/40"
            )}
          />
        </div>

        {/* Color Schema Toggle Button */}
        <button
          onClick={toggleColorSchema}
          title={isTeal ? "Switch to Indigo Color Scheme" : "Switch to Teal Color Scheme"}
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition cursor-pointer",
            isTeal
              ? "text-[#1f2937] hover:bg-gray-100 dark:text-sky-100 dark:hover:bg-[#1e3a4c]/60"
              : "text-sky-100 hover:bg-[#1e3a4c]/60 hover:text-white"
          )}
        >
          <Palette className={cn("h-[18px] w-[18px]", isTeal ? "text-[#3c6e71] dark:text-[#80cbc4]" : "text-[#CECBF6]")} />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition cursor-pointer",
            isTeal
              ? "text-[#1f2937] hover:bg-gray-100 dark:text-sky-100 dark:hover:bg-[#1e3a4c]/60"
              : "text-sky-100 hover:bg-[#1e3a4c]/60 hover:text-white"
          )}
        >
          {theme === "light" ? (
            <Moon className="h-[18px] w-[18px]" />
          ) : (
            <Sun className="h-[18px] w-[18px]" />
          )}
        </button>

        <button className={cn(
          "relative grid h-9 w-9 shrink-0 place-items-center rounded-lg transition",
          isTeal
            ? "text-[#1f2937] hover:bg-gray-100 dark:text-sky-100 dark:hover:bg-[#1e3a4c]/60"
            : "text-sky-100 hover:bg-[#1e3a4c]/60 hover:text-white"
        )}>
          <Bell className="h-[18px] w-[18px]" />
          <span className={cn(
            "absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2",
            isTeal ? "ring-white dark:ring-[#1e3a4c]" : "ring-[#1e3a4c]"
          )} />
        </button>

        <Button asChild variant="default" size="sm" className={cn(
          "hidden sm:inline-flex text-white shadow-none rounded-lg border-0 h-9 font-semibold px-4",
          isTeal
            ? "bg-[#3c6e71] hover:bg-[#2e5557]"
            : "bg-[#534AB7] hover:bg-[#3C3489]"
        )}>
          <Link to="/generate">
            <Plus className="h-4 w-4" />
            Generate
          </Link>
        </Button>

        <div className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold select-none",
          isTeal
            ? "bg-gray-100 border border-[#e5e7eb] dark:bg-[#1a3344] dark:border-[#2d4e63] text-[#1f2937] dark:text-sky-100"
            : "bg-[#1a3344] border border-[#2d4e63] text-sky-100"
        )}>
          AD
        </div>
      </div>
    </header>
  );
}
