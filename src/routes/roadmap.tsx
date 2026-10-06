import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronDown, Clock, ExternalLink, BookOpen, Dumbbell, Hammer, Lock, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/AppShell";
import { buildRoadmap, computeStats, type RoadmapItem } from "@/lib/careers";
import { SKILLS } from "@/lib/skills";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/roadmap")({
  validateSearch: (s: Record<string, unknown>) => ({
    skill: typeof s.skill === "string" ? s.skill : undefined,
    welcome: typeof s.welcome === "number" ? s.welcome : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Your Roadmap — SkillPath AI" },
      { name: "description", content: "Your personalized, stage-by-stage learning path with free resources, practice and projects." },
      { property: "og:title", content: "Your Roadmap — SkillPath AI" },
      { property: "og:description", content: "Learn, practice and build — one skill at a time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Roadmap,
});

const diffChip = { Beginner: "chip-success", Intermediate: "chip-signal", Advanced: "chip-warning" } as const;

function SkillCard({ it, open, onToggle }: { it: RoadmapItem; open: boolean; onToggle: () => void }) {
  const { toggleSkill } = useStore();
  const [justDone, setJustDone] = useState(false);
  const done = it.status === "done" || it.status === "skipped";
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [open]);

  const complete = () => {
    if (it.status === "skipped") return;
    const nowDone = toggleSkill(it.id);
    if (nowDone) {
      setJustDone(true);
      setTimeout(() => setJustDone(false), 700);
      toast.success(`${it.name} completed`, { description: "+50 XP · roadmap updated" });
    }
  };

  return (
    <div ref={ref} className="relative pl-12">
      <button
        onClick={complete}
        aria-label={done ? `Mark ${it.name} incomplete` : `Mark ${it.name} complete`}
        className={`absolute left-0 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition ${done ? "border-signal bg-signal text-signal-foreground" : it.status === "current" ? "border-signal bg-card" : "border-border bg-card"} ${justDone ? "pop" : ""}`}
      >
        {done ? <Check className="h-4 w-4" /> : it.status === "upcoming" ? <Lock className="h-3 w-3 text-muted-foreground" /> : <span className="h-2 w-2 rounded-full bg-signal" />}
      </button>
      <div className={`card-soft card-hover overflow-hidden ${it.status === "current" ? "ring-2 ring-signal" : ""} ${it.status === "upcoming" ? "opacity-70" : ""}`}>
        <button onClick={onToggle} className="flex w-full items-start gap-4 p-5 text-left">
          <div className="flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{String(it.index).padStart(2, "0")}</span>
              <h3 className={`font-semibold ${done ? "text-muted-foreground line-through decoration-1" : ""}`}>{it.name}</h3>
              {it.status === "current" && <span className="chip chip-signal">Up next</span>}
              {it.status === "skipped" && <span className="chip chip-success">Already known</span>}
            </div>
            <p className="text-sm text-muted-foreground">{it.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`chip ${diffChip[it.difficulty]}`}>{it.difficulty}</span>
              <span className="chip"><Clock className="h-3 w-3" /> {it.hours} hours</span>
            </div>
          </div>
          <ChevronDown className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="fade-up space-y-6 border-t px-5 pb-5 pt-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div><div className="eyebrow mb-1">Why it matters</div><p className="text-sm">{it.why}</p></div>
              <div><div className="eyebrow mb-1">Prerequisites</div><p className="text-sm">{it.prereqs.length ? it.prereqs.map((p) => SKILLS[p]?.name).join(", ") : "None — start right away"}</p></div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-secondary p-4 md:col-span-3">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><BookOpen className="h-4 w-4" /> Learn · free resources</div>
                <div className="grid gap-2 md:grid-cols-2">
                  {it.resources.map((r) => (
                    <div key={r.url + r.name} className="flex items-center gap-3 rounded-xl bg-card p-3">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.platform} · {r.type} · {r.level} · {r.time}</div>
                      </div>
                      <a href={r.url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">Open Resource <ExternalLink className="h-3 w-3" /></a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-secondary p-4 md:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Dumbbell className="h-4 w-4" /> Practice</div>
                <ul className="space-y-1 text-sm">{it.practice.map((p) => <li key={p}>• {p}</li>)}</ul>
              </div>
              <div className="rounded-2xl bg-accent p-4 text-accent-foreground">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Hammer className="h-4 w-4" /> Build</div>
                <p className="text-sm">{it.build}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {it.status !== "skipped" && (
                <button onClick={complete} className={`btn ${done ? "btn-outline" : "btn-signal"}`}>
                  {done ? <><X className="h-4 w-4" /> Mark incomplete</> : <><Check className="h-4 w-4" /> Mark as completed</>}
                </button>
              )}
              <Link to="/projects" className="btn btn-outline">See related projects</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Roadmap() {
  const { skill, welcome } = Route.useSearch();
  const st = useStore();
  const { stages, items } = buildRoadmap(st.profile, st.completed);
  const stats = computeStats(st.profile, st.completed, st.projectsDone);
  const [open, setOpen] = useState<string | undefined>(skill ?? stats.next?.id);
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => { if (skill) setOpen(skill); }, [skill]);

  const skippedNames = items.filter((i) => i.status === "skipped").map((i) => i.name);
  const recentDone = items.filter((i) => i.status === "done").length;

  return (
    <AppShell>
      <PageHeader
        eyebrow={`${st.profile.careerTitle} · ${st.profile.experience} · ${st.profile.minutesPerDay} min/day`}
        title={<>Your <em>roadmap</em></>}
        desc={`${stats.mastered} of ${stats.total} steps complete · about ${stats.remainingHours} hours to go.`}
        action={<div className="w-full md:w-64"><div className="mb-1 flex justify-between text-xs"><span>Progress</span><span className="tabular-nums">{stats.progressPct}%</span></div><div className="bar"><span style={{ width: `${stats.progressPct}%` }} /></div></div>}
      />

      {showWelcome && skippedNames.length > 0 && (
        <div className="fade-up mb-8 flex items-start gap-3 rounded-2xl border bg-success-soft p-4 text-sm">
          <Sparkles className="mt-0.5 h-4 w-4 text-success" />
          <p className="flex-1">
            <strong>Great! You already know the fundamentals.</strong> We've skipped {skippedNames.length} module{skippedNames.length > 1 ? "s" : ""} ({skippedNames.join(", ")}) and moved you directly to <strong>{stats.next?.name ?? "career prep"}</strong>.
            {welcome === undefined && recentDone >= 4 && " You're moving fast — consider bumping your daily time to finish sooner."}
          </p>
          <button onClick={() => setShowWelcome(false)} aria-label="Dismiss"><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="relative">
        <span className="absolute bottom-0 left-[15px] top-2 w-px bg-border" />
        {stages.map((stage) => {
          const doneCount = stage.items.filter((i) => i.status === "done" || i.status === "skipped").length;
          return (
            <section key={stage.name} className="mb-10">
              <div className="relative mb-4 flex items-center gap-3 pl-12">
                <h2 className="eyebrow !text-foreground">{stage.name}</h2>
                <span className="font-mono text-xs text-muted-foreground">{doneCount}/{stage.items.length}</span>
                {doneCount === stage.items.length && <span className="chip chip-success"><Check className="h-3 w-3" /> Stage complete</span>}
              </div>
              <div className="space-y-3">
                {stage.items.map((it) => (
                  <SkillCard key={it.id} it={it} open={open === it.id} onToggle={() => setOpen(open === it.id ? undefined : it.id)} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
