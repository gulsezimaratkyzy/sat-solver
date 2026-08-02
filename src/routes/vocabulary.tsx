import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownAZ, Plus, RotateCcw, SignalHigh, X } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { AiFab, Screen } from "@/components/ai-sheet";
import { vocabWords, type VocabWord } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary — Sightline SAT" },
      {
        name: "description",
        content:
          "A full SAT word bank plus the words you add yourself, sortable alphabetically or by difficulty and scheduled by a forgetting-curve model.",
      },
      { property: "og:title", content: "Vocabulary — Sightline SAT" },
      {
        property: "og:description",
        content: "SAT word bank and your own words, sorted by alphabet or difficulty.",
      },
    ],
  }),
  component: Vocabulary,
});

const diffMeta = [
  { label: "Easy", tone: "chart-2" },
  { label: "Medium", tone: "chart-3" },
  { label: "Hard", tone: "chart-4" },
];

type Sort = "alpha" | "difficulty";
type Filter = "all" | "sat" | "mine";

function Vocabulary() {
  const [sort, setSort] = useState<Sort>("alpha");
  const [filter, setFilter] = useState<Filter>("all");
  const [flipped, setFlipped] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ word: "", definition: "" });
  const [mine, setMine] = useState<VocabWord[]>([]);

  const all = useMemo(() => [...mine, ...vocabWords], [mine]);

  const list = useMemo(() => {
    const f = all.filter((w) => (filter === "all" ? true : w.source === filter));
    return [...f].sort((a, b) =>
      sort === "alpha"
        ? a.word.localeCompare(b.word)
        : b.difficulty - a.difficulty || a.word.localeCompare(b.word),
    );
  }, [all, filter, sort]);

  const due = all.filter((w) => w.retention < 40).length;

  return (
    <>
      <Screen>
        <header className="flex items-center justify-between py-2">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Vocabulary</h1>
            <p className="tnum text-xs text-muted-foreground">
              {all.length} words · {due} below retention threshold
            </p>
          </div>
          <button
            onClick={() => setAdding(true)}
            aria-label="Add a word"
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Plus className="size-4" />
          </button>
        </header>

        <button className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground">
          <RotateCcw className="size-4" />
          <span className="tnum">Review {due} due words · 5 min</span>
        </button>

        <div className="mt-5 flex items-center gap-2">
          <div className="flex flex-1 gap-1.5">
            {(["all", "sat", "mine"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "min-h-9 flex-1 rounded-full border px-2 text-xs font-medium capitalize transition-colors",
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-surface-2",
                )}
              >
                {f === "sat" ? "SAT bank" : f === "mine" ? "My words" : "All"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSort(sort === "alpha" ? "difficulty" : "alpha")}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium transition-colors hover:bg-surface-2"
          >
            {sort === "alpha" ? (
              <ArrowDownAZ className="size-3.5 text-primary" />
            ) : (
              <SignalHigh className="size-3.5 text-primary" />
            )}
            {sort === "alpha" ? "A–Z" : "Difficulty"}
          </button>
        </div>

        <div className="mt-4 divide-y divide-border">
          {list.map((word) => {
            const meta = diffMeta[word.difficulty - 1]!;
            const urgent = word.retention < 40;
            return (
              <button
                key={word.word}
                onClick={() => setFlipped(flipped === word.word ? null : word.word)}
                className="w-full py-3 text-left"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[15px] font-medium">{word.word}</span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: `var(--${meta.tone})` }}
                  >
                    {meta.label}
                  </span>
                  {word.source === "mine" && (
                    <span className="text-[11px] text-chart-5">mine</span>
                  )}
                  <span
                    className={cn(
                      "tnum ml-auto text-xs",
                      urgent ? "text-destructive" : "text-muted-foreground",
                    )}
                  >
                    {word.retention}%
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-0.5 text-sm text-muted-foreground",
                    flipped === word.word ? "" : "blur-[3px] select-none",
                  )}
                >
                  {word.definition}
                </p>
              </button>
            );
          })}
        </div>
      </Screen>

      {adding && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Add a word">
          <button
            aria-label="Close"
            onClick={() => setAdding(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-[3px]"
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-border bg-popover p-5 pb-[max(env(safe-area-inset-bottom),1.25rem)] shadow-sheet">
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-border-strong" />
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight">Add a word</h2>
              <button onClick={() => setAdding(false)} aria-label="Close" className="p-1">
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
            <input
              value={draft.word}
              onChange={(e) => setDraft({ ...draft, word: e.target.value })}
              placeholder="Word"
              className="min-h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
            />
            <input
              value={draft.definition}
              onChange={(e) => setDraft({ ...draft, definition: e.target.value })}
              placeholder="Definition"
              className="mt-2 min-h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
            />
            <button
              disabled={!draft.word.trim()}
              onClick={() => {
                setMine((m) => [
                  {
                    word: draft.word.trim(),
                    definition: draft.definition.trim() || "No definition yet",
                    difficulty: 2,
                    retention: 20,
                    source: "mine",
                  },
                  ...m,
                ]);
                setDraft({ word: "", definition: "" });
                setAdding(false);
              }}
              className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground disabled:opacity-40"
            >
              Add to my deck
            </button>
          </div>
        </div>
      )}

      <AiFab context="Vocabulary" />
      <BottomNav />
    </>
  );
}
