import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { ChangelogItem, CurveSparkline, SkillRow } from "@/components/sat-ui";
import {
  calibration,
  calibrationNotes,
  changelog,
  intervalHistory,
  profile,
  skills,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = ["Forecast", "Retention", "Calibration", "Changelog"] as const;

export function StatsSections() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Forecast");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Statistics sections"
        className="flex gap-4 border-b border-border"
      >
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "min-h-10 border-b-2 pb-2 pt-1 text-xs font-medium transition-colors",
              tab === t
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Forecast" && <Forecast />}
      {tab === "Retention" && <Retention />}
      {tab === "Calibration" && <Calibration />}
      {tab === "Changelog" && (
        <div className="mt-3 divide-y divide-border">
          {changelog.map((e) => (
            <ChangelogItem key={e.id} entry={e} />
          ))}
        </div>
      )}
    </div>
  );
}

function Forecast() {
  const min = 1000;
  const max = 1450;
  const y = (v: number) => 100 - ((v - min) / (max - min)) * 100;
  return (
    <div className="mt-4">
      <p className="text-[13px] text-muted-foreground">Current interval</p>
      <p className="tnum mt-1.5 text-[40px] font-semibold leading-none tracking-tight">
        {profile.currentInterval[0]}
        <span className="mx-1.5 text-muted-foreground/50">–</span>
        {profile.currentInterval[1]}
      </p>
      <p className="tnum mt-2 text-xs text-muted-foreground">
        Goal {profile.goalScore} · narrowed by 80 pts over 6 weeks
      </p>

      <p className="mt-7 text-[13px] text-muted-foreground">Uncertainty over time</p>
      <svg viewBox="0 0 300 110" className="mt-2 w-full" role="img" aria-label="Interval history">
        <polygon
          fill="var(--primary)"
          opacity="0.16"
          points={[
            ...intervalHistory.map(
              (p, i) => `${(i / (intervalHistory.length - 1)) * 300},${y(p.high)}`,
            ),
            ...[...intervalHistory]
              .reverse()
              .map(
                (p, i) =>
                  `${((intervalHistory.length - 1 - i) / (intervalHistory.length - 1)) * 300},${y(p.low)}`,
              ),
          ].join(" ")}
        />
        {(["high", "low"] as const).map((k) => (
          <polyline
            key={k}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="var(--curve-width)"
            vectorEffect="non-scaling-stroke"
            points={intervalHistory
              .map((p, i) => `${(i / (intervalHistory.length - 1)) * 300},${y(p[k])}`)
              .join(" ")}
          />
        ))}
      </svg>
      <div className="tnum mt-1 flex justify-between text-[10px] text-muted-foreground">
        {intervalHistory.map((p) => (
          <span key={p.week}>{p.week}</span>
        ))}
      </div>
    </div>
  );
}

function Retention() {
  const sorted = [...skills].sort((a, b) => a.freshness - b.freshness);
  const [selected, setSelected] = useState<string | null>(null);
  const skill = sorted.find((s) => s.id === selected);

  return (
    <div className="mt-4 space-y-1.5">
      <p className="pb-1 text-xs text-muted-foreground">
        Freshness = modeled retention right now. Below 35% a skill enters the review queue by itself.
      </p>
      {sorted.map((s) => (
        <SkillRow key={s.id} skill={s} onClick={() => setSelected(s.id)} />
      ))}

      {skill && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button
            aria-label="Close"
            className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"
            onClick={() => setSelected(null)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-border bg-popover p-5 pb-[max(env(safe-area-inset-bottom),1.25rem)] shadow-sheet">
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-border-strong" />
            <p className="text-sm font-medium">{skill.name}</p>
            <p className="tnum mt-0.5 text-xs text-muted-foreground">
              Mastery {skill.mastery}% · freshness {skill.freshness}% · last {skill.lastPracticed}
            </p>
            <div className="mt-6 origin-left scale-[2.4]">
              <CurveSparkline
                points={skill.curve}
                tone={skill.freshness < 35 ? "var(--warning)" : "var(--chart-2)"}
              />
            </div>
            <p className="mt-10 text-[11px] text-muted-foreground">
              Modeled decay over the next 14 days without review.
            </p>
            <button className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground">
              <RotateCcw className="size-4" /> Review now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Calibration() {
  return (
    <div className="mt-4">
      <p className="text-[13px] text-muted-foreground">Confidence vs accuracy</p>
      <svg
        viewBox="0 0 220 220"
        className="mt-3 w-full"
        role="img"
        aria-label="Calibration scatter"
      >
        <rect x="0" y="0" width="220" height="220" fill="var(--surface-2)" rx="16" />
        {[0, 55, 110, 165, 220].map((g) => (
          <g key={g}>
            <line x1={g} y1="0" x2={g} y2="220" stroke="var(--border)" strokeWidth="1" />
            <line x1="0" y1={g} x2="220" y2={g} stroke="var(--border)" strokeWidth="1" />
          </g>
        ))}
        <line
          x1="0"
          y1="220"
          x2="220"
          y2="0"
          stroke="var(--border-strong)"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        {calibration.map((p) => {
          const over = p.confidence - p.accuracy > 15;
          const under = p.accuracy - p.confidence > 15;
          return (
            <circle
              key={p.topic}
              cx={(p.confidence / 100) * 220}
              cy={220 - (p.accuracy / 100) * 220}
              r={5 + p.n / 20}
              fill={over ? "var(--destructive)" : under ? "var(--info)" : "var(--success)"}
              opacity="0.85"
            />
          );
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        <span>low confidence</span>
        <span>high confidence</span>
      </div>

      <div className="mt-5 divide-y divide-border">
        {calibration.map((p) => (
          <div key={p.topic} className="flex items-center justify-between py-2.5 text-sm">
            <span>{p.topic}</span>
            <span className="tnum text-xs text-muted-foreground">
              conf {p.confidence}% · acc {p.accuracy}% · n={p.n}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[13px] text-muted-foreground">Readouts</p>
      <ul className="mt-2 space-y-2">
        {calibrationNotes.map((n) => (
          <li key={n} className="flex gap-2 text-sm leading-relaxed">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
