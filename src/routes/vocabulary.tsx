import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";
import { AiFab, Screen } from "@/components/ai-sheet";
import { CurveSparkline, SectionLabel } from "@/components/sat-ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary — Sightline SAT" },
      {
        name: "description",
        content:
          "SAT vocabulary scheduled by a forgetting-curve model: each word surfaces exactly when retention drops, not on a fixed streak timer.",
      },
      { property: "og:title", content: "Vocabulary — Sightline SAT" },
      {
        property: "og:description",
        content: "Words resurface when your modeled retention drops — not on a streak timer.",
      },
    ],
  }),
  component: Vocabulary,
});

const words = [
  { w: "Laconic", d: "using very few words", freshness: 22, due: "due now" },
  { w: "Equivocate", d: "to use ambiguous language to conceal the truth", freshness: 31, due: "due now" },
  { w: "Ameliorate", d: "to make something better", freshness: 48, due: "in 2 days" },
  { w: "Prosaic", d: "commonplace, unromantic", freshness: 66, due: "in 4 days" },
  { w: "Obdurate", d: "stubbornly refusing to change opinion", freshness: 81, due: "in 9 days" },
];

const curve = (start: number) =>
  Array.from({ length: 12 }, (_, i) => Math.max(6, Math.round(start * Math.exp(-0.06 * i))));

function Vocabulary() {
  const [flipped, setFlipped] = useState<string | null>(null);
  const due = words.filter((w) => w.freshness < 40).length;

  return (
    <>
      <Screen>
        <header className="flex items-center gap-2 py-2">
          <Link to="/profile" aria-label="Back" className="-ml-2 flex size-11 items-center justify-center">
            <ArrowLeft className="size-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Vocabulary</h1>
            <p className="tnum text-xs text-muted-foreground">{due} words below threshold</p>
          </div>
        </header>

        <button className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground">
          <RotateCcw className="size-4" />
          <span className="tnum">Review {due} due words · 4 min</span>
        </button>

        <SectionLabel>Deck</SectionLabel>
        <div className="space-y-1.5">
          {words.map((word) => {
            const urgent = word.freshness < 40;
            return (
              <button
                key={word.w}
                onClick={() => setFlipped(flipped === word.w ? null : word.w)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center gap-3">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{word.w}</span>
                    <span
                      className={cn(
                        "tnum mt-0.5 block text-xs",
                        urgent ? "text-warning" : "text-muted-foreground",
                      )}
                    >
                      retention {word.freshness}% · {word.due}
                    </span>
                  </span>
                  <CurveSparkline
                    points={curve(word.freshness + 20)}
                    tone={urgent ? "var(--warning)" : "var(--chart-2)"}
                  />
                </div>
                {flipped === word.w && (
                  <p className="mt-2 border-t border-border pt-2 text-sm text-muted-foreground">
                    {word.d}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </Screen>
      <AiFab context="Vocabulary deck" />
      <BottomNav />
    </>
  );
}
