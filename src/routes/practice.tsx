import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bookmark, Check, RotateCcw, Trash2, X } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { Screen } from "@/components/ai-sheet";
import { DesmosPanel } from "@/components/desmos-panel";
import { useSavedQuestions } from "@/lib/saved-questions";
import {
  difficultyTone,
  fullTestModules,
  getPracticeQuestions,
  practiceBank,
  topicBank,
  type PracticeDifficulty,
  type PracticeQuestion,
  type Subject,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/practice")({
  validateSearch: (search: Record<string, unknown>) => ({
    subject: (search['subject'] as string) ?? "",
    topics: (search['topics'] as string) ?? "",
    difficulty: (search['difficulty'] as string) ?? "",
  }),
  head: () => ({
    meta: [
      { title: "Practice — Sightline SAT" },
      {
        name: "description",
        content:
          "Untimed SAT practice: choose English or Math, a question type and a difficulty, then solve with instant explanations.",
      },
      { property: "og:title", content: "Practice — Sightline SAT" },
      {
        property: "og:description",
        content: "Pick a subject, question type and difficulty, then practise with instant explanations.",
      },
    ],
  }),
  component: Practice,
});

const difficultyOptions: { id: PracticeDifficulty | "all"; label: string }[] = [
  { id: "all", label: "Mixed" },
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
];

function Practice() {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<PracticeDifficulty | "all">("all");
  const [started, setStarted] = useState(false);

  if (started && subject) {
    return (
      <Runner
        subject={subject}
        topics={topics}
        difficulty={difficulty}
        onExit={() => setStarted(false)}
      />
    );
  }

  return (
    <>
      <Screen>
        <header className="pt-4">
          <h1 className="text-[26px] font-semibold tracking-tight">Practice</h1>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
            No timer, no session length. Solve as long as you want — the explanation is one tap
            away.
          </p>
        </header>

        <section className="pt-7">
          <p className="text-[13px] text-muted-foreground">1 · Subject</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {(["english", "math"] as Subject[]).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSubject(s);
                  setTopics([]);
                }}
                aria-pressed={subject === s}
                className={cn(
                  "min-h-14 rounded-2xl border text-[15px] font-medium transition-colors",
                  subject === s
                    ? "border-foreground bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-surface-2",
                )}
              >
                {s === "english" ? "English" : "Math"}
              </button>
            ))}
          </div>
        </section>

        {subject && (
          <>
            <section className="pt-7">
              <p className="text-[13px] text-muted-foreground">
                2 · Question type{" "}
                <span className="tnum">
                  {topics.length ? `· ${topics.length} selected` : "· all types"}
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {topicBank[subject].map((t) => {
                  const on = topics.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() =>
                        setTopics((cur) =>
                          cur.includes(t.id) ? cur.filter((x) => x !== t.id) : [...cur, t.id],
                        )
                      }
                      aria-pressed={on}
                      className={cn(
                        "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-[13px] transition-colors",
                        on
                          ? "border-foreground bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:bg-surface-2",
                      )}
                    >
                      {on && <Check className="size-3.5" />}
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="pt-7">
              <p className="text-[13px] text-muted-foreground">3 · Difficulty</p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {difficultyOptions.map((d) => {
                  const on = difficulty === d.id;
                  const tone = d.id === "all" ? "chart-1" : difficultyTone[d.id];
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDifficulty(d.id)}
                      aria-pressed={on}
                      className={cn(
                        "min-h-12 rounded-2xl border text-[13px] font-medium transition-colors",
                        on ? "bg-surface-2" : "border-border text-muted-foreground hover:bg-surface-2",
                      )}
                      style={on ? { color: `var(--${tone})`, borderColor: `var(--${tone})` } : undefined}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {subject === "math" && (
              <p className="pt-6 text-[13px] text-muted-foreground">
                The Desmos graphing calculator is available inside every Math set.
              </p>
            )}

            <button
              onClick={() => setStarted(true)}
              className="mt-8 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <span className="tnum">
                Start · {getPracticeQuestions(subject, topics, difficulty).length} questions
              </span>
              <ArrowRight className="size-4" />
            </button>
          </>
        )}
      </Screen>
      <BottomNav />
    </>
  );
}

function Runner({
  subject,
  topics,
  difficulty,
  onExit,
}: {
  subject: Subject;
  topics: string[];
  difficulty: PracticeDifficulty | "all";
  onExit: () => void;
}) {
  const questions = useMemo(
    () => getPracticeQuestions(subject, topics, difficulty),
    [subject, topics, difficulty],
  );
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [solved, setSolved] = useState(0);

  const q = questions[i]!;
  const tone = difficultyTone[q.difficulty];
  const correct = checked && choice === q.correct;

  const reset = () => {
    setChoice(null);
    setChecked(false);
  };

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto w-full max-w-md px-5 pb-32 pt-4">
        <header className="flex items-center justify-between">
          <button
            onClick={onExit}
            aria-label="Leave practice"
            className="-ml-2 flex size-11 items-center justify-center text-muted-foreground"
          >
            <X className="size-5" />
          </button>
          <p className="tnum text-[13px] text-muted-foreground">
            {i + 1} / {questions.length} · {solved} solved
          </p>
          <div className="flex w-11 justify-end">
            {subject === "math" && <DesmosPanel />}
          </div>
        </header>

        <div className="mt-6 flex items-center gap-2.5 text-[13px]">
          <span className="font-medium capitalize" style={{ color: `var(--${tone})` }}>
            {q.difficulty}
          </span>
          <span className="text-muted-foreground">
            {topicBank[subject].find((t) => t.id === q.topic)?.label ?? q.topic}
          </span>
        </div>

        <p className="mt-3 text-[19px] font-medium leading-snug tracking-tight">{q.prompt}</p>

        <div className="mt-6 space-y-2.5">
          {q.choices.map((c, idx) => {
            const picked = choice === idx;
            const isAnswer = idx === q.correct;
            const state = checked && isAnswer ? "right" : checked && picked ? "wrong" : picked ? "picked" : "idle";
            return (
              <button
                key={idx}
                onClick={() => !checked && setChoice(idx)}
                aria-pressed={picked}
                className={cn(
                  "flex w-full items-center gap-3.5 rounded-3xl border px-4 py-4 text-left text-[15px] transition-all",
                  state === "idle" && "border-border hover:bg-surface-2",
                  state === "picked" && "border-foreground bg-surface-2",
                  state === "right" && "border-success bg-success/10",
                  state === "wrong" && "border-destructive bg-destructive/10",
                )}
              >
                <span
                  className={cn(
                    "tnum flex size-8 shrink-0 items-center justify-center rounded-full border text-[13px]",
                    state === "idle" && "border-border text-muted-foreground",
                    state === "picked" && "border-foreground",
                    state === "right" && "border-success text-success",
                    state === "wrong" && "border-destructive text-destructive",
                  )}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{c}</span>
                {state === "right" && <Check className="size-4 text-success" />}
                {state === "wrong" && <X className="size-4 text-destructive" />}
              </button>
            );
          })}
        </div>

        {checked && (
          <section className="pt-7">
            <p
              className="text-[15px] font-medium"
              style={{ color: correct ? "var(--success)" : "var(--destructive)" }}
            >
              {correct ? "Correct" : "Not quite"}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {q.explanation}
            </p>
          </section>
        )}

        <div className="mt-8 flex items-center gap-2.5">
          {i > 0 && (
            <button
              onClick={() => {
                setI(i - 1);
                reset();
              }}
              aria-label="Previous question"
              className="flex size-13 items-center justify-center rounded-full border border-border p-4 text-muted-foreground transition-colors hover:bg-surface-2"
            >
              <ArrowLeft className="size-4" />
            </button>
          )}

          {!checked ? (
            <button
              disabled={choice === null}
              onClick={() => {
                setChecked(true);
                if (choice === q.correct) setSolved((s) => s + 1);
              }}
              className="flex min-h-13 flex-1 items-center justify-center rounded-full bg-primary py-4 text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-35"
            >
              Check answer
            </button>
          ) : i + 1 < questions.length ? (
            <button
              onClick={() => {
                setI(i + 1);
                reset();
              }}
              className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded-full bg-primary py-4 text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Next question <ArrowRight className="size-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setI(0);
                setSolved(0);
                reset();
              }}
              className="flex min-h-13 flex-1 items-center justify-center gap-2 rounded-full border border-border py-4 text-[15px] font-medium transition-colors hover:bg-surface-2"
            >
              <RotateCcw className="size-4" /> Start over
            </button>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
