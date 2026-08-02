import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Flag,
  Sparkles,
  Timer,
  X,
} from "lucide-react";
import { CompositionBar, PriorityBadge } from "@/components/sat-ui";
import { hypothesisChips, sessionComposition, sessionQuestions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice session — Sightline SAT" },
      {
        name: "description",
        content:
          "An interleaved SAT session with confidence calibration, error-hypothesis prompts and faded worked examples.",
      },
      { property: "og:title", content: "Practice session — Sightline SAT" },
      {
        property: "og:description",
        content: "Interleaved SAT drilling with calibration and generation-effect review.",
      },
    ],
  }),
  component: Practice,
});

type Stage = "pre" | "warmup" | "worked" | "question" | "hypothesis" | "review" | "summary";

function Practice() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("pre");
  const [minutes, setMinutes] = useState(12);
  const [qi, setQi] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [flagged, setFlagged] = useState(false);
  const [hypothesis, setHypothesis] = useState<string>("");
  const [correctCount, setCorrectCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const q = sessionQuestions[qi];
  const running = stage === "question" || stage === "hypothesis" || stage === "review";

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const left = Math.max(0, minutes * 60 - seconds);
  const clock = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;

  const submit = () => {
    if (choice === null) return;
    if (choice === q.correct) {
      setCorrectCount((c) => c + 1);
      setStage("review");
    } else {
      setStage("hypothesis");
    }
  };

  const next = () => {
    setChoice(null);
    setConfidence(null);
    setHypothesis("");
    setFlagged(false);
    if (qi + 1 < sessionQuestions.length) {
      setQi(qi + 1);
      setStage("question");
    } else {
      setStage("summary");
    }
  };

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
        {/* header */}
        <header className="flex items-center justify-between py-1">
          <button
            onClick={() => navigate({ to: "/" })}
            aria-label="Exit session"
            className="flex size-11 items-center justify-center -ml-2"
          >
            <X className="size-5 text-muted-foreground" />
          </button>
          {running && (
            <p className="tnum text-xs text-muted-foreground">
              Question {qi + 1} of {sessionQuestions.length}
            </p>
          )}
          {running ? (
            <span
              className="tnum inline-flex min-h-8 items-center gap-1.5 rounded-md border border-border px-2 text-xs text-muted-foreground"
              aria-label={`${Math.ceil(left / 60)} minutes remaining`}
            >
              <Timer className="size-3.5" />
              {clock}
            </span>
          ) : (
            <span className="size-11" />
          )}
        </header>

        {stage === "pre" && (
          <Pre
            minutes={minutes}
            setMinutes={setMinutes}
            onStart={() => setStage("warmup")}
          />
        )}

        {stage === "warmup" && <Warmup onNext={() => setStage("worked")} />}

        {stage === "worked" && <WorkedExample onDone={() => setStage("question")} />}

        {stage === "question" && (
          <Question
            q={q}
            choice={choice}
            setChoice={setChoice}
            confidence={confidence}
            setConfidence={setConfidence}
            flagged={flagged}
            setFlagged={setFlagged}
            onSubmit={submit}
          />
        )}

        {stage === "hypothesis" && (
          <Hypothesis
            value={hypothesis}
            setValue={setHypothesis}
            onNext={() => setStage("review")}
          />
        )}

        {stage === "review" && (
          <Review
            correct={choice === q.correct}
            confidence={confidence}
            hypothesis={hypothesis}
            rationale={q.rationale}
            answer={q.choices[q.correct]}
            onNext={next}
            last={qi + 1 === sessionQuestions.length}
          />
        )}

        {stage === "summary" && (
          <Summary
            total={sessionQuestions.length}
            correct={correctCount}
            seconds={seconds}
            onHome={() => navigate({ to: "/" })}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------- stages ---------------- */

function Pre({
  minutes,
  setMinutes,
  onStart,
}: {
  minutes: number;
  setMinutes: (n: number) => void;
  onStart: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mt-4 text-xl font-semibold tracking-tight">Session composition</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        You choose the length. The engine chooses the mix — interleaving beats blocked practice for
        transfer.
      </p>

      <section className="panel mt-5 p-4">
        <CompositionBar parts={sessionComposition} />
        <p className="mt-3 text-xs text-muted-foreground">
          Weighted toward your P0 topics and two skills near the retention threshold.
        </p>
      </section>

      <section className="panel mt-3 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Duration
        </p>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {[5, 10, 12, 20].map((m) => (
            <button
              key={m}
              onClick={() => setMinutes(m)}
              aria-pressed={minutes === m}
              className={cn(
                "tnum min-h-11 rounded-md border text-sm font-medium transition-colors",
                minutes === m
                  ? "border-primary/50 bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:bg-surface-2",
              )}
            >
              {m} min
            </button>
          ))}
        </div>
      </section>

      <div className="mt-auto pt-6">
        <button
          onClick={onStart}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground"
        >
          Ready <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function Warmup({ onNext }: { onNext: () => void }) {
  const [tried, setTried] = useState(false);
  return (
    <div className="flex flex-1 flex-col">
      <span className="mt-4 w-fit rounded border border-border bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        Warm-up · no timer, no penalty
      </span>
      <h1 className="mt-3 text-xl font-semibold tracking-tight">
        You probably won't solve this — that's the point.
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Trying first shows you where the gap is, so the explanation lands harder.
      </p>

      <section className="panel mt-5 p-4">
        <p className="text-sm leading-relaxed">
          A rectangle's length is 3 more than twice its width. Its area is 90. Without any formula
          you've been taught today, what's the width?
        </p>
        <textarea
          rows={3}
          placeholder="Any attempt at all…"
          onChange={() => setTried(true)}
          className="mt-3 w-full resize-none rounded-lg border border-border bg-surface-2 p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
        />
      </section>

      <div className="mt-auto space-y-2 pt-6">
        <button
          onClick={onNext}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground"
        >
          {tried ? "See the concept" : "Skip — show me the concept"}
        </button>
      </div>
    </div>
  );
}

function WorkedExample({ onDone }: { onDone: () => void }) {
  const [card, setCard] = useState(0);
  const support = [100, 50, 0][card];

  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Support level</span>
          <span className="tnum">{support}% solved for you</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${support}%` }}
          />
        </div>
      </div>

      <h1 className="mt-4 text-xl font-semibold tracking-tight">
        {["Worked example", "Fill the gaps", "On your own"][card]}
      </h1>

      <section className="panel mt-4 p-4 text-sm leading-relaxed">
        <p className="font-medium">x² + 5x − 14 = 0</p>
        <ol className="mt-3 space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="tnum text-xs text-muted-foreground/60">1</span>
            <span>Find two numbers whose product is −14 and sum is 5 → 7 and −2.</span>
          </li>
          <li className="flex gap-2">
            <span className="tnum text-xs text-muted-foreground/60">2</span>
            {card === 0 ? (
              <span>Factor: (x + 7)(x − 2) = 0.</span>
            ) : (
              <span className="rounded border border-dashed border-border-strong px-2 py-0.5">
                Factor: (x + __)(x − __) = 0
              </span>
            )}
          </li>
          <li className="flex gap-2">
            <span className="tnum text-xs text-muted-foreground/60">3</span>
            {card === 2 ? (
              <span className="rounded border border-dashed border-border-strong px-2 py-0.5">
                Solve on your own.
              </span>
            ) : (
              <span>Set each factor to zero → x = −7 or x = 2.</span>
            )}
          </li>
        </ol>
        {card === 0 && (
          <p className="mt-3 flex gap-2 rounded-md border border-border bg-surface-2 p-2.5 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 shrink-0 text-primary" />
            Margin note: the sign of the constant tells you whether the factors share a sign. Check
            it before guessing pairs.
          </p>
        )}
      </section>

      <div className="mt-auto pt-6">
        <button
          onClick={() => (card < 2 ? setCard(card + 1) : onDone())}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground"
        >
          {card < 2 ? "Next card" : "Start questions"} <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

const confidenceLabels = ["Low", "Medium", "High"];

function Question({
  q,
  choice,
  setChoice,
  confidence,
  setConfidence,
  flagged,
  setFlagged,
  onSubmit,
}: {
  q: (typeof sessionQuestions)[number];
  choice: number | null;
  setChoice: (n: number) => void;
  confidence: number | null;
  setConfidence: (n: number) => void;
  flagged: boolean;
  setFlagged: (b: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-3 flex items-center gap-2">
        <PriorityBadge p="P0" />
        <span className="text-xs text-muted-foreground">{q.domain}</span>
        <button
          onClick={() => setFlagged(!flagged)}
          aria-pressed={flagged}
          aria-label="Flag question"
          className="ml-auto flex size-11 items-center justify-center"
        >
          <Flag className={cn("size-4", flagged ? "text-warning" : "text-muted-foreground")} />
        </button>
      </div>

      <p className="mt-1 text-[15px] leading-relaxed">{q.prompt}</p>

      <div className="mt-4">
        <p className="text-xs text-muted-foreground">How confident are you?</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {confidenceLabels.map((l, i) => (
            <button
              key={l}
              onClick={() => setConfidence(i)}
              aria-pressed={confidence === i}
              className={cn(
                "min-h-11 rounded-md border text-xs font-medium transition-colors",
                confidence === i
                  ? "border-primary/50 bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:bg-surface-2",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {q.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => setChoice(i)}
            aria-pressed={choice === i}
            className={cn(
              "flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
              choice === i
                ? "border-primary/60 bg-accent"
                : "border-border bg-surface hover:bg-surface-2",
            )}
          >
            <span className="tnum flex size-6 shrink-0 items-center justify-center rounded border border-border text-[11px] text-muted-foreground">
              {String.fromCharCode(65 + i)}
            </span>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <button
          onClick={onSubmit}
          disabled={choice === null || confidence === null}
          className="flex min-h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground disabled:opacity-40"
        >
          Answer
        </button>
      </div>
    </div>
  );
}

function Hypothesis({
  value,
  setValue,
  onNext,
}: {
  value: string;
  setValue: (s: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mt-4 text-xl font-semibold tracking-tight">
        Error logged. Before the explanation —
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">What do you think went wrong?</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {hypothesisChips.map((c) => (
          <button
            key={c}
            onClick={() => setValue(c)}
            aria-pressed={value === c}
            className={cn(
              "min-h-9 rounded-full border px-3 text-xs transition-colors",
              value === c
                ? "border-primary/50 bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-surface-2",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <textarea
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Or describe it in your own words…"
        className="mt-3 w-full resize-none rounded-lg border border-border bg-surface p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
      />

      <div className="mt-auto pt-6">
        <button
          onClick={onNext}
          disabled={!value.trim()}
          className="flex min-h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground disabled:opacity-40"
        >
          Show the breakdown
        </button>
      </div>
    </div>
  );
}

function Review({
  correct,
  confidence,
  hypothesis,
  rationale,
  answer,
  onNext,
  last,
}: {
  correct: boolean;
  confidence: number | null;
  hypothesis: string;
  rationale: string;
  answer: string;
  onNext: () => void;
  last: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div
        className={cn(
          "mt-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
          correct
            ? "border-success/35 bg-success/10 text-success"
            : "border-destructive/35 bg-destructive/10 text-destructive",
        )}
      >
        {correct ? <Check className="size-4" /> : <X className="size-4" />}
        {correct ? "Correct" : "Incorrect"}
      </div>

      <p className="tnum mt-2 text-xs text-muted-foreground">
        You felt: {confidence === null ? "—" : confidenceLabels[confidence].toLowerCase()} · Reality:{" "}
        {correct ? "correct" : "error"}
      </p>

      {!correct && (
        <section className="panel mt-4 overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-border text-xs">
            <div className="p-3">
              <p className="mb-1 font-medium text-muted-foreground">Your hypothesis</p>
              <p className="leading-relaxed">{hypothesis}</p>
            </div>
            <div className="bg-surface-2 p-3">
              <p className="mb-1 font-medium text-muted-foreground">Actual cause</p>
              <p className="leading-relaxed">
                Rule gap, not carelessness — you applied the right arithmetic to the wrong structure.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="panel mt-3 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Correct answer
        </p>
        <p className="mt-1 text-sm font-medium">{answer}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{rationale}</p>
      </section>

      <div className="mt-auto pt-6">
        <button
          onClick={onNext}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground"
        >
          {last ? "Finish session" : "Next question"} <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function Summary({
  total,
  correct,
  seconds,
  onHome,
}: {
  total: number;
  correct: number;
  seconds: number;
  onHome: () => void;
}) {
  const stats = [
    { k: "Questions", v: `${total}` },
    { k: "Accuracy", v: `${Math.round((correct / total) * 100)}%` },
    { k: "Time", v: `${Math.floor(seconds / 60)}m ${seconds % 60}s` },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mt-4 text-xl font-semibold tracking-tight">Session log</h1>
      <div className="panel mt-4 grid grid-cols-3 divide-x divide-border">
        {stats.map((s) => (
          <div key={s.k} className="p-3 text-center">
            <p className="tnum text-xl font-semibold">{s.v}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{s.k}</p>
          </div>
        ))}
      </div>

      <section className="panel mt-3 divide-y divide-border">
        {[
          { t: "Closed: Comma splices", d: "0 errors in the last 8 attempts.", c: "text-success" },
          {
            t: "Progress: Circle theorems",
            d: "Mastery 46% → 54%. Next review in 2 days.",
            c: "text-info",
          },
          {
            t: "Regression: Quadratic word problems",
            d: "4 spaced repetitions queued.",
            c: "text-destructive",
          },
        ].map((r) => (
          <div key={r.t} className="p-3">
            <p className={cn("text-sm font-medium", r.c)}>{r.t}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{r.d}</p>
          </div>
        ))}
      </section>

      <div className="mt-auto pt-6">
        <button
          onClick={onHome}
          className="flex min-h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground"
        >
          Back home
        </button>
      </div>
    </div>
  );
}
