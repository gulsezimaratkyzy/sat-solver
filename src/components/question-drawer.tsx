import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Calculator, Check, FileText, Menu, X } from "lucide-react";
import { difficulties, topicBank, type Subject } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function QuestionDrawer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<Subject>("math");
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>("adaptive");

  const toggle = (id: string) =>
    setTopics((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const selected = topicBank[subject].filter((t) => topics.includes(t.id));
  const pool = selected.reduce((n, t) => n + t.count, 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open practice builder"
        className="-ml-2 flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-2"
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="SAT questions">
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-[3px]"
          />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[70dvh] flex-col rounded-t-3xl border-t border-border bg-popover shadow-sheet">
            <div className="shrink-0 px-5 pt-3">
              <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-border-strong" />
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold tracking-tight">SAT questions</h2>
                <button onClick={() => setOpen(false)} aria-label="Close" className="p-1">
                  <X className="size-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-3">
              <div className="grid grid-cols-2 gap-2">
                {(["english", "math"] as Subject[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSubject(s);
                      setTopics([]);
                    }}
                    aria-pressed={subject === s}
                    className={cn(
                      "min-h-12 rounded-xl border text-sm font-medium capitalize transition-colors",
                      subject === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:bg-surface-2",
                    )}
                  >
                    {s === "english" ? "English" : "Math"}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-sm font-medium">
                Topics{" "}
                <span className="tnum text-xs font-normal text-muted-foreground">
                  {topics.length ? `${topics.length} selected` : "pick one or more"}
                </span>
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {topicBank[subject].map((t) => {
                  const on = topics.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggle(t.id)}
                      aria-pressed={on}
                      className={cn(
                        "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs transition-colors",
                        on
                          ? "border-primary/60 bg-accent text-accent-foreground"
                          : "border-border text-muted-foreground hover:bg-surface-2",
                      )}
                    >
                      {on && <Check className="size-3" />}
                      {t.label}
                      <span className="tnum text-[10px] opacity-60">{t.count}</span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-sm font-medium">Difficulty</p>
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {difficulties.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    aria-pressed={difficulty === d.id}
                    className={cn(
                      "min-h-10 rounded-lg border text-xs font-medium transition-colors",
                      difficulty === d.id
                        ? "border-primary/60 bg-accent text-accent-foreground"
                        : "border-border text-muted-foreground hover:bg-surface-2",
                    )}
                    style={
                      difficulty === d.id ? { color: `var(--${d.tone})` } : undefined
                    }
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {subject === "math" && (
                <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Calculator className="size-3.5 text-primary" />
                  Desmos graphing calculator is available inside every Math set.
                </p>
              )}

              <Link
                to="/full-test"
                onClick={() => setOpen(false)}
                className="mt-5 flex min-h-12 items-center gap-3 rounded-xl border border-border px-3 text-sm transition-colors hover:bg-surface-2"
              >
                <FileText className="size-4 text-info" />
                <span className="flex-1">
                  Full-length SAT
                  <span className="tnum block text-xs text-muted-foreground">
                    98 questions · 2h 14m · real timing
                  </span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            </div>

            <div className="shrink-0 border-t border-border px-5 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
              <button
                disabled={topics.length === 0}
                onClick={() => {
                  setOpen(false);
                  navigate({
                    to: "/practice",
                    search: { subject, topics: topics.join(","), difficulty },
                  });
                }}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground disabled:opacity-40"
              >
                {topics.length ? (
                  <span className="tnum">Start · {pool} questions in pool</span>
                ) : (
                  "Select a topic to start"
                )}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
