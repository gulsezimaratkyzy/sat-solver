import { useCallback, useEffect, useState } from "react";

const KEY = "sightline.saved-questions";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

const listeners = new Set<(ids: string[]) => void>();

function broadcast(ids: string[]) {
  listeners.forEach((l) => l(ids));
}

/** Bookmarked question ids, persisted locally so a student can revisit misses. */
export function useSavedQuestions() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(read());
    const l = (next: string[]) => setIds(next);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    window.localStorage.setItem(KEY, JSON.stringify(next));
    broadcast(next);
  }, []);

  const remove = useCallback((id: string) => {
    const next = read().filter((x) => x !== id);
    window.localStorage.setItem(KEY, JSON.stringify(next));
    broadcast(next);
  }, []);

  return { ids, toggle, remove, isSaved: (id: string) => ids.includes(id) };
}
