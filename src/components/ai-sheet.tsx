import { useState } from "react";
import { ArrowUp, Sparkles, X } from "lucide-react";
import { aiQuickChips } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AiFab({ context }: { context?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask AI"
        className="fixed bottom-24 right-4 z-40 flex size-11 items-center justify-center rounded-full border border-border bg-surface shadow-elevated transition-colors hover:bg-surface-2"
      >
        <Sparkles className="size-[18px] text-primary" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Ask AI">
          <button
            aria-label="Close"
            className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-border bg-popover p-4 pb-[max(env(safe-area-inset-bottom),1rem)] shadow-sheet">
            <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-border-strong" />
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Ask AI</p>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1">
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
            {context && (
              <p className="mb-3 rounded-md border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-muted-foreground">
                Context: {context}
              </p>
            )}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {aiQuickChips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
              <input
                placeholder="Ask anything about this topic…"
                className="min-h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                aria-label="Send"
                className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Screen({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <div className={cn("mx-auto w-full max-w-md px-5 pb-36 pt-3", className)}>{children}</div>
    </div>
  );
}
