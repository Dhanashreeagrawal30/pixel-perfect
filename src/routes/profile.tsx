import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Flame, Lock, RefreshCw, Star, Target, Trophy, Hammer, Rocket } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { buildRoadmap, computeStats } from "@/lib/careers";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Achievements — SkillPath AI" },
      { name: "description", content: "Your learning streak, XP, badges and milestones." },
      { property: "og:title", content: "Profile — SkillPath AI" },
      { property: "og:description", content: "Streaks, XP, badges and milestones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Profile,
});

function Profile() {
  const st = useStore();
  const stats = computeStats(st.profile, st.completed, st.projectsDone);
  const { stages } = buildRoadmap(st.profile, st.completed);
  const level = Math.floor(st.xp / 250) + 1;

  const stageBadges = stages.map((s) => ({
    label: `${s.name} Completed`,
    earned: s.items.every((i) => i.status === "done" || i.status === "skipped"),
  }));
  const milestones = [
    { icon: Target, label: "First skill mastered", earned: stats.mastered >= 1 },
    { icon: Hammer, label: "First project shipped", earned: stats.projectsDone >= 1 },
    { icon: Flame, label: "7-day streak", earned: st.streak >= 7 },
    { icon: Star, label: "50% of roadmap", earned: stats.mastered / stats.total >= 0.5 },
    { icon: Rocket, label: "Readiness 75+", earned: stats.readiness >= 75 },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow={st.isDemo ? "Demo profile · saved on this device" : "Saved on this device"}
        title={<>Level {level} <em>learner</em></>}
        desc={`${st.profile.careerTitle} · ${st.profile.experience} · ${st.profile.minutesPerDay} min/day · ${st.profile.targetMonths}-month target`}
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[{ i: Flame, v: `${st.streak}`, l: "Day streak" }, { i: Star, v: `${st.xp}`, l: "Total XP" }, { i: Trophy, v: `${stageBadges.filter((b) => b.earned).length}`, l: "Badges" }, { i: Hammer, v: `${stats.projectsDone}`, l: "Projects" }].map((x) => (
          <div key={x.l} className="card-soft p-5"><x.i className="mb-3 h-5 w-5 text-accent-foreground" /><div className="text-2xl font-semibold tabular-nums">{x.v}</div><div className="text-sm text-muted-foreground">{x.l}</div></div>
        ))}
      </div>
      <div className="mt-4 card-soft p-5">
        <div className="mb-1 flex justify-between text-sm"><span>Level {level}</span><span className="tabular-nums text-muted-foreground">{st.xp % 250} / 250 XP to level {level + 1}</span></div>
        <div className="bar"><span style={{ width: `${((st.xp % 250) / 250) * 100}%` }} /></div>
      </div>

      <h2 className="eyebrow mb-3 mt-10">Skill badges</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stageBadges.map((b) => (
          <div key={b.label} className={`card-soft flex items-center gap-3 p-4 text-sm ${b.earned ? "" : "opacity-50"}`}>
            {b.earned ? <Award className="h-5 w-5 text-signal" /> : <Lock className="h-4 w-4 text-muted-foreground" />}{b.label}
          </div>
        ))}
      </div>

      <h2 className="eyebrow mb-3 mt-10">Milestones</h2>
      <div className="grid gap-3 md:grid-cols-5">
        {milestones.map((m) => (
          <div key={m.label} className={`card-soft p-4 text-sm ${m.earned ? "ring-1 ring-signal" : "opacity-50"}`}><m.icon className="mb-2 h-5 w-5" />{m.label}</div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <Link to="/onboarding" className="btn btn-signal">Build a new roadmap</Link>
        <button className="btn btn-outline" onClick={() => { st.loadDemo(); toast("Demo journey loaded"); }}><RefreshCw className="h-4 w-4" /> Load demo journey</button>
        <button className="btn btn-outline" onClick={() => { st.reset(); toast("Progress reset"); }}>Reset all progress</button>
      </div>
    </AppShell>
  );
}
