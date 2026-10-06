import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/AppShell";
import { CareerIcon } from "@/components/CareerIcon";
import { CAREERS, CAREER_BY_ID, KNOWN_SKILL_OPTIONS, matchCustomCareer, type Experience } from "@/lib/careers";
import { SKILLS } from "@/lib/skills";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/onboarding")({
  validateSearch: (s: Record<string, unknown>) => ({ career: typeof s.career === "string" ? s.career : undefined }),
  head: () => ({
    meta: [
      { title: "Build Your Roadmap — SkillPath AI" },
      { name: "description", content: "Answer five questions and get a personalized, step-by-step career roadmap." },
      { property: "og:title", content: "Build Your Roadmap — SkillPath AI" },
      { property: "og:description", content: "Five questions. One personalized learning path." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Onboarding,
});

const EXP: Experience[] = ["Complete Beginner", "Beginner", "Intermediate", "Advanced"];
const TIME = [{ v: 30, l: "30 min/day" }, { v: 60, l: "1 hour/day" }, { v: 120, l: "2 hours/day" }, { v: 180, l: "3+ hours/day" }];
const TARGET = [3, 6, 9, 12];

function Option({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`card-hover flex items-center gap-3 rounded-2xl border p-4 text-left transition ${active ? "border-signal bg-signal-soft" : "border-ink-border bg-ink-2/40 hover:border-ink-muted"}`}>
      {children}
      <span className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? "border-signal bg-signal text-signal-foreground" : "border-ink-border"}`}>{active && <Check className="h-3 w-3" />}</span>
    </button>
  );
}

function Onboarding() {
  const search = Route.useSearch();
  const nav = useNavigate();
  const { setProfile } = useStore();
  const [step, setStep] = useState(search.career ? 1 : 0);
  const [careerId, setCareerId] = useState(search.career && CAREER_BY_ID[search.career] ? search.career : "");
  const [custom, setCustom] = useState("");
  const [known, setKnown] = useState<string[]>([]);
  const [exp, setExp] = useState<Experience>("Beginner");
  const [mins, setMins] = useState(60);
  const [target, setTarget] = useState(6);
  const [customTarget, setCustomTarget] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => setKnown([]), [careerId]);

  const effectiveCareer = careerId || (custom.trim() ? matchCustomCareer(custom) : "");
  const canNext = [!!effectiveCareer, true, true, true, target > 0][step];

  const finish = () => {
    setGenerating(true);
    const c = CAREER_BY_ID[effectiveCareer];
    setProfile({
      careerId: effectiveCareer,
      careerTitle: careerId ? c.title : custom.trim() || c.title,
      known,
      experience: exp,
      minutesPerDay: mins,
      targetMonths: target,
      createdAt: new Date().toISOString(),
    });
    setTimeout(() => nav({ to: "/roadmap", search: { skill: undefined, welcome: known.length > 0 ? known.length : undefined } }), 1400);
  };

  const titles = ["What do you want to become?", "What do you already know?", "What's your experience level?", "How much time can you dedicate?", "When do you want to become job-ready?"];

  if (generating)
    return (
      <div className="surface-ink flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-signal-soft" />
          <Sparkles className="h-8 w-8 text-signal" />
        </div>
        <h1 className="display text-4xl">Building your roadmap…</h1>
        <p className="text-ink-muted">Ordering skills by prerequisite · skipping what you know · finding free resources</p>
      </div>
    );

  const options = KNOWN_SKILL_OPTIONS[effectiveCareer] ?? [];

  return (
    <div className="surface-ink min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo ink />
          <span className="font-mono text-xs text-ink-muted">Step {step + 1} / 5</span>
        </div>
        <div className="mt-6 grid grid-cols-5 gap-1.5">
          {titles.map((_, i) => <span key={i} className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-signal" : "bg-ink-border"}`} />)}
        </div>

        <div key={step} className="fade-up flex-1 py-12">
          <h1 className="display mb-8 text-4xl md:text-5xl">{titles[step]}</h1>

          {step === 0 && (
            <>
              <input value={custom} onChange={(e) => { setCustom(e.target.value); setCareerId(""); }} placeholder="Type any career, e.g. “Game Developer”" className="mb-6 w-full rounded-2xl border border-ink-border bg-ink-2/60 px-5 py-4 text-ink-foreground outline-none placeholder:text-ink-muted focus:border-signal" />
              <div className="grid gap-3 sm:grid-cols-2">
                {CAREERS.map((c) => (
                  <Option key={c.id} active={careerId === c.id} onClick={() => { setCareerId(c.id); setCustom(""); }}>
                    <CareerIcon name={c.icon} className="h-5 w-5 text-signal" />
                    <span className="font-medium">{c.title}</span>
                  </Option>
                ))}
              </div>
              {custom && !careerId && <p className="mt-4 text-sm text-ink-muted">We'll base your path on <span className="text-signal">{CAREER_BY_ID[effectiveCareer].title}</span> and tailor it to “{custom}”.</p>}
            </>
          )}

          {step === 1 && (
            <>
              <p className="-mt-4 mb-6 text-ink-muted">Select anything you're already comfortable with — we'll skip it.</p>
              <div className="flex flex-wrap gap-2">
                {options.map((id) => {
                  const on = known.includes(id);
                  return (
                    <button key={id} onClick={() => setKnown(on ? known.filter((k) => k !== id) : [...known, id])} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${on ? "border-signal bg-signal text-signal-foreground" : "border-ink-border hover:border-ink-muted"}`}>
                      {on ? <Check className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5 rounded-full border border-current opacity-50" />}
                      {SKILLS[id].name}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && <div className="grid gap-3 sm:grid-cols-2">{EXP.map((e) => <Option key={e} active={exp === e} onClick={() => setExp(e)}><span className="font-medium">{e}</span></Option>)}</div>}
          {step === 3 && <div className="grid gap-3 sm:grid-cols-2">{TIME.map((t) => <Option key={t.v} active={mins === t.v} onClick={() => setMins(t.v)}><span className="font-medium">{t.l}</span></Option>)}</div>}
          {step === 4 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {TARGET.map((t) => <Option key={t} active={target === t && !customTarget} onClick={() => { setTarget(t); setCustomTarget(""); }}><span className="font-medium">{t} months</span></Option>)}
              <div className={`flex items-center gap-3 rounded-2xl border p-4 ${customTarget ? "border-signal bg-signal-soft" : "border-ink-border"}`}>
                <span className="font-medium">Custom</span>
                <input type="number" min={1} max={36} value={customTarget} onChange={(e) => { setCustomTarget(e.target.value); setTarget(Number(e.target.value) || 0); }} placeholder="months" className="w-24 rounded-lg border border-ink-border bg-transparent px-3 py-1.5 outline-none focus:border-signal" />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-ink-border pt-6">
          <button onClick={() => (step === 0 ? nav({ to: "/" }) : setStep(step - 1))} className="btn btn-ghost-ink"><ArrowLeft className="h-4 w-4" /> Back</button>
          {step < 4 ? (
            <button disabled={!canNext} onClick={() => setStep(step + 1)} className="btn btn-signal">Continue <ArrowRight className="h-4 w-4" /></button>
          ) : (
            <button disabled={!canNext} onClick={finish} className="btn btn-signal"><Sparkles className="h-4 w-4" /> Generate my roadmap</button>
          )}
        </div>
      </div>
    </div>
  );
}
