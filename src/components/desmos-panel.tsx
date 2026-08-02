import { useState } from "react";
import { Calculator, X } from "lucide-react";

/** Official Bluebook-style Desmos graphing calculator, available during Math work. */
export function DesmosPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-2"
      >
        <Calculator className="size-3.5 text-primary" />
        Desmos
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Desmos calculator">
          <button
            aria-label="Close calculator"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-[3px]"
          />
          <div className="absolute inset-x-0 bottom-0 flex h-[78dvh] flex-col rounded-t-3xl border-t border-border bg-popover shadow-sheet">
            <div className="flex items-center justify-between px-4 py-2.5">
              <p className="inline-flex items-center gap-2 text-sm font-medium">
                <Calculator className="size-4 text-primary" />
                Graphing calculator
              </p>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1">
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
            <iframe
              title="Desmos graphing calculator"
              src="https://www.desmos.com/testing/cb-digital-sat/graphing"
              className="min-h-0 flex-1 w-full rounded-t-xl border-t border-border bg-surface"
            />
          </div>
        </div>
      )}
    </>
  );
}
