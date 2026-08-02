import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, BookA, Home, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/ai", label: "AI", icon: Sparkles },
  { to: "/insights", label: "Insights", icon: BarChart3 },
  { to: "/vocabulary", label: "Words", icon: BookA },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-1 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-[18px]" strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
