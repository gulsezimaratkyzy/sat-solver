import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Search, UserPlus, X } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { Screen } from "@/components/ai-sheet";
import { friendRequests, friends, myToday, type Friend } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends — Sightline SAT" },
      {
        name: "description",
        content:
          "Add friends who study for the SAT with you and compare questions solved today, streaks, accuracy and score ranges.",
      },
      { property: "og:title", content: "Friends — Sightline SAT" },
      {
        property: "og:description",
        content: "Compare today's solved questions, streaks and score ranges with your friends.",
      },
    ],
  }),
  component: Friends,
});

type Sort = "today" | "streak" | "accuracy";
const sorts: { key: Sort; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "streak", label: "Streak" },
  { key: "accuracy", label: "Accuracy" },
];

function Friends() {
  const [sort, setSort] = useState<Sort>("today");
  const [query, setQuery] = useState("");
  const [list, setList] = useState<Friend[]>(friends);
  const [requests, setRequests] = useState(friendRequests);
  const [open, setOpen] = useState<string | null>(null);

  const rows = [...list]
    .filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) =>
      sort === "today"
        ? b.solvedToday - a.solvedToday
        : sort === "streak"
          ? b.streakDays - a.streakDays
          : b.accuracy - a.accuracy,
    );

  const myRank =
    [...list, { solvedToday: myToday.solvedToday } as Friend]
      .sort((a, b) => b.solvedToday - a.solvedToday)
      .findIndex((f) => f.solvedToday === myToday.solvedToday) + 1;

  return (
    <>
      <Screen>
        <header className="pt-4">
          <h1 className="text-[26px] font-semibold tracking-tight">Friends</h1>
          <p className="tnum text-xs text-muted-foreground">
            {list.length} friends · you solved {myToday.solvedToday} today · rank #{myRank}
          </p>
        </header>

        <div className="mt-5 flex items-center gap-2 rounded-full border border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a friend by name"
            className="min-h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button aria-label="Invite a friend" className="p-1 text-primary">
            <UserPlus className="size-4" />
          </button>
        </div>

        {requests.length > 0 && (
          <section className="pt-7">
            <h2 className="text-sm font-semibold tracking-tight">Requests</h2>
            <div className="mt-1 divide-y divide-border">
              {requests.map((r) => (
                <div key={r.id} className="flex items-center gap-3 py-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-[11px] font-semibold">
                    {r.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{r.name}</p>
                    <p className="tnum text-xs text-muted-foreground">
                      {r.mutual} mutual friends
                    </p>
                  </div>
                  <button
                    aria-label={`Accept ${r.name}`}
                    onClick={() => {
                      setList((l) => [
                        ...l,
                        {
                          id: r.id,
                          name: r.name,
                          initials: r.initials,
                          school: "—",
                          solvedToday: 0,
                          streakDays: 0,
                          accuracy: 0,
                          interval: [1000, 1200],
                          lastActive: "just added",
                          tone: "chart-1",
                        },
                      ]);
                      setRequests((x) => x.filter((i) => i.id !== r.id));
                    }}
                    className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Check className="size-4" />
                  </button>
                  <button
                    aria-label={`Dismiss ${r.name}`}
                    onClick={() => setRequests((x) => x.filter((i) => i.id !== r.id))}
                    className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <hr className="mt-7 border-border" />

        <section className="pt-7">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Leaderboard</h2>
            <div className="flex gap-1.5">
              {sorts.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSort(s.key)}
                  aria-pressed={sort === s.key}
                  className={cn(
                    "min-h-8 rounded-full border px-3 text-[11px] font-medium transition-colors",
                    sort === s.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:bg-surface-2",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 divide-y divide-border">
            {rows.map((f, i) => {
              const expanded = open === f.id;
              const value =
                sort === "today"
                  ? `${f.solvedToday} today`
                  : sort === "streak"
                    ? `${f.streakDays} d streak`
                    : `${f.accuracy}% acc`;
              return (
                <div key={f.id}>
                  <button
                    onClick={() => setOpen(expanded ? null : f.id)}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <span className="tnum w-4 text-xs text-muted-foreground">{i + 1}</span>
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-background"
                      style={{ backgroundColor: `var(--${f.tone})` }}
                    >
                      {f.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium">{f.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {f.school} · {f.lastActive}
                      </p>
                    </div>
                    <span className="tnum shrink-0 text-sm">{value}</span>
                  </button>

                  {expanded && (
                    <div className="pb-4 pl-16">
                      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
                        <span className="tnum">
                          Solved today <span className="text-foreground">{f.solvedToday}</span>
                        </span>
                        <span className="tnum">
                          Streak <span className="text-foreground">{f.streakDays} d</span>
                        </span>
                        <span className="tnum">
                          Accuracy <span className="text-foreground">{f.accuracy}%</span>
                        </span>
                        <span className="tnum">
                          Range{" "}
                          <span className="text-foreground">
                            {f.interval[0]}–{f.interval[1]}
                          </span>
                        </span>
                      </div>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (f.solvedToday / 50) * 100)}%`,
                            backgroundColor: `var(--${f.tone})`,
                          }}
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] text-muted-foreground">
                        Daily goal 50 questions
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </Screen>
      <BottomNav />
    </>
  );
}
