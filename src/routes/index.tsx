import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, AlertTriangle, BookOpen, Dumbbell, Hammer, Target, Gauge, Sparkles, Flame, Star, Trophy, Quote, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/AppShell";
import { CareerIcon } from "@/components/CareerIcon";
import { ProgressRing } from "@/components/ProgressRing";
import { CAREERS } from "@/lib/careers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillPath AI — Turn your career goal into a clear roadmap" },
      { name: "description", content: "Discover what to learn, where to learn it free, what to build, and how close you are to being job-ready." },
      { property: "og:title", content: "SkillPath AI — Turn your career goal into a clear roadmap" },
      { property: "og:description", content: "Personalized roadmaps, free resources, projects and a career-readiness score." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/careers", label: "Explore Careers" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/projects", label: "Projects" },
  ] as const;
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo ink />
        <nav className="hidden items-center gap-6 text-sm text-ink-muted md:flex">
          {links.map((l) => <Link key={l.to} to={l.to} className="transition hover:text-ink-foreground">{l.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/profile" className="btn btn-ghost-ink btn-sm">Sign In</Link>
          <Link to="/onboarding" className="btn btn-signal btn-sm">Build My Roadmap</Link>
        </div>
        <button className="text-ink-foreground md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="glass-ink mx-4 space-y-1 p-3 md:hidden">
          {links.map((l) => <Link key={l.to} to={l.to} className="block rounded-lg px-3 py-2 text-ink-foreground">{l.label}</Link>)}
          <Link to="/onboarding" className="btn btn-signal mt-2 w-full">Build My Roadmap</Link>
        </div>
      )}
    </header>
  );
}

function HeroMock() {
  const rows = [
    { n: "HTML & Semantic HTML", s: "done" },
    { n: "CSS Fundamentals", s: "done" },
    { n: "JavaScript Fundamentals", s: "done" },
    { n: "React", s: "current" },
    { n: "TypeScript", s: "up" },
  ];
  return (
    <div className="glass-ink relative grid gap-4 p-5 md:grid-cols-[auto_1fr]">
      <div className="flex flex-col items-center justify-center gap-2 p-2">
        <ProgressRing value={72} size={150} label="Job-ready" tone="ink" />
        <div className="chip chip-signal"><Flame className="h-3 w-3" /> 7 day streak</div>
      </div>
      <div className="space-y-2">
        <div className="eyebrow !text-ink-muted">Frontend Developer · Your path</div>
        {rows.map((r) => (
          <div key={r.n} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${r.s === "current" ? "border-signal bg-signal-soft" : "border-ink-border"} ${r.s === "up" ? "opacity-50" : ""}`}>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${r.s === "done" ? "bg-signal text-signal-foreground" : "border border-ink-border"}`}>
              {r.s === "done" && <Check className="h-3 w-3" />}
            </span>
            <span className="flex-1">{r.n}</span>
            {r.s === "current" && <span className="text-xs text-signal">Up next</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ eyebrow, title, children, id }: { eyebrow: string; title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-24">
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h2 className="display mb-12 max-w-2xl text-4xl md:text-5xl">{title}</h2>
      {children}
    </section>
  );
}

export const HOW_STEPS = [
  { icon: Target, t: "Set your goal", d: "Pick a career and tell us what you already know." },
  { icon: Sparkles, t: "Get your roadmap", d: "Stages ordered by prerequisite, skipping what you've mastered." },
  { icon: BookOpen, t: "Learn → Practice → Build", d: "Free resources, small drills and a project for every skill." },
  { icon: Gauge, t: "Track readiness", d: "Watch your job-ready score climb with every step." },
];

function Landing() {
  return (
    <div>
      <div className="surface-ink relative overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <Nav />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 pt-36 md:grid-cols-[1.1fr_1fr] md:pt-44">
          <div className="fade-up">
            <div className="chip mb-6 !bg-signal-soft !text-signal"><Sparkles className="h-3 w-3" /> AI career companion for students</div>
            <h1 className="display text-5xl md:text-7xl">
              Turn your career goal into a <em className="text-signal">clear roadmap.</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-muted">
              Discover what to learn, where to learn it for free, what to build, and how close you are to becoming job-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/onboarding" className="btn btn-signal btn-lg">Build My Roadmap <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/careers" className="btn btn-ghost-ink btn-lg">Explore Career Paths</Link>
            </div>
            <p className="mt-6 text-sm text-ink-muted">Free · No sign-up needed · 9 career paths</p>
          </div>
          <div className="fade-up" style={{ animationDelay: "120ms" }}><HeroMock /></div>
        </div>
      </div>

      <Section eyebrow="How it works" title="From “I want to be…” to job-ready, in four steps." id="how">
        <div className="grid gap-4 md:grid-cols-4">
          {HOW_STEPS.map((s, i) => (
            <div key={s.t} className="card-soft card-hover p-6">
              <div className="mb-6 flex items-center justify-between">
                <s.icon className="h-5 w-5 text-accent-foreground" />
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Career paths" title="Nine paths, each mapped skill by skill.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAREERS.map((c) => (
            <Link key={c.id} to="/onboarding" search={{ career: c.id }} className="card-soft card-hover group flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent"><CareerIcon name={c.icon} className="h-5 w-5 text-accent-foreground" /></span>
              <div className="flex-1">
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.months} · {c.difficulty}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </Section>

      <div className="surface-ink">
        <Section eyebrow="Example roadmap" title="Learn, practice, then prove it with a build.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { skill: "JavaScript", l: "JavaScript fundamentals", p: "10 JavaScript challenges", b: "To-Do List Web App" },
              { skill: "APIs", l: "fetch, JSON & HTTP", p: "Render a public API", b: "Weather Dashboard" },
              { skill: "React", l: "Components, props, hooks", p: "Small React exercises", b: "Movie Search Dashboard" },
            ].map((x) => (
              <div key={x.skill} className="glass-ink p-6">
                <div className="mb-5 text-lg font-semibold">{x.skill}</div>
                {[{ i: BookOpen, k: "Learn", v: x.l }, { i: Dumbbell, k: "Practice", v: x.p }, { i: Hammer, k: "Build", v: x.b }].map((r, idx) => (
                  <div key={r.k} className="relative flex gap-3 pb-4 last:pb-0">
                    {idx < 2 && <span className="absolute left-[15px] top-8 h-[calc(100%-24px)] w-px bg-ink-border" />}
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${idx === 2 ? "bg-signal text-signal-foreground" : "border border-ink-border"}`}><r.i className="h-4 w-4" /></span>
                    <div><div className="eyebrow !text-ink-muted">{r.k}</div><div className="text-sm">{r.v}</div></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section eyebrow="AI personalization" title="Already know HTML and CSS? We skip ahead.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-soft p-6">
            <div className="chip chip-success mb-4"><Sparkles className="h-3 w-3" /> Adapted for you</div>
            <p className="text-lg">“Great! You already know the fundamentals. We've skipped 2 modules and moved you directly to <strong>JavaScript</strong>.”</p>
            <p className="mt-4 text-sm text-muted-foreground">Your roadmap re-orders as you progress — moving faster when you're flying, adding practice when you're stuck.</p>
          </div>
          <div className="card-soft p-6">
            <div className="eyebrow mb-4">Your skill gap</div>
            <div className="space-y-2 text-sm">
              {["HTML", "CSS", "JavaScript"].map((s) => <div key={s} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{s}</div>)}
              {[["React", "High"], ["TypeScript", "Medium"], ["Testing", "Low"]].map(([s, p]) => (
                <div key={s} className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" />{s}<span className={`chip ml-auto ${p === "High" ? "chip-warning" : p === "Medium" ? "chip-signal" : ""}`}>{p}</span></div>
              ))}
            </div>
            <p className="mt-4 font-medium">You are 6 skills away from your target career.</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Projects & progress" title="Build real things. Watch your score rise.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card-soft p-6 md:col-span-2">
            <div className="mb-1 flex items-center justify-between"><span className="font-semibold">Weather Dashboard</span><span className="chip chip-signal">Intermediate</span></div>
            <p className="text-sm text-muted-foreground">Search any city, show current weather, a 5-day forecast, loading and error states.</p>
            <div className="mt-4 flex flex-wrap gap-2">{["JavaScript", "APIs", "DOM"].map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <div className="mt-6 space-y-3">
              {[["Technical Skills", 82], ["Projects", 65], ["Problem Solving", 74], ["Portfolio", 50]].map(([l, v]) => (
                <div key={l}><div className="mb-1 flex justify-between text-xs"><span>{l}</span><span className="tabular-nums">{v}%</span></div><div className="bar"><span style={{ width: `${v}%` }} /></div></div>
              ))}
            </div>
          </div>
          <div className="card-soft flex flex-col justify-between gap-3 p-6">
            {[{ i: Flame, t: "7 day streak" }, { i: Trophy, t: "JavaScript Fundamentals" }, { i: Star, t: "420 XP" }].map((b) => (
              <div key={b.t} className="flex items-center gap-3 rounded-xl bg-secondary p-3 text-sm font-medium"><b.i className="h-5 w-5 text-accent-foreground" />{b.t}</div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Student stories" title="Students who stopped guessing.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { q: "I wasted months on random tutorials. SkillPath told me exactly what was next — I landed a frontend internship in 5 months.", n: "Priya S.", r: "CS sophomore → Frontend intern" },
            { q: "The skill gap view was eye-opening. I knew Python but had zero SQL. Fixed that in three weeks.", n: "Daniel O.", r: "Data Analyst, first role" },
            { q: "Learn → Practice → Build made my portfolio actually look like a portfolio.", n: "Mei L.", r: "Self-taught → Junior dev" },
          ].map((t) => (
            <figure key={t.n} className="card-soft p-6">
              <Quote className="mb-4 h-5 w-5 text-accent-foreground" />
              <blockquote className="text-sm leading-relaxed">{t.q}</blockquote>
              <figcaption className="mt-4 text-sm"><div className="font-semibold">{t.n}</div><div className="text-muted-foreground">{t.r}</div></figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Illustrative stories for demo purposes.</p>
      </Section>

      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="surface-ink relative overflow-hidden rounded-[2rem] px-8 py-16 text-center">
          <div className="grid-lines pointer-events-none absolute inset-0" />
          <h2 className="display relative text-4xl md:text-6xl">What should you learn next?</h2>
          <p className="relative mx-auto mt-4 max-w-md text-ink-muted">Answer five quick questions. Get a roadmap built around you.</p>
          <Link to="/onboarding" className="btn btn-signal btn-lg relative mt-8">Build My Roadmap <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row">
          <Logo />
          <div className="flex gap-6">
            <Link to="/careers">Careers</Link><Link to="/how-it-works">How it works</Link><Link to="/dashboard">Demo dashboard</Link>
          </div>
          <span>© 2026 SkillPath AI</span>
        </div>
      </footer>
    </div>
  );
}
