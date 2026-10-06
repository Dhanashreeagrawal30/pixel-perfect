import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Dumbbell, RotateCcw, Clock, Flame, Star, Target, Trophy, CalendarDays, Hammer, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { AppShell } from "@/components/AppShell";
import { ProgressRing } from "@/components/ProgressRing";
import { computeStats, todaysPlan } from "@/lib/careers";
import { useStore, weekCount } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Today — SkillPath AI" },
      { name: "description", content: "Your daily learning plan, career readiness and progress at a glance." },
      { property: "og:title", content: "Your Dashboard — SkillPath AI" },
      { property: "og:description", content: "Daily plan, readiness score and next skill." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

function Stat({ icon: I, label, value, sub }: { icon: typeof Star; label: string; value: string; sub?: string }) {
  return (
    <div className="card-soft card-hover p-5">
      <I className="mb-4 h-4 w-4 text-muted-foreground" />
      <div className="text-2xl font-semibold tabular-nums tracking-tight">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {sub && <div className="mt-2 bar"><span style={{ width: sub }} /></div>}
    </div>
  );
}

function Dashboard() {
  const st = useStore();
  const stats = computeStats(st.profile, st.completed, st.projectsDone);
  const plan = todaysPlan(st.profile, stats.next);
  const icons = { learn: BookOpen, practice: Dumbbell, review: RotateCcw };
  const wk = weekCount(st.weekLog);

  return (
    <AppShell>
      {st.isDemo && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed bg-accent px-4 py-3 text-sm text-accent-foreground">
          <Sparkles className="h-4 w-4" /> You're viewing a demo Frontend Developer journey.
          <Link to="/onboarding" className="ml-auto font-medium underline underline-offset-4">Build your own →</Link>
        </div>
      )}
      <div className="mb-8">
        <div className="eyebrow mb-2">Career goal</div>
        <h1 className="display text-4xl md:text-5xl">{st.profile.careerTitle}</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="surface-ink relative overflow-hidden rounded-3xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="eyebrow !text-ink-muted">Today's plan</div>
            <span className="chip !bg-ink-2 !text-ink-foreground"><Clock className="h-3 w-3" /> {st.profile.minutesPerDay} minutes</span>
          </div>
          {stats.next ? (
            <h2 className="mt-4 text-2xl font-semibold">{stats.next.name}</h2>
          ) : (
            <h2 className="mt-4 text-2xl font-semibold">Roadmap complete 🎉</h2>
          )}
          <div className="mt-6 space-y-3">
            {plan.map((p) => {
              const I = icons[p.kind];
              return (
                <div key={p.label} className="glass-ink flex items-center gap-4 !rounded-xl p-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-soft"><I className="h-4 w-4 text-signal" /></span>
                  <span className="flex-1 text-sm">{p.label}</span>
                  <span className="font-mono text-xs text-ink-muted">{p.minutes} min</span>
                </div>
              );
            })}
          </div>
          <Link to="/roadmap" search={{ skill: stats.next?.id, welcome: undefined }} className="btn btn-signal btn-lg mt-6">Start Learning <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="card-soft flex flex-col items-center justify-center p-6 text-center">
          <div className="eyebrow mb-4">Career readiness</div>
          <ProgressRing value={stats.readiness} size={200} label="job-ready" />
          <Link to="/progress" className="btn btn-outline btn-sm mt-6">See what boosts your score</Link>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={Target} label="Skills mastered" value={`${stats.mastered} / ${stats.total}`} sub={`${(stats.mastered / stats.total) * 100}%`} />
        <Stat icon={Hammer} label="Projects completed" value={`${stats.projectsDone} / ${stats.projectsTotal}`} sub={`${(stats.projectsDone / stats.projectsTotal) * 100}%`} />
        <Stat icon={BookOpen} label="Learning progress" value={`${stats.progressPct}%`} sub={`${stats.progressPct}%`} />
        <Stat icon={CalendarDays} label="Est. job-ready date" value={format(stats.readyDate, "MMM yyyy")} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="card-soft flex items-center gap-4 p-5"><Flame className="h-8 w-8 text-warning" /><div><div className="text-xl font-semibold">{st.streak} day streak</div><div className="text-sm text-muted-foreground">Keep it going today</div></div></div>
        <div className="card-soft flex items-center gap-4 p-5"><Star className="h-8 w-8 text-signal" /><div><div className="text-xl font-semibold tabular-nums">{st.xp} XP</div><div className="text-sm text-muted-foreground">+50 per skill · +150 per project</div></div></div>
        <div className="card-soft p-5">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Trophy className="h-4 w-4 text-accent-foreground" /> Weekly goal</div>
          <div className="mb-2 text-xl font-semibold tabular-nums">{Math.min(wk, st.weeklyGoal)} / {st.weeklyGoal} completions</div>
          <div className="bar"><span style={{ width: `${Math.min(100, (wk / st.weeklyGoal) * 100)}%` }} /></div>
        </div>
      </div>
    </AppShell>
  );
}
