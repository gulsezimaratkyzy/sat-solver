import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  Download,
  GraduationCap,
  LifeBuoy,
  LogOut,
  Mail,
  Monitor,
  Moon,
  School,
  Sparkles,
  Sun,
  Target,
  UserRound,
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { Screen } from "@/components/ai-sheet";
import { StatsSections } from "@/components/stats-sections";
import { useTheme } from "@/components/theme-provider";
import { profile, profileStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Sightline SAT" },
      {
        name: "description",
        content:
          "Your account: email, student details, graduation class, goal score, plan and appearance settings.",
      },
      { property: "og:title", content: "Profile — Sightline SAT" },
      {
        property: "og:description",
        content: "Account details, graduation class, plan and appearance settings.",
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

function Head({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 mt-7 text-sm font-semibold tracking-tight">{children}</h2>;
}

function Row({
  icon: Icon,
  label,
  value,
  tone,
  chevron,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value?: string;
  tone?: string;
  chevron?: boolean;
}) {
  return (
    <div className="flex min-h-11 items-center gap-3 py-2.5">
      <Icon className="size-4" style={{ color: tone ? `var(--${tone})` : undefined }} />
      <span className="flex-1 text-sm">{label}</span>
      {value && <span className="tnum text-sm text-muted-foreground">{value}</span>}
      {chevron && <ChevronRight className="size-4 text-muted-foreground" />}
    </div>
  );
}

function Profile() {
  const { theme, setTheme } = useTheme();
  const pro = profile.plan === "pro";

  return (
    <>
      <Screen>
        <header className="py-2">
          <h1 className="text-lg font-semibold tracking-tight">Profile</h1>
        </header>

        <section className="mt-3 flex items-center gap-4">
          <span className="tnum flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
            {profile.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold tracking-tight">
              {profile.name} {profile.lastName}
            </p>
            <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] font-medium">
              <span className="rounded-full border border-chart-2/40 px-2 py-0.5 text-chart-2">
                {profile.role}
              </span>
              <span className="rounded-full border border-chart-5/40 px-2 py-0.5 text-chart-5">
                {profile.graduationClass}
              </span>
            </div>
          </div>
        </section>

        <p className="tnum mt-4 text-xs text-muted-foreground">{profile.joinedDate}</p>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
          {profileStats.map((s) => (
            <div key={s.label}>
              <p className="tnum text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-0.5 text-xs" style={{ color: `var(--${s.tone})` }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <Head>Statistics</Head>
        <StatsSections />



        <Head>Plan</Head>
        <div className="flex items-center gap-3 rounded-2xl border border-primary/35 bg-accent/40 p-4">
          <Sparkles className="size-5 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{pro ? "Pro" : "Free"} plan</p>
            <p className="text-xs text-muted-foreground">
              {pro
                ? "Unlimited AI explanations and full-length tests."
                : "3 AI explanations a day · 1 full-length test a month."}
            </p>
          </div>
          {!pro && (
            <button className="min-h-9 shrink-0 rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground">
              Upgrade plan
            </button>
          )}
        </div>

        <Head>Account</Head>
        <div className="divide-y divide-border">
          <Row icon={Mail} label="Email" value={profile.email} tone="chart-1" />
          <Row icon={UserRound} label="Role" value={profile.role} tone="chart-2" />
          <Row icon={School} label="School" value={profile.school} tone="chart-5" />
          <Row
            icon={GraduationCap}
            label="Graduation"
            value={profile.graduationClass}
            tone="chart-3"
          />
        </div>

        <Head>Goal</Head>
        <div className="divide-y divide-border">
          <Row icon={Target} label="Target score" value={String(profile.goalScore)} tone="chart-1" />
          <Row icon={Bell} label="Exam date" value={profile.examDate} tone="chart-4" />
        </div>

        <Head>Appearance</Head>
        <div className="grid grid-cols-3 gap-2">
          {themeOptions.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              aria-pressed={theme === key}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border text-xs font-medium transition-colors",
                theme === key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-surface-2",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        <Head>Settings</Head>
        <div className="divide-y divide-border">
          {[
            { icon: Bell, label: "Notifications", value: "Retention alerts only", tone: "chart-3" },
            { icon: Download, label: "Export progress", value: "CSV · JSON", tone: "chart-2" },
            { icon: LifeBuoy, label: "Support & feedback", value: "", tone: "chart-5" },
          ].map((r) => (
            <button key={r.label} className="w-full text-left">
              <Row icon={r.icon} label={r.label} value={r.value} tone={r.tone} chevron />
            </button>
          ))}
        </div>

        <button className="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-destructive/35 text-sm text-destructive transition-colors hover:bg-destructive/10">
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
