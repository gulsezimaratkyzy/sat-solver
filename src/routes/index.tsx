import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { Screen } from "@/components/ai-sheet";
import { ScoreInterval } from "@/components/sat-ui";
import { profile, sessionComposition } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Sightline SAT" },
      {
        name: "description",
        content:
          "Your daily SAT focus: a predicted score range and one interleaved session built from your weak spots.",
      },
      { property: "og:title", content: "Today — Sightline SAT" },
      {
        property: "og:description",
        content: "Predicted score range and today's interleaved SAT session.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Screen>
        <header className="flex items-baseline justify-between pt-4">
          <h1 className="text-[26px] font-semibold tracking-tight">Hi, {profile.name}</h1>
          <span className="tnum text-xs text-muted-foreground">
            {profile.daysToExam} days to SAT
          </span>
        </header>

        <ScoreInterval
          low={profile.currentInterval[0]}
          high={profile.currentInterval[1]}
          prevLow={profile.previousInterval[0]}
          prevHigh={profile.previousInterval[1]}
        />

        <hr className="mt-8 border-border" />

        <section className="pt-7">
          <h2 className="text-lg font-semibold tracking-tight">Today's session</h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
            A mixed 12-minute set drawn from your two weakest topics plus one skill about to slip
            below the retention threshold.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-muted-foreground">
            {sessionComposition.map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5">
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: `var(--${p.tone})` }}
                />
                <span className="tnum">{p.pct}%</span> {p.label}
              </span>
            ))}
          </div>

          <Link
            to="/practice"
            search={{ subject: "", topics: "", difficulty: "" }}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Play className="size-4" />
            <span className="tnum">Start session · 12 min</span>
          </Link>
        </section>

        <hr className="mt-8 border-border" />

        <section className="pt-7">
          <h2 className="text-lg font-semibold tracking-tight">Practice</h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
            No clock, no session. Pick English or Math, choose a question type and a difficulty, and
            keep solving — the explanation appears the moment you need it.
          </p>
          <Link
            to="/practice"
            search={{ subject: "", topics: "", difficulty: "" }}
            className="mt-5 flex min-h-12 w-full items-center justify-between rounded-full border border-border px-5 text-[15px] font-medium transition-colors hover:bg-surface-2"
          >
            Open practice
            <ArrowRight className="size-4 text-muted-foreground" />
          </Link>
          <Link
            to="/full-test"
            className="mt-2.5 flex min-h-12 w-full items-center justify-between rounded-full border border-border px-5 text-[15px] font-medium transition-colors hover:bg-surface-2"
          >
            Full-length SAT
            <span className="tnum text-xs text-muted-foreground">98 questions · 2h 14m</span>
          </Link>
        </section>
      </Screen>
      <BottomNav />
    </>
  );
}
