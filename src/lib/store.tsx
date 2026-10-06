import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEMO_COMPLETED, DEMO_PROFILE, DEMO_PROJECTS, type Profile } from "./careers";

export interface AppState {
  profile: Profile;
  completed: string[];
  projectsStarted: string[];
  projectsDone: string[];
  xp: number;
  streak: number;
  lastActive: string; // yyyy-mm-dd
  weeklyGoal: number; // skills per week
  weekLog: string[]; // dates of completions
  isDemo: boolean;
}

const KEY = "skillpath-ai:v1";
const today = () => new Date().toISOString().slice(0, 10);

const demoState = (): AppState => {
  const d = new Date();
  const log = [0, 1, 3, 4].map((n) => new Date(d.getTime() - n * 86400000).toISOString().slice(0, 10));
  return {
    profile: DEMO_PROFILE,
    completed: DEMO_COMPLETED,
    projectsStarted: ["fe-movies"],
    projectsDone: DEMO_PROJECTS,
    xp: 420 + 300,
    streak: 7,
    lastActive: today(),
    weeklyGoal: 5,
    weekLog: log,
    isDemo: true,
  };
};

interface Ctx extends AppState {
  hydrated: boolean;
  setProfile: (p: Profile) => void;
  toggleSkill: (id: string) => boolean; // returns new completed state
  startProject: (id: string) => void;
  completeProject: (id: string) => void;
  loadDemo: () => void;
  reset: () => void;
}

const StoreCtx = createContext<Ctx | null>(null);

function bumpStreak(s: AppState): AppState {
  const t = today();
  if (s.lastActive === t) return s;
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return { ...s, lastActive: t, streak: s.lastActive === y ? s.streak + 1 : 1 };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(demoState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...demoState(), ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const toggleSkill = useCallback((id: string) => {
    let nowDone = false;
    setState((s) => {
      const has = s.completed.includes(id);
      nowDone = !has;
      if (has) return { ...s, completed: s.completed.filter((c) => c !== id), xp: Math.max(0, s.xp - 50) };
      return bumpStreak({ ...s, completed: [...s.completed, id], xp: s.xp + 50, weekLog: [...s.weekLog, today()] });
    });
    return nowDone;
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      hydrated,
      setProfile: (p) =>
        setState((s) => ({
          ...s,
          profile: p,
          completed: [],
          projectsDone: [],
          projectsStarted: [],
          xp: p.known.length * 25,
          streak: 1,
          lastActive: today(),
          weekLog: [],
          isDemo: false,
        })),
      toggleSkill,
      startProject: (id) =>
        setState((s) => (s.projectsStarted.includes(id) ? s : { ...s, projectsStarted: [...s.projectsStarted, id] })),
      completeProject: (id) =>
        setState((s) =>
          s.projectsDone.includes(id)
            ? s
            : bumpStreak({ ...s, projectsDone: [...s.projectsDone, id], xp: s.xp + 150, weekLog: [...s.weekLog, today()] }),
        ),
      loadDemo: () => setState(demoState()),
      reset: () => {
        localStorage.removeItem(KEY);
        setState(demoState());
      },
    }),
    [state, hydrated, toggleSkill],
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore must be inside StoreProvider");
  return c;
}

export function weekCount(log: string[]) {
  const start = Date.now() - 6 * 86400000;
  return log.filter((d) => new Date(d).getTime() >= start - 86400000).length;
}
