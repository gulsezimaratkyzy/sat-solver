import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  Download,
  Globe,
  LifeBuoy,
  LogOut,
  Monitor,
  Moon,
  Sun,
  Target,
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { Screen } from "@/components/ai-sheet";
import { SectionLabel } from "@/components/sat-ui";
import { useTheme } from "@/components/theme-provider";
import { profile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Sightline SAT" },
      {
        name: "description",
        content:
          "Your SAT goal, exam date, theme, honest data-driven notifications and account settings.",
      },
      { property: "og:title", content: "Profile — Sightline SAT" },
      {
        property: "og:description",
        content: "Goal score, exam date, appearance and notification settings.",
      },
    ],
  }),
  component: Profile,
});

const themeOptions = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
] as const;

const rows = [
  { icon: Bell, label: "Notifications", value: "Retention alerts only" },
  { icon: Globe, label: "Interface language", value: "English" },
  { icon: Download, label: "Export progress", value: "CSV · JSON" },
  { icon: LifeBuoy, label: "Support & feedback", value: "" },
];

function Profile() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Screen>
        <header className="py-2">
          <h1 className="text-lg font-semibold tracking-tight">Profile</h1>
        </header>

        <section className="panel mt-2 flex items-center gap-3 p-4">
          <span className="tnum flex size-12 items-center justify-center rounded-full border border-border bg-surface-2 text-sm font-semibold">
            {profile.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{profile.name} Kim</p>
            <p className="tnum text-xs text-muted-foreground">
              Goal {profile.goalScore} · exam {profile.examDate}
            </p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </section>

        <SectionLabel>Goal</SectionLabel>
        <div className="panel divide-y divide-border">
          <div className="flex min-h-11 items-center gap-3 px-3 py-2.5">
            <Target className="size-4 text-muted-foreground" />
            <span className="flex-1 text-sm">Target score</span>
            <span className="tnum text-sm text-muted-foreground">{profile.goalScore}</span>
          </div>
          <div className="flex min-h-11 items-center gap-3 px-3 py-2.5">
            <span className="w-4" />
            <span className="flex-1 text-sm">Exam date</span>
            <span className="tnum text-sm text-muted-foreground">{profile.examDate}</span>
          </div>
        </div>

        <SectionLabel>Appearance</SectionLabel>
        <div className="panel p-1.5">
          <div className="grid grid-cols-3 gap-1.5">
            {themeOptions.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                aria-pressed={theme === key}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-1 rounded-md border text-xs font-medium transition-colors",
                  theme === key
                    ? "border-primary/50 bg-accent text-accent-foreground"
                    : "border-transparent text-muted-foreground hover:bg-surface-2",
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <SectionLabel>Settings</SectionLabel>
        <div className="panel divide-y divide-border">
          {rows.map(({ icon: Icon, label, value }) => (
            <button
              key={label}
              className="flex min-h-11 w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
            >
              <Icon className="size-4 text-muted-foreground" />
              <span className="flex-1 text-sm">{label}</span>
              <span className="text-xs text-muted-foreground">{value}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <Link
          to="/vocabulary"
          className="mt-3 flex min-h-11 items-center gap-3 rounded-lg border border-border bg-surface px-3 text-sm transition-colors hover:bg-surface-2"
        >
          <span className="flex-1">Vocabulary deck</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>

        <button className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm text-destructive transition-colors hover:bg-destructive/10">
          <LogOut className="size-4" /> Sign out
        </button>

        <p className="tnum mt-6 text-center text-[11px] text-muted-foreground/70">
          Sightline · build 2026.8.2
        </p>
      </Screen>
      <BottomNav />
    </>
  );
}
