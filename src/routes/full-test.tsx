import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Calculator, X } from "lucide-react";
import { TimerPill } from "@/components/timer";
import { DesmosPanel } from "@/components/desmos-panel";
import { fullTestModules } from "@/lib/mock-data";

export const Route = createFileRoute("/full-test")({
  head: () => ({
    meta: [
      { title: "Full-length SAT — Sightline" },
      {
        name: "description",
        content:
          "Sit a complete digital SAT: four modules, real question counts and exact exam timing, with the Desmos calculator in Math.",
      },
      { property: "og:title", content: "Full-length SAT — Sightline" },
      {
        property: "og:description",
        content: "A complete digital SAT under real exam timing.",
      },
    ],
  }),
  component: FullTest,
});

function FullTest() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const totalQ = fullTestModules.reduce((n, m) => n + m.questions, 0);
  const totalMin = fullTestModules.reduce((n, m) => n + m.minutes, 0);

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
        <header className="flex items-center justify-between py-1">
          <button
            onClick={() => navigate({ to: "/" })}
            aria-label="Exit test"
            className="-ml-2 flex size-11 items-center justify-center"
          >
            <X className="size-5 text-muted-foreground" />
          </button>
          {started && (
            <>
              <p className="tnum text-xs text-muted-foreground">Reading & Writing · Module 1</p>
              <TimerPill seconds={32 * 60} />
            </>
          )}
        </header>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Full-length SAT</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Same module count, same question count, same clock as test day. The score interval updates
          only after you finish.
        </p>

        <p className="tnum mt-5 text-sm">
          <span className="text-chart-1">{totalQ} questions</span>
          <span className="mx-2 text-muted-foreground/50">·</span>
          <span className="text-chart-3">
            {Math.floor(totalMin / 60)}h {totalMin % 60}m
          </span>
          <span className="mx-2 text-muted-foreground/50">·</span>
          <span className="text-chart-2">adaptive module 2</span>
        </p>

        <div className="mt-5 divide-y divide-border">
          {fullTestModules.map((m) => (
            <div key={m.id} className="flex items-center gap-3 py-3">
              <span className="min-w-0 flex-1 text-sm">{m.name}</span>
              <span className="tnum text-xs text-muted-foreground">
                {m.questions ? `${m.questions}q · ` : ""}
                {m.minutes}m
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Calculator className="size-3.5 text-primary" />
          Desmos is available in both Math modules.
        </p>
        <div className="mt-3">
          <DesmosPanel />
        </div>

        <div className="mt-auto pt-6">
          <button
            onClick={() => setStarted(true)}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground"
          >
            {started ? "Test in progress" : "Begin test"} <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
