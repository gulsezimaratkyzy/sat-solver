import { useEffect, useState } from "react";
import { Eye, EyeOff, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export function useCountdown(totalSeconds: number, running: boolean) {
  const [left, setLeft] = useState(totalSeconds);
  useEffect(() => setLeft(totalSeconds), [totalSeconds]);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);
  return left;
}

export function formatClock(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Timer that the student can hide — visible pressure is optional, tracking is not. */
export function TimerPill({
  seconds,
  low,
  className,
}: {
  seconds: number;
  low?: boolean;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span
        className={cn(
          "tnum inline-flex min-h-8 items-center gap-1.5 px-2 text-sm font-medium",
          low ? "text-destructive" : "text-foreground",
        )}
      >
        <Timer className={cn("size-3.5", low ? "text-destructive" : "text-primary")} />
        {visible ? formatClock(seconds) : "--:--"}
      </span>
      <button
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide timer" : "Show timer"}
        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-2"
      >
        {visible ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
      </button>
    </div>
  );
}
