import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, ChevronRight, Play } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { QuestionDrawer } from "@/components/question-drawer";
import { AiFab, Screen } from "@/components/ai-sheet";
import {
  ChangelogItem,
  CompositionBar,
  IssueRow,
  ScoreInterval,
  SectionLabel,
} from "@/components/sat-ui";
import { changelog, issues, profile, sessionComposition } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Sightline SAT" },
      {
        name: "description",
        content:
          "Your daily SAT focus: predicted score interval, prioritized issues and one interleaved session built from your weak spots.",
      },
      { property: "og:title", content: "Today — Sightline SAT" },
      {
        property: "og:description",
        content: "Predicted score interval, open issues and today's interleaved practice session.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const open = issues.filter((i) => i.status !== "resolved");

  return (
    <>
      <Screen>
        <header className="flex items-center justify-between py-2">
          <div className="flex items-center gap-1">
            <QuestionDrawer />
            <div>
            <h1 className="text-lg font-semibold tracking-tight">Hi, {profile.name}</h1>
            <p className="text-xs text-muted-foreground">Today · interleaved focus</p>
            </div>
          </div>
          <span className="tnum inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {profile.daysToExam} days to exam
          </span>
        </header>

        <div className="mt-3">
          <ScoreInterval
            low={profile.currentInterval[0]}
            high={profile.currentInterval[1]}
            prevLow={profile.previousInterval[0]}
            prevHigh={profile.previousInterval[1]}
          />
        </div>

        <SectionLabel>Today's focus</SectionLabel>
        <section className="panel p-4">
          <p className="text-sm leading-relaxed">
            A mixed session assembled from your 2 P0 issues plus 1 skill about to fall below the
            retention threshold.
          </p>
          <div className="mt-3">
            <CompositionBar parts={sessionComposition} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Composition is weighted toward your P0 topics. You pick the duration, not the topic.
          </p>
          <Link
            to="/practice"
            search={{ subject: "", topics: "", difficulty: "" }}
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Play className="size-4" />
            <span className="tnum">Start session · 12 min</span>
          </Link>
        </section>

        <SectionLabel
          action={
            <span className="tnum text-xs text-muted-foreground">{open.length} open</span>
          }
        >
          Issues
        </SectionLabel>
        <div className="space-y-1.5">
          {issues.map((issue) => (
            <IssueRow key={issue.id} issue={issue} />
          ))}
        </div>

        <SectionLabel
          action={
            <Link
              to="/insights"
              className="inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground"
            >
              View all <ChevronRight className="size-3" />
            </Link>
          }
        >
          Changelog
        </SectionLabel>
        <div className="panel divide-y divide-border px-3">
          {changelog.slice(0, 3).map((e) => (
            <ChangelogItem key={e.id} entry={e} />
          ))}
        </div>

        <Link
          to="/insights"
          className="mt-4 flex min-h-11 items-center justify-between rounded-lg border border-border bg-surface px-3 text-sm transition-colors hover:bg-surface-2"
        >
          Open full analytics
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
      </Screen>
      <AiFab context="Today's session plan" />
      <BottomNav />
    </>
  );
}
