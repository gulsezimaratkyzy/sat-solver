import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Link2 } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { Screen } from "@/components/ai-sheet";
import { aiQuickChips, aiThread } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "AI tutor — Sightline SAT" },
      {
        name: "description",
        content:
          "A context-aware SAT tutor that explains the question you just missed, compares your hypothesis with the real cause and drills the same pattern.",
      },
      { property: "og:title", content: "AI tutor — Sightline SAT" },
      {
        property: "og:description",
        content: "Context-aware explanations tied to the exact question you just missed.",
      },
    ],
  }),
  component: AiScreen,
});

function AiScreen() {
  const [messages, setMessages] = useState(aiThread);
  const [draft, setDraft] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "assistant",
        text: "Here's the short version: identify the structure first, then pick the tool. I'll walk through it step by step and end with one practice item on the same pattern.",
      },
    ]);
    setDraft("");
  };

  return (
    <>
      <Screen className="pb-40">
        <header className="py-2">
          <h1 className="text-lg font-semibold tracking-tight">AI tutor</h1>
          <p className="text-xs text-muted-foreground">Knows what you just answered</p>
        </header>

        <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
          <Link2 className="size-3.5 shrink-0 text-primary" />
          <p className="truncate text-xs text-muted-foreground">
            Discussing: <span className="text-foreground">Quadratic word problems</span>
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-xl border px-3 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto border-border bg-surface-2"
                  : "border-border bg-surface",
              )}
            >
              {m.text}
            </div>
          ))}
        </div>
      </Screen>

      <div className="fixed inset-x-0 bottom-[68px] z-30 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-md px-4 py-2.5">
          <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5">
            {aiQuickChips.map((c) => (
              <button
                key={c}
                onClick={() => send(c)}
                className="min-h-8 shrink-0 rounded-full border border-border px-3 text-xs text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {c}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about this topic…"
              className="min-h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            >
              <ArrowUp className="size-4" />
            </button>
          </form>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
