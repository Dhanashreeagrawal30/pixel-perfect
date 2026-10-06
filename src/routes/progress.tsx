import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Check, TrendingUp } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { ProgressRing } from "@/components/ProgressRing";
import { computeStats, skillGap } from "@/lib/careers";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress & Skill Gap — SkillPath AI" },
      { name: "description", content: "Your career readiness score, its breakdown, and the exact skills between you and your target role." },
      { property: "og:title", content: "Progress & Skill Gap — SkillPath AI" },
      { property: "og:description", content: "Readiness score and prioritized skill gaps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

const pr = { High: "chip-warning", Medium: "chip-signal", Low: "" } as const;

function ProgressPage() {
  const st = useStore();
  const stats = computeStats(st.profile, st.completed, st.projectsDone);
  const { have, gaps } = skillGap(st.profile, st.completed);

  return (
    <AppShell>
      <PageHeader eyebrow="Career readiness" title={<>{st.profile.careerTitle} <em>readiness</em></>} />
      <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
        <div className="card-soft flex flex-col items-center justify-center p-8">
          <ProgressRing value={stats.readiness} size={220} label="out of 100" />
        </div>
        <div className="card-soft space-y-5 p-6">
          {stats.breakdown.map((b) => (
            <div key={b.label}>
              <div className="mb-1.5 flex justify-between text-sm"><span>{b.label}</span><span className="font-medium tabular-nums">{b.value}%</span></div>
              <div className="bar !h-2.5"><span style={{ width: `${b.value}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 card-soft p-6">
        <h2 className="mb-4 flex items-center gap-2 font-semibold"><TrendingUp className="h-4 w-4" /> What would increase your score?</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {stats.boosts.map((b) => (
            <Link key={b.label} to={b.projectId ? "/projects" : "/roadmap"} search={b.projectId ? undefined : { skill: b.skillId, welcome: undefined }} className="card-hover flex items-center gap-4 rounded-xl border p-4">
              <span className="font-mono text-lg font-semibold text-success">+{b.gain}%</span>
              <span className="flex-1 text-sm">{b.label}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <section className="mt-12">
        <div className="eyebrow mb-2">Your skill gap</div>
        <h2 className="display mb-6 text-4xl">
          {gaps.length === 0 ? "No gaps left. You're ready." : <>You are <em className="text-accent-foreground">{gaps.length} skills</em> away from your target career.</>}
        </h2>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1.4fr] md:items-start">
          <div className="card-soft p-5">
            <div className="eyebrow mb-3">Current skills</div>
            <div className="space-y-2">{have.map((h) => <div key={h.id} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-success" />{h.name}</div>)}</div>
          </div>
          <ArrowRight className="mx-auto hidden h-5 w-5 self-center text-muted-foreground md:block" />
          <div className="card-soft p-5">
            <div className="eyebrow mb-3">Required skills</div>
            <div className="space-y-1">
              {gaps.map((g) => (
                <Link key={g.id} to="/roadmap" search={{ skill: g.id, welcome: undefined }} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-secondary">
                  <AlertTriangle className="h-4 w-4 text-warning" />{g.name}
                  <span className={`chip ml-auto ${pr[g.priority]}`}>{g.priority} priority</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
