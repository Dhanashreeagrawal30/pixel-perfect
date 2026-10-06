import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Play, Sparkles, Trophy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { buildRoadmap, CAREER_BY_ID } from "@/lib/careers";
import { SKILLS } from "@/lib/skills";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — SkillPath AI" },
      { name: "description", content: "Portfolio projects recommended for your current skills, with features, tech and bonus ideas." },
      { property: "og:title", content: "Projects — SkillPath AI" },
      { property: "og:description", content: "Build projects that prove your skills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Projects,
});

function Projects() {
  const st = useStore();
  const career = CAREER_BY_ID[st.profile.careerId];
  const { items } = buildRoadmap(st.profile, st.completed);
  const have = new Set(items.filter((i) => i.status === "done" || i.status === "skipped").map((i) => i.id));
  const [open, setOpen] = useState<string | null>(null);

  const ranked = career.projects
    .map((p) => ({ p, ready: p.skills.filter((s) => have.has(s)).length / p.skills.length }))
    .sort((a, b) => Number(st.projectsDone.includes(a.p.id)) - Number(st.projectsDone.includes(b.p.id)) || b.ready - a.ready);

  return (
    <AppShell>
      <PageHeader eyebrow={`${st.profile.careerTitle} projects`} title={<>Build to <em>prove it</em></>} desc="Ranked by how ready you are right now. Each one becomes a portfolio piece." />
      <div className="grid gap-4 md:grid-cols-2">
        {ranked.map(({ p, ready }, idx) => {
          const done = st.projectsDone.includes(p.id);
          const started = st.projectsStarted.includes(p.id);
          const isOpen = open === p.id;
          return (
            <article key={p.id} className={`card-soft card-hover flex flex-col p-6 ${done ? "opacity-75" : ""}`}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {idx === 0 && !done && <span className="chip chip-signal"><Sparkles className="h-3 w-3" /> Recommended now</span>}
                {done && <span className="chip chip-success"><Check className="h-3 w-3" /> Completed</span>}
                {started && !done && <span className="chip chip-info">In progress</span>}
                <span className="chip">{p.difficulty}</span>
                <span className="chip"><Clock className="h-3 w-3" /> {p.hours}h</span>
              </div>
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.problem}</p>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs"><span>Skills ready</span><span className="tabular-nums">{Math.round(ready * 100)}%</span></div>
                <div className="bar"><span style={{ width: `${ready * 100}%` }} /></div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.skills.map((s) => <span key={s} className={`chip ${have.has(s) ? "chip-success" : ""}`}>{have.has(s) && <Check className="h-3 w-3" />}{SKILLS[s]?.name}</span>)}
                </div>
              </div>
              {isOpen && (
                <div className="fade-up mt-5 grid gap-4 border-t pt-5 text-sm sm:grid-cols-2">
                  <div><div className="eyebrow mb-1">Features</div><ul className="space-y-1">{p.features.map((f) => <li key={f}>• {f}</li>)}</ul></div>
                  <div>
                    <div className="eyebrow mb-1">Suggested tech</div><p>{p.tech.join(", ")}</p>
                    <div className="eyebrow mb-1 mt-3">Bonus</div><ul className="space-y-1">{p.bonus.map((f) => <li key={f}>• {f}</li>)}</ul>
                  </div>
                </div>
              )}
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {!done && !started && (
                  <button className="btn btn-signal" onClick={() => { st.startProject(p.id); setOpen(p.id); toast("Project started", { description: `${p.title} added to your active builds.` }); }}>
                    <Play className="h-4 w-4" /> Start Project
                  </button>
                )}
                {started && !done && (
                  <button className="btn btn-primary" onClick={() => { st.completeProject(p.id); toast.success("Project completed!", { description: "+150 XP · readiness updated" }); }}>
                    <Trophy className="h-4 w-4" /> Mark complete
                  </button>
                )}
                <button className="btn btn-outline" onClick={() => setOpen(isOpen ? null : p.id)}>{isOpen ? "Hide details" : "View brief"}</button>
              </div>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}
