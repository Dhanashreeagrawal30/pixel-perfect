import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/AppShell";
import { HOW_STEPS } from "./index";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — SkillPath AI" },
      { name: "description", content: "Goal, skill gap, roadmap, learn, practice, build, track — see how SkillPath AI gets you job-ready." },
      { property: "og:title", content: "How SkillPath AI Works" },
      { property: "og:description", content: "The path from career goal to job-ready, step by step." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: How,
});

const FLOW = ["Goal", "Skill gap", "Roadmap", "Learn", "Practice", "Build", "Track", "Job-ready"];

function How() {
  return (
    <div className="surface-ink min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Logo ink />
        <h1 className="display mt-20 text-5xl md:text-7xl">How it <em className="text-signal">works</em></h1>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {FLOW.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className={`chip ${i === FLOW.length - 1 ? "!bg-signal !text-signal-foreground" : "!bg-ink-2 !text-ink-foreground"}`}>{f}</span>
              {i < FLOW.length - 1 && <ArrowRight className="h-3 w-3 text-ink-muted" />}
            </span>
          ))}
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {HOW_STEPS.map((s, i) => (
            <div key={s.t} className="glass-ink p-7">
              <div className="mb-6 flex items-center justify-between"><s.icon className="h-5 w-5 text-signal" /><span className="font-mono text-xs text-ink-muted">0{i + 1}</span></div>
              <h2 className="text-xl font-semibold">{s.t}</h2>
              <p className="mt-2 text-ink-muted">{s.d}</p>
            </div>
          ))}
        </div>
        <Link to="/onboarding" className="btn btn-signal btn-lg mt-12">Build My Roadmap <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}
