import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart2, Home, Target, Type } from "lucide-react";
import { cn } from "@/lib/utils";

/** Plain outlined circle — the AI surface has no metaphor yet, so it gets none. */
function AiCircle({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "block size-[22px] rounded-full border-[1.75px] transition-colors",
        active ? "border-foreground bg-foreground/15" : "border-current",
      )}
    />
  );
}

function Avatar({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "flex size-[22px] items-center justify-center rounded-full border-[1.75px] text-[9px] font-semibold transition-colors",
        active ? "border-foreground bg-foreground text-background" : "border-current",
      )}
    >
      AK
    </span>
  );
}

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/practice", label: "Practice", icon: Target },
  { to: "/ai", label: "AI", render: AiCircle },
  { to: "/insights", label: "Insights", icon: BarChart2 },
  { to: "/vocabulary", label: "Vocabulary", icon: Type },
  { to: "/profile", label: "Profile", render: Avatar },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),0.75rem)]"
    >
      <div className="pointer-events-none mx-auto w-full max-w-md px-5">
        <div className="pointer-events-auto flex items-center justify-between rounded-full border border-border bg-background/80 px-3 py-2 shadow-elevated backdrop-blur-xl">
          {tabs.map((t) => {
            const active = t.to === "/" ? path === "/" : path.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                aria-label={t.label}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex size-11 items-center justify-center rounded-full transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {"render" in t ? (
                  <t.render active={active} />
                ) : (
                  <t.icon className="size-[22px]" strokeWidth={active ? 2.25 : 1.75} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
