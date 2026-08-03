import { AlertTriangle, ArrowDownRight, Check, CircleDot, RotateCcw, Unlock } from "lucide-react";
import type { ChangelogEntry, Issue, Priority, Skill } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/* ---------- Priority badge (color + letter, never color alone) ---------- */
const priorityStyles: Record<Priority, string> = {
  P0: "border-destructive/40 bg-destructive/12 text-destructive",
  P1: "border-warning/40 bg-warning/15 text-warning",
  P2: "border-border bg-surface-2 text-muted-foreground",
};

export function PriorityBadge({ p }: { p: Priority }) {
  return (
    <span
      className={cn(
        "tnum inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide",
        priorityStyles[p],
      )}
    >
      {p}
    </span>
  );
}

/* ---------- Issue row ---------- */
export function IssueRow({ issue, onClick }: { issue: Issue; onClick?: () => void }) {
  const resolved = issue.status === "resolved";
  const regressed = issue.status === "regressed";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full min-h-11 items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors",
        regressed ? "border-destructive/35 bg-destructive/[0.05]" : "border-border bg-surface",
        resolved && "opacity-55",
        "hover:bg-surface-2",
      )}
    >
      <PriorityBadge p={issue.priority} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "truncate text-sm font-medium",
              resolved && "line-through text-muted-foreground",
            )}
          >
            {issue.title}
          </span>
          {regressed && <RotateCcw className="size-3 shrink-0 text-destructive" />}
          {resolved && <Check className="size-3 shrink-0 text-success" />}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">{issue.reason}</span>
      </span>
    </button>
  );
}

/* ---------- Session composition bar ---------- */
export function CompositionBar({
  parts,
  showLabels = true,
}: {
  parts: { label: string; pct: number; tone: string }[];
  showLabels?: boolean;
}) {
  return (
    <div>
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        {parts.map((p) => (
          <div
            key={p.label}
            style={{ width: `${p.pct}%`, backgroundColor: `var(--${p.tone})` }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>
      {showLabels && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          {parts.map((p) => (
            <span key={p.label} className="inline-flex items-center gap-1.5">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: `var(--${p.tone})` }}
              />
              <span className="tnum">{p.pct}%</span> {p.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Forgetting-curve sparkline ---------- */
export function CurveSparkline({ points, tone }: { points: number[]; tone: string }) {
  const w = 88;
  const h = 26;
  const max = Math.max(...points);
  const d = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (v / max) * (h - 3) - 1.5;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden className="overflow-visible">
      <path
        d={d}
        fill="none"
        stroke={tone}
        strokeWidth="var(--curve-width)"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function SkillRow({ skill, onClick }: { skill: Skill; onClick?: () => void }) {
  const urgent = skill.freshness < 35;
  const tone = urgent ? "var(--warning)" : "var(--chart-2)";
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full min-h-11 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{skill.name}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {skill.domain} · last {skill.lastPracticed}
        </span>
      </span>
      <CurveSparkline points={skill.curve} tone={tone} />
      <span
        className={cn(
          "tnum w-10 text-right text-xs font-medium",
          urgent ? "text-warning" : "text-muted-foreground",
        )}
      >
        {skill.freshness}%
      </span>
    </button>
  );
}

/* ---------- Changelog ---------- */
const changelogMeta = {
  fixed: { icon: Check, cls: "text-success border-success/35 bg-success/10", label: "Fixed" },
  regression: {
    icon: ArrowDownRight,
    cls: "text-destructive border-destructive/35 bg-destructive/10",
    label: "Regression",
  },
  unlocked: { icon: Unlock, cls: "text-primary border-primary/35 bg-primary/10", label: "Unlocked" },
  narrowed: { icon: CircleDot, cls: "text-info border-info/35 bg-info/10", label: "Narrowed" },
};

export function ChangelogItem({ entry }: { entry: ChangelogEntry }) {
  const meta = changelogMeta[entry.type];
  const Icon = meta.icon;
  return (
    <div className="flex gap-3 py-3">
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border",
          meta.cls,
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug">{entry.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{entry.detail}</p>
        <p className="tnum mt-1 text-[11px] text-muted-foreground/70">{entry.date}</p>
      </div>
    </div>
  );
}

/* ---------- Score interval readout ---------- */
export function ScoreInterval({
  low,
  high,
  prevLow,
  prevHigh,
}: {
  low: number;
  high: number;
  prevLow: number;
  prevHigh: number;
}) {
  const min = 400;
  const max = 1600;
  const pos = (v: number) => ((v - min) / (max - min)) * 100;
  const narrowed = high - low < prevHigh - prevLow;

  return (
    <section className="pt-7">
      <p className="text-[13px] text-muted-foreground">Predicted score</p>
      <p className="tnum mt-1 flex items-baseline gap-2 text-[52px] font-semibold leading-none tracking-tighter">
        {low}
        <span className="text-[28px] font-normal text-muted-foreground/50">–</span>
        {high}
      </p>

      <div className="relative mt-5 h-[3px] w-full rounded-full bg-surface-2">
        <div
          className="absolute h-full rounded-full bg-border-strong"
          style={{ left: `${pos(prevLow)}%`, width: `${pos(prevHigh) - pos(prevLow)}%` }}
        />
        <div
          className="absolute h-full rounded-full bg-foreground transition-all duration-700"
          style={{ left: `${pos(low)}%`, width: `${pos(high) - pos(low)}%` }}
        />
      </div>

      <p className="tnum mt-2.5 text-[13px] text-muted-foreground">
        <span style={{ color: narrowed ? "var(--chart-2)" : "var(--chart-3)" }}>
          {narrowed ? "Narrowing" : "Widening"}
        </span>{" "}
        · ±{Math.round((high - low) / 2)} pts, was ±{Math.round((prevHigh - prevLow) / 2)}
      </p>
    </section>
  );
}


export function SectionLabel({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-2 mt-6 flex items-center justify-between">
      <h2 className="text-sm font-semibold tracking-tight text-foreground">
        {children}
      </h2>
      {action}
    </div>
  );
}
