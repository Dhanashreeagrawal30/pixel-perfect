import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, X } from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { CareerIcon } from "@/components/CareerIcon";
import { CAREERS, type Career } from "@/lib/careers";
import { SKILLS } from "@/lib/skills";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Explore Careers — SkillPath AI" },
      { name: "description", content: "Compare 9 tech career paths by difficulty, core skills, roadmap length and projects." },
      { property: "og:title", content: "Explore Career Paths — SkillPath AI" },
      { property: "og:description", content: "Frontend, Backend, AI/ML, Data, Cybersecurity, Cloud, DevOps, UI/UX and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Careers,
});

const diffBars = { Beginner: 1, Intermediate: 2, Advanced: 3 } as const;

function Detail({ c, onClose }: { c: Career; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm md:items-center" onClick={onClose}>
      <div className="card-soft fade-up max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent"><CareerIcon name={c.icon} className="h-5 w-5 text-accent-foreground" /></span>
          <div className="flex-1"><h2 className="text-2xl font-semibold">{c.title}</h2><p className="text-sm text-muted-foreground">{c.tagline}</p></div>
          <button onClick={onClose} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-4">
          {c.stages.map((s, i) => (
            <div key={s.name} className="flex gap-4">
              <span className="font-mono text-xs text-muted-foreground pt-1">0{i + 1}</span>
              <div><div className="font-medium">{s.name}</div><div className="mt-1 flex flex-wrap gap-1.5">{s.skills.map((k) => <span key={k} className="chip">{SKILLS[k]?.name}</span>)}</div></div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="eyebrow mb-2">Recommended projects</div>
          <p className="text-sm">{c.projects.map((p) => p.title).join(" · ")}</p>
        </div>
        <Link to="/onboarding" search={{ career: c.id }} className="btn btn-signal mt-6 w-full">Start this path <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}

function Careers() {
  const [sel, setSel] = useState<Career | null>(null);
  return (
    <AppShell>
      <PageHeader eyebrow="Career explorer" title={<>Find your <em>path</em></>} desc="Every path is broken into ordered stages with free resources and real projects." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAREERS.map((c) => {
          const core = c.stages.flatMap((s) => s.skills).filter((k) => SKILLS[k]?.kind !== "career");
          return (
            <article key={c.id} className="card-soft card-hover flex flex-col p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent"><CareerIcon name={c.icon} className="h-5 w-5 text-accent-foreground" /></span>
                <div className="flex items-center gap-1" title={`${c.difficulty} difficulty`}>
                  {[1, 2, 3].map((n) => <span key={n} className={`h-3 w-1.5 rounded-full ${n <= diffBars[c.difficulty] ? "bg-signal" : "bg-secondary"}`} />)}
                  <span className="ml-1.5 text-xs text-muted-foreground">{c.difficulty}</span>
                </div>
              </div>
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {c.months} · {core.length} skills · {c.projects.length} projects</div>
              <div className="mt-3 flex flex-wrap gap-1.5">{core.slice(0, 5).map((k) => <span key={k} className="chip">{SKILLS[k].name}</span>)}{core.length > 5 && <span className="chip">+{core.length - 5}</span>}</div>
              <div className="mt-3 text-xs text-muted-foreground">Projects: {c.projects.slice(0, 2).map((p) => p.title).join(", ")}</div>
              <button onClick={() => setSel(c)} className="btn btn-outline mt-auto w-full !mt-6">Explore Roadmap <ArrowRight className="h-4 w-4" /></button>
            </article>
          );
        })}
      </div>
      {sel && <Detail c={sel} onClose={() => setSel(null)} />}
    </AppShell>
  );
}
